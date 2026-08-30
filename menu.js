// 하루온담 - 가격표/메뉴판 생성기 스크립트 (menu.js)

document.addEventListener('DOMContentLoaded', () => {
    // Menu Data Definitions
    const menuData = {
        jeonggwa: [
            { id: 'walnut_80', name: '수제 호두정과 80g', price: '5,900원', desc: '지퍼백 패키지로 보관이 용이한 든든한 용량', img: 'images/walnut_original.png' },
            { id: 'ginger_60', name: '수제 생강호두정과 60g', price: '5,900원', desc: '직접 착즙한 국내산 생강즙을 졸여 만들어 기품 있고 알찬 60g 실속 팩', img: 'images/ginger_walnut.jpg' },
            { id: 'almond_80', name: '수제 아몬드정과 80g', price: '5,900원', desc: '가벼운 선물이나 일상적인 견과 충전에 좋은 80g', img: 'images/almond_jeonggwa.jpg' },
            { id: 'kongalmond_80', name: '수제 콩고물아몬드정과 80g', price: '6,900원', desc: '달지 않고 극대화된 고소함을 느끼고 싶을 때 추천', img: 'images/kongalmond_jeonggwa.jpg' },
            { id: 'paji_100', name: '못난이 호두정과 파지 100g', price: '4,500원', desc: '제조 과정 중 깨진 정과를 모은 실속 만점 토핑용 파지', img: '' }
        ],
        oranda: [
            { id: 'oranda_nut', name: '견과오란다', price: '2,000원', desc: '호두, 아몬드, 해바라기씨 등 다양한 견과류를 듬뿍 올려 고소함과 씹는 맛을 더한 오란다', img: 'images/oranda_walnut.jpg' },
            { id: 'oranda_yuzu', name: '유자오란다', price: '2,000원', desc: '상큼하고 향긋한 국내산 유자청과 유자 필을 더해 깔끔하게 맛을 낸 수제 오란다', img: '' },
            { id: 'oranda_gamtae', name: '감태오란다', price: '2,000원', desc: '바다 향 가득한 청정 감태를 올려 짭조름하고 은은한 단짠의 조화를 이룬 수제 오란다', img: '' },
            { id: 'oranda_chocotoring', name: '초코토링오란다', price: '2,000원', desc: '벨기에산 초콜릿 코팅과 바삭한 크런치 토핑으로 달콤함을 더한 수제 오란다', img: 'images/oranda_chocolate.jpg' },
            { id: 'oranda_konggopul', name: '콩고물오란다', price: '2,000원', desc: '국내산 콩고물을 가득 묻혀 구수하고 달달한 인절미 맛을 낸 수제 오란다', img: '' },
            { id: 'set_jeonggwa_4', name: '정과 4종 세트 (30g x 4)', price: '12,000원', desc: '정과 4종 구성 (호두/생강호두/아몬드/콩고물) 박스포함', img: 'images/set_4type.jpg' },
            { id: 'set_oranda_5', name: '오란다 5개 세트', price: '12,000원', desc: '선물 상자 및 리본 띠지 포장이 포함된 간편 답례품', img: 'images/set_oranda5.jpg' },
            { id: 'set_oranda_10', name: '오란다 10개 세트', price: '23,000원', desc: '촉촉하고 맛있는 오란다 10개를 푸짐하게 담은 박스 세트', img: 'images/set_oranda10.jpg' },
            { id: 'set_oranda5_walnut', name: '오란다 5개 + 호두 80g 세트', price: '18,900원', desc: '오란다 5구에 베스트셀러 호두정과 80g을 더해 알찬 선물', img: 'images/set_oranda5_walnut.jpg' },
            { id: 'set_2type_wa', name: '호두 110g + 아몬드 200g 세트', price: '24,000원', desc: '대용량 유리병 2종 기획 세트 (선물박스 & 쇼핑백 포함)', img: 'images/set_2type.jpg' },
            { id: 'set_2type_wg', name: '호두 110g + 생강호두 110g 세트', price: '24,000원', desc: '대용량 유리병 2종 생강 에디션 세트 (선물박스 & 쇼핑백 포함)', img: 'images/set_2type_ginger.jpg' },
            { id: 'set_3type_wag', name: '호두+생강+아몬드 3종 세트', price: '36,000원', desc: '예단/상견례/명절용 최고급 대용량 3종 시그니처 세트', img: 'images/set_3type.jpg' },
            { id: 'set_3type_wga', name: '호두+생강+콩고물아몬드 세트', price: '42,000원', desc: '가장 풍성한 구성의 최고급 대용량 3종 스페셜 선물세트', img: '' }
        ]
    };

    // DOM Elements
    const templateSelect = document.getElementById('control-template');
    const titleInput = document.getElementById('control-title');
    const subtitleInput = document.getElementById('control-subtitle');
    const showImagesCheckbox = document.getElementById('control-show-images');
    const fontSizeSelect = document.getElementById('control-font-size');
    const noticeInput = document.getElementById('control-notice');
    
    const contactPhoneInput = document.getElementById('control-contact-phone');
    const contactInstaInput = document.getElementById('control-contact-insta');
    const contactKakaoInput = document.getElementById('control-contact-kakao');
    
    const previewTitle = document.getElementById('preview-title');
    const previewSubtitle = document.getElementById('preview-subtitle');
    const previewNotice = document.getElementById('preview-notice');
    const previewPhone = document.getElementById('preview-phone');
    const previewInsta = document.getElementById('preview-insta');
    const previewKakao = document.getElementById('preview-kakao');
    
    const menuBoard = document.getElementById('menu-board');
    const listJeonggwa = document.getElementById('list-jeonggwa');
    const listOranda = document.getElementById('list-oranda');
    const priceEditorList = document.getElementById('price-editor-list');
    
    const btnDownloadImage = document.getElementById('btn-download-image');
    const btnPrint = document.getElementById('btn-print');

    // Populate Menu Items in the Preview Board
    function renderPreviewBoard() {
        listJeonggwa.innerHTML = '';
        listOranda.innerHTML = '';

        // Render Jeonggwa Items
        menuData.jeonggwa.forEach(item => {
            const itemHTML = createMenuItemHTML(item);
            listJeonggwa.appendChild(itemHTML);
        });

        // Render Oranda & Sets Items
        menuData.oranda.forEach(item => {
            const itemHTML = createMenuItemHTML(item);
            listOranda.appendChild(itemHTML);
        });
    }

    function createMenuItemHTML(item) {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.setAttribute('data-id', item.id);

        const imgHTML = item.img 
            ? `<img src="${item.img}" alt="${item.name}" class="menu-item-thumb">` 
            : `<div class="menu-item-thumb" style="display: flex; align-items: center; justify-content: center; background-color: var(--primary-light); color: var(--primary); font-size: 16px;"><i class="fa-solid fa-gift"></i></div>`;

        div.innerHTML = `
            <div class="menu-item-row">
                <div class="menu-item-name-wrap">
                    ${imgHTML}
                    <span class="menu-item-name">${item.name}</span>
                </div>
                <span class="menu-item-leader"></span>
                <span class="menu-item-price">${item.price}</span>
            </div>
            <p class="menu-item-desc">${item.desc}</p>
        `;
        return div;
    }

    // Populate the Control Panel Price Editor
    function renderPriceEditor() {
        priceEditorList.innerHTML = '';
        
        // Loop over both categories
        const allItems = [...menuData.jeonggwa, ...menuData.oranda];
        allItems.forEach(item => {
            const wrap = document.createElement('div');
            wrap.style.display = 'flex';
            wrap.style.alignItems = 'center';
            wrap.style.gap = '8px';
            wrap.style.borderBottom = '1px solid #F5F2EC';
            wrap.style.paddingBottom = '6px';
            
            const label = document.createElement('span');
            label.textContent = item.name.length > 13 ? item.name.substring(0, 13) + '..' : item.name;
            label.style.fontSize = '12px';
            label.style.width = '120px';
            label.style.flexShrink = '0';
            label.style.fontWeight = '500';
            
            const priceInput = document.createElement('input');
            priceInput.type = 'text';
            priceInput.value = item.price;
            priceInput.style.padding = '5px 8px';
            priceInput.style.fontSize = '12px';
            priceInput.style.border = '1px solid #DFD9CE';
            priceInput.style.borderRadius = '4px';
            priceInput.style.flexGrow = '1';
            
            // Listen for keyup to update price in real time
            priceInput.addEventListener('input', (e) => {
                const newPrice = e.target.value;
                item.price = newPrice;
                
                // Update in the menu data and update the preview directly
                const previewItem = menuBoard.querySelector(`.menu-item[data-id="${item.id}"]`);
                if (previewItem) {
                    previewItem.querySelector('.menu-item-price').textContent = newPrice;
                }
            });

            wrap.appendChild(label);
            wrap.appendChild(priceInput);
            priceEditorList.appendChild(wrap);
        });
    }

    // Initialize Event Listeners
    function initListeners() {
        // Sync Main Title
        titleInput.addEventListener('input', (e) => {
            previewTitle.textContent = e.target.value;
        });

        // Sync Subtitle
        subtitleInput.addEventListener('input', (e) => {
            previewSubtitle.textContent = e.target.value;
        });

        // Sync Notice
        noticeInput.addEventListener('input', (e) => {
            previewNotice.textContent = e.target.value;
        });

        // Sync Contacts
        contactPhoneInput.addEventListener('input', (e) => {
            previewPhone.textContent = e.target.value;
        });
        contactInstaInput.addEventListener('input', (e) => {
            previewInsta.textContent = e.target.value;
        });
        contactKakaoInput.addEventListener('input', (e) => {
            previewKakao.textContent = e.target.value;
        });

        // Toggle Images Visibility
        showImagesCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                menuBoard.classList.remove('hide-thumbs');
            } else {
                menuBoard.classList.add('hide-thumbs');
            }
        });

        // Font Size adjust
        fontSizeSelect.addEventListener('change', (e) => {
            menuBoard.classList.remove('fs-small', 'fs-medium', 'fs-large');
            menuBoard.classList.add(e.target.value);
        });

        // Template Dimension toggle
        templateSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            menuBoard.classList.remove('template-a4', 'template-mobile');
            
            if (val === 'a4') {
                menuBoard.classList.add('template-a4');
            } else if (val === 'mobile') {
                menuBoard.classList.add('template-mobile');
            }
        });

        // Image Download using html2canvas
        btnDownloadImage.addEventListener('click', () => {
            // Highlight feedback during rendering
            btnDownloadImage.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 이미지 생성 중...';
            btnDownloadImage.disabled = true;

            // Optional settings to ensure high resolution
            const scale = 2; // Export at 2x scale for crisp text on mobile/print
            const options = {
                scale: scale,
                useCORS: true, // Allow loading cross-origin images if any
                allowTaint: true,
                backgroundColor: null, // Transparency support if needed
                scrollX: 0,
                scrollY: 0
            };

            // Set wrapper temp styles to render fully in screen coordinates
            const workspace = document.querySelector('.preview-workspace');
            const originalScrollTop = workspace.scrollTop;
            workspace.scrollTop = 0;

            setTimeout(() => {
                html2canvas(menuBoard, options).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `하루온담_가격표_${templateSelect.value === 'a4' ? 'A4' : '모바일'}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    
                    // Reset button status
                    btnDownloadImage.innerHTML = '<i class="fa-solid fa-file-image"></i> 이미지로 저장 (PNG)';
                    btnDownloadImage.disabled = false;
                    workspace.scrollTop = originalScrollTop;
                }).catch(err => {
                    console.error('이미지 저장 오류:', err);
                    alert('이미지 저장 중 오류가 발생했습니다: ' + err.message);
                    btnDownloadImage.innerHTML = '<i class="fa-solid fa-file-image"></i> 이미지로 저장 (PNG)';
                    btnDownloadImage.disabled = false;
                });
            }, 100);
        });

        // Print page
        btnPrint.addEventListener('click', () => {
            window.print();
        });
    }

    // Run Startup Init
    renderPreviewBoard();
    renderPriceEditor();
    initListeners();
});
