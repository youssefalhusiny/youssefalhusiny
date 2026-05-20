// Mobile Menu Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body scroll
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

// Force scroll to top on page load and disable browser automatic scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.8, // Incredibly premium slowness and gentle inertia
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky smooth exponential deceleration
    smoothWheel: true,
    smoothTouch: false
});

// Register GSAP ScrollTrigger and sync with Lenis
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);

// Use GSAP's ticker to drive Lenis (removes redundant requestAnimationFrame loop to prevent scroll jumping)
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Force scroll to top on complete load
window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });
});


// Set initial states for hero elements
gsap.set([".hero-title", ".hero-subtitle", ".hero-cta-btn"], { y: 30, opacity: 0 });

// Hero Animations on load
window.addEventListener("load", () => {
    const heroTl = gsap.timeline();

    heroTl.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
    })
        .to(".hero-subtitle", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to(".hero-cta-btn", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8");
});

// Scroll Animations for all sections except hero
const sections = gsap.utils.toArray('section:not(.hero), .footer');

sections.forEach((section) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
});

// Stagger animation for gallery items
gsap.from(".gallery-item", {
    scrollTrigger: {
        trigger: ".gallery",
        start: "top 75%",
    },
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    stagger: 0.15,
    ease: "power3.out"
});

// Stagger animation for typographic editorial cards
gsap.from(".editorial-typo-card", {
    scrollTrigger: {
        trigger: ".articles",
        start: "top 75%",
    },
    y: 40,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power3.out"
});

// Luxury Navbar Scroll behavior (Always fixed, toggle background style on scroll)
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for solid background when scrolled down past 50px
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Trigger Animation for Contact Section
gsap.from(".contact-studio-card", {
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 75%",
    },
    x: 60,
    opacity: 0,
    duration: 1.4,
    ease: "power3.out"
});

gsap.from(".contact-form-wrapper", {
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 75%",
    },
    x: -60,
    opacity: 0,
    duration: 1.4,
    ease: "power3.out"
});

// Interactive Form Submit with premium animation feedback
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = inquiryForm.querySelector('.submit-btn-luxury');
        const originalContent = submitBtn.innerHTML;
        
        // Animated loading state
        submitBtn.innerHTML = '<span class="btn-text">جاري إرسال رؤيتك...</span>';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            // Success transition
            submitBtn.innerHTML = '<span class="btn-text">تم استلام استبيانك بنجاح! شكرًا لك</span>';
            submitBtn.style.borderColor = '#10b981';
            submitBtn.style.color = '#10b981';
            
            // Elegant recovery to original state
            setTimeout(() => {
                inquiryForm.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
                submitBtn.style.opacity = '';
                submitBtn.style.pointerEvents = '';
            }, 4000);
        }, 1800);
    });
}
