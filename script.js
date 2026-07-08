document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Menu Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .btn-nav');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 2. Modal Controls (for Product Detail Modals)
    const openButtons = document.querySelectorAll('.btn-open-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevents scroll
            }
        });
    });

    const closeModal = (modal) => {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restores scroll
    };

    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modalId = closeBtn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                closeModal(targetModal);
            }
        });
    });

    // Close modal when clicking outside of modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    closeModal(modal);
                }
            });
        }
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const animateElements = document.querySelectorAll(
        '.philosophy-card, .program-card, .feature-item, .about-image-area, .about-text-area, .contact-card'
    );

    // Initialize styling classes for animations
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
    });

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 4. Interactive Estimate Calculator (간이 견적 계산기)
    const calcType = document.getElementById('calc-type');
    const calcQty = document.getElementById('calc-qty');
    const calcPkg = document.getElementById('calc-pkg');
    const btnQtyMinus = document.getElementById('btn-qty-minus');
    const btnQtyPlus = document.getElementById('btn-qty-plus');
    const calcResult = document.getElementById('calc-result');

    if (calcType && calcQty && calcPkg && calcResult) {
        const calculateTotal = () => {
            // Get selected product price
            const selectedProduct = calcType.options[calcType.selectedIndex];
            const productUnitPrice = parseInt(selectedProduct.getAttribute('data-price')) || 0;

            // Get quantity
            let qty = parseInt(calcQty.value) || 0;
            
            // Limit limits
            if (qty < 5) qty = 5;
            if (qty > 1000) qty = 1000;
            calcQty.value = qty;

            // Get selected package price
            const selectedPkg = calcPkg.options[calcPkg.selectedIndex];
            const pkgUnitPrice = parseInt(selectedPkg.getAttribute('data-price')) || 0;

            // Base calculation
            let total = (productUnitPrice + pkgUnitPrice) * qty;

            // Multi-quantity Discount (100개 이상 5% 할인)
            if (qty >= 100) {
                total = Math.round(total * 0.95);
            }

            // Display formatting (Korean currency formatting)
            calcResult.textContent = total.toLocaleString('ko-KR') + '원';
        };

        // Event listeners for change
        calcType.addEventListener('change', calculateTotal);
        calcQty.addEventListener('input', calculateTotal);
        calcPkg.addEventListener('change', calculateTotal);

        // Plus/Minus Buttons Control
        if (btnQtyMinus && btnQtyPlus) {
            btnQtyMinus.addEventListener('click', () => {
                let currentVal = parseInt(calcQty.value) || 50;
                if (currentVal > 5) {
                    calcQty.value = currentVal - 5; // 5개 단위 증감
                    calculateTotal();
                }
            });

            btnQtyPlus.addEventListener('click', () => {
                let currentVal = parseInt(calcQty.value) || 50;
                if (currentVal < 1000) {
                    calcQty.value = currentVal + 5; // 5개 단위 증감
                    calculateTotal();
                }
            });
        }

        // Initial Calculation
        calculateTotal();
    }

    // 5. Contact Form Submission Feedback
    const contactForm = document.getElementById('consultation-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract inputs
            const customerName = document.getElementById('customer-name').value;
            const eventType = document.getElementById('event-type').options[document.getElementById('event-type').selectedIndex].text;
            const phone = document.getElementById('phone').value;
            const qty = document.getElementById('form-qty').value;
            const date = document.getElementById('delivery-date').value;
            const messageText = document.getElementById('message').value;

            // Formulate KakaoTalk Chat Template
            const formDataText = `[하루온담 답례품 견적 신청]\n` +
                                 `• 성함: ${customerName}님\n` +
                                 `• 연락처: ${phone}\n` +
                                 `• 행사 분류: ${eventType}\n` +
                                 `• 예상 수량: ${qty}개\n` +
                                 `• 희망 배송일: ${date}\n` +
                                 `• 문의 및 요청 사항:\n${messageText}`;

            // Copy text to clipboard and open KakaoTalk Chat link
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(formDataText).then(() => {
                    alert(`📋 견적 요청서 내용이 클립보드에 복사되었습니다!\n\n확인 버튼을 누르시면 카카오톡 1:1 채팅창이 열립니다. 입력창을 길게 눌러 '붙여넣기' 하신 뒤 전송해 주시면 신속하게 견적을 도와드리겠습니다.`);
                    window.open('http://pf.kakao.com/_npxmxnG/chat', '_blank');
                }).catch(() => {
                    alert(`카카오톡 1:1 견적 상담으로 연결합니다.\n\n내용이 복사가 안 되었을 경우 직접 입력창에 내용을 보내주시면 상세 상담을 진행해 드립니다.`);
                    window.open('http://pf.kakao.com/_npxmxnG/chat', '_blank');
                });
            } else {
                alert(`카카오톡 1:1 견적 상담으로 연결합니다.`);
                window.open('http://pf.kakao.com/_npxmxnG/chat', '_blank');
            }
            
            contactForm.reset();
            if (calcQty) {
                calcQty.value = 50; // Reset calculator as well
                if (typeof calculateTotal === 'function') calculateTotal();
            }
        });
    }

    // 6. Products Tab Switcher
    const tabButtons = document.querySelectorAll('.btn-tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Hide all panels
                tabPanels.forEach(panel => panel.classList.remove('active'));
                // Show matching panel
                const targetTabId = btn.getAttribute('data-tab');
                const targetPanel = document.getElementById(targetTabId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
});

// Global Helper Function for Set Menu Calculator Linkage
window.selectSetAndScroll = function(value) {
    const select = document.getElementById('calc-type');
    if (select) {
        select.value = value;
        // Trigger change event to recalculate price
        select.dispatchEvent(new Event('change'));
    }
    const target = document.getElementById('packaging');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
};
