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
            const qty = document.getElementById('form-qty').value;
            const date = document.getElementById('delivery-date').value;

            // Beautiful feedback modal / alert
            alert(`감사합니다, ${customerName} 고객님!\n\n신청하신 [${eventType} 답례품 / ${qty}개 / 희망 배송일: ${date}] 견적 문의가 성공적으로 접수되었습니다. 기재해주신 연락처로 24시간 이내에 친절하게 상담 전화를 드리겠습니다.`);
            
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
