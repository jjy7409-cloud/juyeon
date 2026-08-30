const fs = require('fs');
const path = require('path');

// jpeg-js의 메모리 제한(기본 512MB)을 2048MB로 늘리는 몽키패치 적용
const jpegJs = require('./node_modules/jpeg-js');
const originalDecode = jpegJs.decode;
jpegJs.decode = function(jpegData, userOpts) {
    const opts = { ...userOpts, maxMemoryUsageInMB: 2048 };
    return originalDecode(jpegData, opts);
};

const { Jimp } = require('./node_modules/jimp');

const IMAGES_DIR = path.join(__dirname, 'images');
const BACKUP_DIR = path.join(__dirname, 'images_backup');

async function main() {
    console.log('--- 하루온담 이미지 백업 및 최적화 작업 시작 ---');
    
    // 1. 백업 폴더 생성
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR);
        console.log(`백업 폴더 생성 완료: ${BACKUP_DIR}`);
    }

    // 2. 이미지 폴더 내 파일 목록 읽기
    const files = fs.readdirSync(IMAGES_DIR);
    console.log(`총 ${files.length}개의 파일을 처리합니다.`);

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (const file of files) {
        const filePath = path.join(IMAGES_DIR, file);
        const backupPath = path.join(BACKUP_DIR, file);
        
        // 디렉토리는 건너뜁니다
        if (fs.statSync(filePath).isDirectory()) {
            continue;
        }

        const ext = path.extname(file).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            console.log(`[건너뜀] 지원하지 않는 파일 포맷: ${file}`);
            continue;
        }

        // 이미 최적화된 파일은 백업 폴더에서 원본 크기를 가져와 누적시킵니다.
        // 이를 통해 스크립트를 재실행해도 정확한 용량 감소율을 계산할 수 있습니다.
        const originalSize = fs.existsSync(backupPath) ? fs.statSync(backupPath).size : fs.statSync(filePath).size;
        totalOriginalSize += originalSize;

        // 백업본이 없으면 복사
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(filePath, backupPath);
            console.log(`[백업완료] ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB)`);
        } else {
            // 재실행 시 백업본으로부터 원본 상태를 가져와 덮어씌운 다음 가공을 시작합니다.
            fs.copyFileSync(backupPath, filePath);
        }

        try {
            // 4. 이미지 로드 및 최적화
            const image = await Jimp.read(filePath);
            const originalWidth = image.width;
            const originalHeight = image.height;

            let targetWidth = originalWidth;
            let targetHeight = originalHeight;
            let writeOptions = {};

            if (ext === '.png') {
                // PNG 최적화
                if (file === 'logo1.png' || file === 'logo_generated.png') {
                    // 로고는 최대 가로 400px
                    targetWidth = Math.min(originalWidth, 400);
                } else {
                    // 일반 PNG는 최대 가로 600px
                    targetWidth = Math.min(originalWidth, 600);
                }
                targetHeight = Math.round((targetWidth / originalWidth) * originalHeight);
            } else {
                // JPG/JPEG 최적화
                if (file.includes('main_representative')) {
                    // 메인 배너 이미지는 최대 가로 1200px
                    targetWidth = Math.min(originalWidth, 1200);
                } else {
                    // 일반 상품 이미지는 최대 가로 800px
                    targetWidth = Math.min(originalWidth, 800);
                }
                targetHeight = Math.round((targetWidth / originalWidth) * originalHeight);
                writeOptions = { quality: 75 }; // JPG 화질 75% 설정
            }

            // 크기 조정이 필요한 경우에만 resize 수행
            if (targetWidth !== originalWidth) {
                image.resize({ w: targetWidth, h: targetHeight });
                console.log(`[리사이징] ${file}: ${originalWidth}x${originalHeight} -> ${targetWidth}x${targetHeight}`);
            }

            // 최적화된 파일 덮어쓰기
            await image.write(filePath, writeOptions);
            
            const optimizedSize = fs.statSync(filePath).size;
            totalOptimizedSize += optimizedSize;
            
            const reductionPercent = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
            console.log(`[최적화완료] ${file}: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(optimizedSize / 1024 / 1024).toFixed(2)}MB (-${reductionPercent}%)`);
        } catch (err) {
            console.error(`[오류발생] ${file} 처리 중 에러:`, err);
            // 에러 발생 시 원본으로 복구
            fs.copyFileSync(backupPath, filePath);
            totalOptimizedSize += originalSize; // 실패했으므로 원래 용량 그대로 누적
        }
    }

    const savedMB = ((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2);
    const totalReductionPercent = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    console.log('\n--- 이미지 최적화 완료 ---');
    console.log(`원본 총 용량: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`최적화 총 용량: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`절약된 용량: ${savedMB} MB (-${totalReductionPercent}%)`);
}

main().catch(err => {
    console.error('스크립트 실행 중 치명적 에러:', err);
});
