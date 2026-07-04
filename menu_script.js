document.addEventListener('DOMContentLoaded', () => {
    // 1. Default Menu Items List (Preloaded from 하루온담 가격표.txt)
    const defaultItems = [
        // 수제 정과류
        {
            id: 'jg-walnut',
            name: '수제 호두정과',
            desc: '세 번 끓여 떫은맛을 없애고 오븐에 구운 바삭한 정과',
            cat: 'jeonggwa',
            show: true,
            options: [
                { name: '30g', price: '2,500', show: true },
                { name: '80g', price: '5,900', show: true }
            ]
        },
        {
            id: 'jg-ginger',
            name: '수제 생강호두정과',
            desc: '직접 손질하고 착즙한 국내산 생강 원즙의 향긋하고 건강한 맛',
            cat: 'jeonggwa',
            show: true,
            options: [
                { name: '30g', price: '3,000', show: true },
                { name: '80g', price: '6,900', show: true }
            ]
        },
        {
            id: 'jg-almond',
            name: '수제 아몬드정과',
            desc: '최상급 통아몬드를 비정제 원당으로 볶아 오랜 시간 구워냄',
            cat: 'jeonggwa',
            show: true,
            options: [
                { name: '30g', price: '2,500', show: true },
                { name: '80g', price: '5,900', show: true }
            ]
        },
        {
            id: 'jg-kong',
            name: '수제 콩고물아몬드정과',
            desc: '고소한 아몬드와 콩고물의 두 배 더 깊은 고소함',
            cat: 'jeonggwa',
            show: true,
            options: [
                { name: '30g', price: '3,000', show: true },
                { name: '80g', price: '6,900', show: true }
            ]
        },

        // 수제 오란다류
        {
            id: 'or-plain',
            name: '수제 플레인오란다',
            desc: '국산 조청과 비정제 설탕으로 만들어 딱딱하지 않고 부드러운 맛',
            cat: 'oranda',
            show: true,
            price: '2,000'
        },
        {
            id: 'or-choco',
            name: '수제 초코오란다',
            desc: '벨기에산 고급 다크 초콜릿의 부드럽고 진한 단맛',
            cat: 'oranda',
            show: true,
            price: '2,500'
        },
        {
            id: 'or-walnut',
            name: '수제 호두정과 오란다',
            desc: '부드러운 오란다 위에 바삭한 수제 호두정과를 듬뿍 토핑',
            cat: 'oranda',
            show: true,
            price: '2,500'
        },
        {
            id: 'or-strawberry',
            name: '수제 딸기크런키 오란다',
            desc: '국산 동결건조 딸기를 올려 새콤달콤한 비주얼 1위 상품',
            cat: 'oranda',
            show: true,
            price: '2,500'
        },
        {
            id: 'or-gamtae',
            name: '수제 감태오란다',
            desc: '향긋한 서해안 감태를 구워 짭조름하고 담백한 웰빙 오란다',
            cat: 'oranda',
            show: true,
            price: '2,500'
        },

        // 선물 및 프리미엄 세트
        {
            id: 'set-4type-box',
            name: '정과 4종 세트 (포장포함)',
            desc: '호두30g + 생강호두30g + 아몬드30g + 콩고물아몬드30g 구성',
            cat: 'sets',
            show: true,
            price: '12,000'
        },
        {
            id: 'set-oranda10',
            name: '수제 오란다 10개 세트 (박스포장)',
            desc: '답례품으로 가장 인기 있는 실속 구성 (맛 혼합)',
            cat: 'sets',
            show: true,
            price: '24,000'
        },
        {
            id: 'set-oranda5',
            name: '수제 오란다 5개 세트 (박스포장)',
            desc: '어린이집, 돌잔치 가벼운 선물용 구성',
            cat: 'sets',
            show: true,
            price: '12,000'
        },
        {
            id: 'set-oranda5-walnut',
            name: '오란다 5개 + 호두정과 80g 세트',
            desc: '감사 스티커 무료 제작 부착 포함 실속형 선물 패키지',
            cat: 'sets',
            show: true,
            price: '18,900'
        },
        {
            id: 'set-walnut6',
            name: '호두정과 6개 세트 (선물용)',
            desc: '정성스레 포장된 수제 호두정과 6개 선물 패키지',
            cat: 'sets',
            show: false,
            price: '가격문의'
        },
        {
            id: 'set-walnut-almond',
            name: '호두정과 120g + 아몬드정과 200g 세트',
            desc: '고급 박스 및 쇼핑백 포함 전통 명절 추천 선물세트',
            cat: 'sets',
            show: true,
            price: '22,000'
        },
        {
            id: 'set-walnut-ginger',
            name: '호두정과 120g + 생강호두정과 110g 세트',
            desc: '고급 박스 및 쇼핑백 포함 전통 명절 추천 선물세트',
            cat: 'sets',
            show: true,
            price: '24,000'
        },
        {
            id: 'set-3type',
            name: '정과 3종 명품 세트 (박스/쇼핑백)',
            desc: '품격 있는 선물용 (호두120g + 생강호두110g + 아몬드200g)',
            cat: 'sets',
            show: true,
            price: '33,000'
        },
        {
            id: 'set-4type-premium',
            name: '정과 4종 특선 세트 (박스/쇼핑백)',
            desc: '최고급 세트 (호두120g + 생강호두110g + 콩고물아몬드200g)',
            cat: 'sets',
            show: true,
            price: '42,000'
        },

        // 기타 상품
        {
            id: 'ot-paji',
            name: '못난이토핑용 호두정과 파지 100g',
            desc: '가정에서 간식용이나 요거트 토핑용으로 어울리는 실속형 파지',
            cat: 'others',
            show: true,
            price: '4,500'
        }
    ];

    let currentItems = [];
    
    // 2. DOM Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const layoutRadios = document.querySelectorAll('input[name="layout"]');
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    
    // Store Info Inputs
    const storeTitleInput = document.getElementById('store-title');
    const storeSubtitleInput = document.getElementById('store-subtitle');
    const storeEmblemInput = document.getElementById('store-emblem');
    const contactPhoneInput = document.getElementById('contact-phone');
    const contactKakaoInput = document.getElementById('contact-kakao');
    const contactInstagramInput = document.getElementById('contact-instagram');
    const storeNoticeInput = document.getElementById('store-notice');

    // Preview Elements
    const printPage = document.getElementById('print-page');
    const previewTitle = document.getElementById('preview-title');
    const previewSubtitle = document.getElementById('preview-subtitle');
    const previewEmblem = document.getElementById('preview-emblem');
    const previewPhone = document.getElementById('preview-phone');
    const previewKakao = document.getElementById('preview-kakao');
    const previewInsta = document.getElementById('preview-insta');
    const previewNotice = document.getElementById('preview-notice');
    const previewBody = document.getElementById('preview-body');

    // Controls
    const scaleSlider = document.getElementById('scale-slider');
    const scaleValue = document.getElementById('scale-value');
    const scaleWrapper = document.getElementById('preview-scale-wrapper');
    const btnPrint = document.getElementById('btn-print');
    const btnReset = document.getElementById('btn-reset');

    // 3. Tab Switching
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // 4. Initialize Data (Load from localStorage or use defaults)
    const initData = () => {
        const defaultVersion = "2.8"; // Incremented version to show ot-paji and add promo badge
        const savedVersion = localStorage.getItem('haruondam_menu_version');
        const savedItems = localStorage.getItem('haruondam_menu_items');
        
        if (savedItems && savedVersion === defaultVersion) {
            currentItems = JSON.parse(savedItems);
        } else {
            currentItems = JSON.parse(JSON.stringify(defaultItems));
            localStorage.setItem('haruondam_menu_items', JSON.stringify(currentItems));
            localStorage.setItem('haruondam_menu_version', defaultVersion);
        }

        // Load store settings if saved
        const savedSettings = localStorage.getItem('haruondam_menu_settings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            storeTitleInput.value = settings.title || "하루온담";
            storeSubtitleInput.value = settings.subtitle || "기름에 튀기지 않고 오븐에 구워낸 건강한 수제 정과";
            storeEmblemInput.value = settings.emblem || "💮";
            contactPhoneInput.value = settings.phone || "010-5107-7900";
            contactKakaoInput.value = settings.kakao || "ondam79";
            contactInstagramInput.value = settings.instagram || "@juyeon4669";
            storeNoticeInput.value = settings.notice || "";
            
            // Set radio values
            setRadioChecked('layout', settings.layout || 'portrait');
            setRadioChecked('theme', settings.theme || 'hanji');
        } else {
            // defaults
            setRadioChecked('layout', 'portrait');
            setRadioChecked('theme', 'hanji');
        }

        renderEditors();
        updatePreview();
        autoFitScale();
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('haruondam_menu_items', JSON.stringify(currentItems));
        
        const settings = {
            title: storeTitleInput.value,
            subtitle: storeSubtitleInput.value,
            emblem: storeEmblemInput.value,
            phone: contactPhoneInput.value,
            kakao: contactKakaoInput.value,
            instagram: contactInstagramInput.value,
            notice: storeNoticeInput.value,
            layout: getCheckedRadioValue('layout'),
            theme: getCheckedRadioValue('theme')
        };
        localStorage.setItem('haruondam_menu_settings', JSON.stringify(settings));
    };

    // Helper functions for radios
    const getCheckedRadioValue = (name) => {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        return checked ? checked.value : '';
    };

    const setRadioChecked = (name, value) => {
        const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
        if (radio) radio.checked = true;
    };

    // 5. Render Sidebar Editors for Items
    const renderEditors = () => {
        const renderCategory = (catName, containerId) => {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            const items = currentItems.filter(item => item.cat === catName);

            items.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = `menu-editor-card ${item.show ? '' : 'disabled'}`;
                card.setAttribute('data-id', item.id);

                if (item.options) {
                    // Grouped size options editor
                    let optionsHTML = item.options.map((opt, optIdx) => `
                        <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 6px; align-items: center; margin-top: 6px;">
                            <span style="font-size: 11px; font-weight: 600; color: var(--ui-text-muted);">${opt.name}</span>
                            <input type="text" class="option-price-input" data-idx="${optIdx}" value="${opt.price}">
                            <label class="card-toggle" style="margin-bottom:0; display:inline-flex; align-items:center; gap:2px;">
                                <input type="checkbox" class="option-show-toggle" data-idx="${optIdx}" ${opt.show ? 'checked' : ''}> 표시
                            </label>
                        </div>
                    `).join('');

                    card.innerHTML = `
                        <div class="card-header">
                            <div class="card-title-wrap">
                                <span class="card-index">${index + 1}</span>
                                <span style="font-size: 13px; font-weight:700;">${item.name}</span>
                            </div>
                            <label class="card-toggle">
                                <input type="checkbox" class="item-show-toggle" ${item.show ? 'checked' : ''}> 카테고리 노출
                            </label>
                        </div>
                        <div class="card-fields" style="display:block;">
                            <div class="card-desc-field" style="margin-bottom: 6px;">
                                <label>메뉴명</label>
                                <input type="text" class="item-name-input" value="${item.name}">
                            </div>
                            <div class="card-desc-field" style="margin-bottom: 6px;">
                                <label>간단 설명</label>
                                <input type="text" class="item-desc-input" value="${item.desc}">
                            </div>
                            <div class="card-desc-field" style="border-top: 1px dashed var(--ui-border); padding-top: 6px; margin-top: 6px;">
                                <label>사이즈별 가격 관리</label>
                                ${optionsHTML}
                            </div>
                        </div>
                    `;

                    // Event Listeners for inputs
                    const showToggle = card.querySelector('.item-show-toggle');
                    const nameInput = card.querySelector('.item-name-input');
                    const descInput = card.querySelector('.item-desc-input');
                    const optionPriceInputs = card.querySelectorAll('.option-price-input');
                    const optionShowToggles = card.querySelectorAll('.option-show-toggle');

                    const updateItemData = () => {
                        item.show = showToggle.checked;
                        item.name = nameInput.value;
                        item.desc = descInput.value;
                        
                        optionPriceInputs.forEach(input => {
                            const idx = parseInt(input.getAttribute('data-idx'));
                            item.options[idx].price = input.value;
                        });

                        optionShowToggles.forEach(toggle => {
                            const idx = parseInt(toggle.getAttribute('data-idx'));
                            item.options[idx].show = toggle.checked;
                        });

                        if (item.show) {
                            card.classList.remove('disabled');
                        } else {
                            card.classList.add('disabled');
                        }
                        
                        saveToLocalStorage();
                        updatePreview();
                    };

                    showToggle.addEventListener('change', updateItemData);
                    nameInput.addEventListener('input', updateItemData);
                    descInput.addEventListener('input', updateItemData);
                    optionPriceInputs.forEach(input => input.addEventListener('input', updateItemData));
                    optionShowToggles.forEach(toggle => toggle.addEventListener('change', updateItemData));

                } else {
                    // Single price item editor
                    card.innerHTML = `
                        <div class="card-header">
                            <div class="card-title-wrap">
                                <span class="card-index">${index + 1}</span>
                                <span style="font-size: 13px; font-weight:700;">${item.name}</span>
                            </div>
                            <label class="card-toggle">
                                <input type="checkbox" class="item-show-toggle" ${item.show ? 'checked' : ''}> 표시
                            </label>
                        </div>
                        <div class="card-fields">
                            <div>
                                <label>메뉴명</label>
                                <input type="text" class="item-name-input" value="${item.name}">
                            </div>
                            <div>
                                <label>가격</label>
                                <input type="text" class="item-price-input" value="${item.price}">
                            </div>
                            <div class="card-desc-field">
                                <label>간단 설명 / 용량</label>
                                <input type="text" class="item-desc-input" value="${item.desc}">
                            </div>
                        </div>
                    `;

                    // Event Listeners for inputs
                    const showToggle = card.querySelector('.item-show-toggle');
                    const nameInput = card.querySelector('.item-name-input');
                    const priceInput = card.querySelector('.item-price-input');
                    const descInput = card.querySelector('.item-desc-input');

                    const updateItemData = () => {
                        item.show = showToggle.checked;
                        item.name = nameInput.value;
                        item.price = priceInput.value;
                        item.desc = descInput.value;
                        
                        if (item.show) {
                            card.classList.remove('disabled');
                        } else {
                            card.classList.add('disabled');
                        }
                        
                        saveToLocalStorage();
                        updatePreview();
                    };

                    showToggle.addEventListener('change', updateItemData);
                    nameInput.addEventListener('input', updateItemData);
                    priceInput.addEventListener('input', updateItemData);
                    descInput.addEventListener('input', updateItemData);
                }

                container.appendChild(card);
            });
        };

        renderCategory('jeonggwa', 'list-jeonggwa');
        renderCategory('oranda', 'list-oranda');
        renderCategory('sets', 'list-sets');
        renderCategory('others', 'list-others');
    };

    // 6. Update Preview Box (Render Live Preview)
    const updatePreview = () => {
        // A. Basic Info binding
        previewTitle.textContent = storeTitleInput.value;
        previewSubtitle.textContent = storeSubtitleInput.value;
        previewEmblem.textContent = storeEmblemInput.value;
        
        // Contacts Show/Hide
        if (contactPhoneInput.value.trim() === '') {
            document.getElementById('preview-phone-wrap').style.display = 'none';
        } else {
            document.getElementById('preview-phone-wrap').style.display = 'inline-flex';
            previewPhone.textContent = contactPhoneInput.value;
        }
        
        if (contactKakaoInput.value.trim() === '') {
            document.getElementById('preview-kakao-wrap').style.display = 'none';
        } else {
            document.getElementById('preview-kakao-wrap').style.display = 'inline-flex';
            previewKakao.textContent = contactKakaoInput.value;
        }
        
        if (contactInstagramInput.value.trim() === '') {
            document.getElementById('preview-insta-wrap').style.display = 'none';
        } else {
            document.getElementById('preview-insta-wrap').style.display = 'inline-flex';
            previewInsta.textContent = contactInstagramInput.value;
        }

        // Notice formatted with line breaks
        previewNotice.innerHTML = storeNoticeInput.value.replace(/\n/g, '<br>');

        // B. Theme Handling
        const selectedTheme = getCheckedRadioValue('theme');
        printPage.className = 'print-page'; // reset
        
        if (selectedTheme === 'modern') {
            printPage.classList.add('theme-modern');
        } else if (selectedTheme === 'wood') {
            printPage.classList.add('theme-wood');
        } // 'hanji' is default (no class needed)

        // C. Layout Handling & Content Rendering
        const selectedLayout = getCheckedRadioValue('layout');
        
        // Apply Orientation class
        if (selectedLayout === 'landscape') {
            printPage.classList.add('landscape');
            printPage.classList.remove('portrait');
        } else {
            printPage.classList.add('portrait');
            printPage.classList.remove('landscape');
        }

        if (selectedLayout === 'set-focus') {
            printPage.classList.add('layout-set-focus');
        } else {
            printPage.classList.remove('layout-set-focus');
        }

        // Filter showing items
        const jeonggwaItems = currentItems.filter(item => item.cat === 'jeonggwa' && item.show);
        const orandaItems = currentItems.filter(item => item.cat === 'oranda' && item.show);
        const setItems = currentItems.filter(item => item.cat === 'sets' && item.show);
        const otherItems = currentItems.filter(item => item.cat === 'others' && item.show);

        // Render helper for single items and grouped options
        const renderItemHTML = (item) => {
            if (item.options) {
                const visibleOpts = item.options.filter(opt => opt.show);
                if (visibleOpts.length === 0) return '';
                
                const optionsListHTML = visibleOpts.map(opt => `
                    <div class="item-option-row">
                        <span class="option-name">${opt.name}</span>
                        <span class="item-dots"></span>
                        <span class="option-price">${opt.price}원</span>
                    </div>
                `).join('');

                return `
                    <div class="menu-item" style="gap: 2px;">
                        <span class="item-name">${item.name}</span>
                        <div class="item-options-list">
                            ${optionsListHTML}
                        </div>
                        ${item.desc ? `<p class="item-desc" style="margin-top: 1mm;">${item.desc}</p>` : ''}
                    </div>
                `;
            } else {
                return `
                    <div class="menu-item">
                        <div class="item-main">
                            <span class="item-name">${item.name}</span>
                            <span class="item-dots"></span>
                            <span class="item-price">${item.price}원</span>
                        </div>
                        ${item.desc ? `<p class="item-desc">${item.desc}</p>` : ''}
                    </div>
                `;
            }
        };

        // Render category block
        const renderCategoryBlock = (title, items) => {
            if (items.length === 0) return '';
            let extraHTML = '';
            if (title === '수제 정과') {
                extraHTML = `
                    <div style="margin-top: 3mm; padding: 1.5mm 3mm; background-color: rgba(140, 98, 57, 0.04); border-radius: 4px; border: 1px dashed var(--menu-primary); text-align: center; font-size: 8.5pt; font-weight: 700; color: var(--menu-primary); font-family: var(--font-heading); page-break-inside: avoid;">
                        💮 정과 4종 구매 시 못난이정과 토핑용 30g 증정!
                    </div>
                `;
            }
            return `
                <div class="menu-category">
                    <h3 class="category-title">${title}</h3>
                    <div class="category-items">
                        ${items.map(item => renderItemHTML(item)).join('')}
                    </div>
                    ${extraHTML}
                </div>
            `;
        };

        previewBody.innerHTML = ''; // reset body

        if (selectedLayout === 'portrait') {
            // PORTRAIT: 2 columns at the top for Jeonggwa & Oranda. Bottom featured box for Sets.
            const colsWrap = document.createElement('div');
            colsWrap.className = 'menu-columns-two';
            
            // Col 1: Jeonggwa + Others (if any)
            let col1HTML = renderCategoryBlock('수제 정과', jeonggwaItems);
            if (otherItems.length > 0) {
                col1HTML += renderCategoryBlock('기타 상품', otherItems);
            }
            
            // Col 2: Oranda
            let col2HTML = renderCategoryBlock('수제 오란다', orandaItems);

            colsWrap.innerHTML = `
                <div class="menu-col-1">${col1HTML}</div>
                <div class="menu-col-2">${col2HTML}</div>
            `;
            previewBody.appendChild(colsWrap);

            // Featured box for Sets
            if (setItems.length > 0) {
                const featuredBox = document.createElement('div');
                featuredBox.className = 'menu-featured-box';
                featuredBox.innerHTML = `
                    <h3 class="featured-title">💮 선물 및 답례 세트 💮</h3>
                    <div class="featured-grid-2">
                        ${setItems.map(item => renderItemHTML(item)).join('')}
                    </div>
                `;
                previewBody.appendChild(featuredBox);
            }

        } else if (selectedLayout === 'set-focus') {
            // SET FOCUS PORTRAIT: Group items in a grid at the top. Bottom box has long details of sets.
            const colsWrap = document.createElement('div');
            colsWrap.className = 'menu-columns-two';

            // Group normal items
            let col1HTML = renderCategoryBlock('수제 정과', jeonggwaItems);
            if (otherItems.length > 0) {
                col1HTML += renderCategoryBlock('기타 상품', otherItems);
            }
            let col2HTML = renderCategoryBlock('수제 오란다', orandaItems);

            colsWrap.innerHTML = `
                <div class="menu-col-1">${col1HTML}</div>
                <div class="menu-col-2">${col2HTML}</div>
            `;
            previewBody.appendChild(colsWrap);

            // Large highlighted area for sets
            if (setItems.length > 0) {
                const featuredBox = document.createElement('div');
                featuredBox.className = 'menu-featured-box';
                featuredBox.innerHTML = `
                    <h3 class="featured-title">🎁 선물 및 답례 세트 구성 🎁</h3>
                    <div class="featured-grid-2">
                        ${setItems.map(item => renderItemHTML(item)).join('')}
                    </div>
                `;
                previewBody.appendChild(featuredBox);
            }
            
        } else if (selectedLayout === 'landscape') {
            // LANDSCAPE: 3 columns side-by-side. 
            // Col 1: Jeonggwa, Col 2: Oranda, Col 3: Sets + Notice/Contacts or other items
            const colsWrap = document.createElement('div');
            colsWrap.className = 'menu-columns-three';

            // Col 1: Jeonggwa
            let col1HTML = renderCategoryBlock('수제 정과', jeonggwaItems);
            
            // Col 2: Oranda
            let col2HTML = renderCategoryBlock('수제 오란다', orandaItems);
            if (otherItems.length > 0) {
                col2HTML += renderCategoryBlock('기타 상품', otherItems);
            }

            // Col 3: Sets (Rendered inside a nice themed inner box for balance)
            let col3HTML = '';
            if (setItems.length > 0) {
                col3HTML = `
                    <div class="menu-category">
                        <h3 class="category-title">선물 및 답례 세트</h3>
                        <div class="menu-featured-box" style="margin-top:0; padding:4mm 3mm;">
                            <div class="category-items">
                                ${setItems.map(item => renderItemHTML(item)).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }

            colsWrap.innerHTML = `
                <div class="menu-col-1">${col1HTML}</div>
                <div class="menu-col-2">${col2HTML}</div>
                <div class="menu-col-3">${col3HTML}</div>
            `;
            previewBody.appendChild(colsWrap);
        }
    };

    // 7. Auto Scale & Fit to Screen
    const autoFitScale = () => {
        const previewSpace = document.querySelector('.preview-space');
        const spaceWidth = previewSpace.clientWidth - 80; // margins
        const spaceHeight = previewSpace.clientHeight - 80;
        
        const isLandscape = getCheckedRadioValue('layout') === 'landscape';
        const pageWidth = isLandscape ? 297 * 3.779527559 : 210 * 3.779527559; // mm to px conversion approx
        const pageHeight = isLandscape ? 210 * 3.779527559 : 297 * 3.779527559;

        const scaleX = spaceWidth / pageWidth;
        const scaleY = spaceHeight / pageHeight;
        let bestScale = Math.min(scaleX, scaleY);
        
        // Clamp scale between 0.3 and 1.2
        bestScale = Math.max(0.3, Math.min(1.2, bestScale));
        
        // Round to 2 decimal places
        bestScale = Math.round(bestScale * 20) / 20;

        scaleSlider.value = bestScale;
        scaleValue.textContent = Math.round(bestScale * 100) + '%';
        scaleWrapper.style.transform = `scale(${bestScale})`;
    };

    // Manual scaling handler
    scaleSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        scaleValue.textContent = Math.round(val * 100) + '%';
        scaleWrapper.style.transform = `scale(${val})`;
    });

    // Handle window resize
    window.addEventListener('resize', autoFitScale);

    // 8. Event Listeners for Design & Basic Info Settings
    const handleSettingChange = () => {
        saveToLocalStorage();
        updatePreview();
        autoFitScale();
    };

    // Bind text/textarea inputs
    [
        storeTitleInput, storeSubtitleInput, storeEmblemInput,
        contactPhoneInput, contactKakaoInput, contactInstagramInput,
        storeNoticeInput
    ].forEach(input => {
        input.addEventListener('input', handleSettingChange);
    });

    // Bind layout and theme radio clicks
    layoutRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            handleSettingChange();
            // Re-render editor items in case some list order changes or layout toggle affects it
        });
    });

    themeRadios.forEach(radio => {
        radio.addEventListener('change', handleSettingChange);
    });

    // 9. Reset Button functionality
    btnReset.addEventListener('click', () => {
        if (confirm('메뉴 가격과 타이틀 등 모든 편집 내용을 초기값으로 되돌리시겠습니까?')) {
            localStorage.removeItem('haruondam_menu_items');
            localStorage.removeItem('haruondam_menu_settings');
            initData();
        }
    });

    // 10. Print Button functionality
    btnPrint.addEventListener('click', () => {
        const selectedLayout = getCheckedRadioValue('layout');
        
        // Dynamically create a style tag to override browser print options (orientation)
        const style = document.createElement('style');
        style.type = 'text/css';
        style.media = 'print';
        
        if (selectedLayout === 'landscape') {
            style.innerHTML = '@page { size: A4 landscape; margin: 10mm; }';
        } else {
            style.innerHTML = '@page { size: A4 portrait; margin: 10mm; }';
        }
        
        document.head.appendChild(style);
        
        // Trigger Print dialog
        window.print();
        
        // Clean up injected style tag
        setTimeout(() => {
            document.head.removeChild(style);
        }, 1000);
    });

    // Run Initialization
    initData();
});
