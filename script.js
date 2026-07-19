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
const sections = gsap.utils.toArray('section:not(.hero):not(.no-anim), .footer');

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

// Stagger animation for gallery items (only when the .gallery section is visible)
const galleryTrigger = document.querySelector('.gallery');
if (galleryTrigger && galleryTrigger.style.display !== 'none' && !galleryTrigger.closest('[style*="display: none"]')) {
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
}

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
const contactContainer = document.getElementById('contactFormContainer');

if (inquiryForm && contactContainer) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = inquiryForm.querySelector('button[type="submit"]');
        
        const htmlTag = document.documentElement;
        const lang = htmlTag.getAttribute('lang') || 'ar';
        
        const sendingText = lang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
        const successTitle = lang === 'ar' ? 'تم استلام طلبك بنجاح' : 'Request Received Successfully';
        const successDesc = lang === 'ar' ? 'شكراً لثقتك. سأقوم بمراجعة التفاصيل والتواصل معك قريباً لنبدأ رحلة تجسيد فكرتك.' : 'Thank you for your trust. I will review the details and contact you shortly to begin bringing your idea to life.';

        // Animated loading state
        submitBtn.innerHTML = sendingText;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            // Success transition: Replace entire container with success message
            contactContainer.style.opacity = '0';
            
            setTimeout(() => {
                contactContainer.style.paddingBottom = '1rem'; // Bring contact channels much closer
                contactContainer.innerHTML = `
                    <style>
                        @keyframes successFadeUp {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    </style>
                    <div style="text-align: center; padding: 2rem 0; animation: successFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
                        <h3 style="text-align: center !important; color: rgba(255,255,255,0.95); font-family: 'IBM Plex Sans Arabic', sans-serif; font-weight: 200; font-size: 2.2rem; margin-bottom: 1rem; letter-spacing: -0.5px;">${successTitle}</h3>
                        <p style="text-align: center !important; color: rgba(255,255,255,0.5); font-size: 0.9rem; line-height: 1.8; font-weight: 200; max-width: 500px; margin: 0 auto;">${successDesc}</p>
                    </div>
                `;
                contactContainer.style.opacity = '1';
            }, 800); // Wait for fade out
            
        }, 1500); // Simulate network delay
    });
}

// --- Internal i18n Localization ---
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.querySelector('.lang-switcher');
    
    // Function to apply translation
    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update button text
        if (langBtn) {
            langBtn.textContent = lang === 'ar' ? 'EN' : 'AR';
        }
        
        // Apply translations from translations object (defined in translations.js)
        if (typeof translations !== 'undefined' && translations[lang]) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang][key]) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = translations[lang][key];
                    } else {
                        // For normal elements, keep inner HTML tags if any (like spans or imgs)
                        // This simple approach replaces text. If you have complex HTML inside, 
                        // you might need a more robust approach.
                        el.innerHTML = translations[lang][key];
                    }
                }
            });
        }
        
        // Save preference
        localStorage.setItem('preferredLang', lang);
    };

    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = document.documentElement.lang || 'ar';
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            setLanguage(newLang);
        });
        
        // Initialize from saved preference
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang && savedLang === 'en') {
            setLanguage('en');
        }
    }
});
