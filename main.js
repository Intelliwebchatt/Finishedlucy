document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.main-nav');

    // Verify elements are found
    console.log('Mobile menu button:', mobileMenuBtn);
    console.log('Nav links:', navLinks);

    // Toggle mobile menu
    function toggleMobileMenu() {
        console.log('Toggle menu clicked');
        if (!mobileMenuBtn || !navLinks) {
            console.log('Missing required elements');
            return;
        }

        // Toggle classes
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Toggle button animation
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));

        // Log state
        console.log('Menu active:', navLinks.classList.contains('active'));
    }

    // Mobile menu click handler
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Handle navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                history.pushState(null, '', targetId);
            }
        });
    });

    // Update nav on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, { passive: true });
});
