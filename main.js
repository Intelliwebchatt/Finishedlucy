document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.main-nav');
    const spans = mobileMenuBtn?.querySelectorAll('span');

    // Handle scroll effects
    function updateNav() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // Toggle mobile menu
    function toggleMobileMenu(show) {
        if (!mobileMenuBtn || !navLinks || !spans) return;
        
        if (show === undefined) {
            // Toggle mode
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            spans.forEach(span => span.classList.toggle('active'));
        } else {
            // Explicit mode
            mobileMenuBtn.classList[show ? 'add' : 'remove']('active');
            navLinks.classList[show ? 'add' : 'remove']('active');
            spans.forEach(span => span.classList[show ? 'add' : 'remove']('active'));
        }
    }

    // Initial nav state
    updateNav();

    // Mobile menu toggle click handler
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
    }

    // Handle navigation clicks
    document.querySelectorAll('.nav-links a, .hero a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu if open
            toggleMobileMenu(false);

            // Get the target section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page reload
                history.pushState(null, '', targetId);
            }
        });
    });

    // Update nav on scroll
    window.addEventListener('scroll', updateNav, { passive: true });

    // Handle window resize
    window.addEventListener('resize', () => {
        // Close mobile menu if window is resized past mobile breakpoint
        if (window.innerWidth > 768) {
            toggleMobileMenu(false);
        }
    }, { passive: true });

    // Handle initial URL hash
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
});
