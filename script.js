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

// Refresh ScrollTrigger when DOM height changes (crucial for lazy-loaded images pushing content down)
let scrollRefreshTimeout;
const resizeObserver = new ResizeObserver(() => {
    clearTimeout(scrollRefreshTimeout);
    scrollRefreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 150);
});
resizeObserver.observe(document.body);

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
gsap.set([".hero .hero-title", ".hero .hero-subtitle", ".hero .hero-cta-btn"], { y: 30, opacity: 0 });

// Hero Animations on load
window.addEventListener("load", () => {
    const heroTl = gsap.timeline();

    heroTl.to(".hero .hero-title", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
    })
        .to(".hero .hero-subtitle", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to(".hero .hero-cta-btn", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8");
});

// Project Details Hero Animation on load
window.addEventListener("load", () => {
    const projectHeroBlock = document.getElementById("heroContentBlock");
    if (projectHeroBlock) {
        // Only select direct children that are not hidden scripts
        const projectHeroChildren = Array.from(projectHeroBlock.children).filter(el => el.tagName !== 'SCRIPT');
        
        // Hide them initially
        gsap.set(projectHeroChildren, { y: 30, opacity: 0 });
        
        // Stagger them in
        gsap.to(projectHeroChildren, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2
        });
    }
});

// Scroll Animations for all sections except hero and specific staggered sections
const sections = gsap.utils.toArray('section:not(.hero):not(.no-anim):not(.about):not(.expertise-section):not(.collaboration-section):not(.scattered-gallery-section):not(.case-overview):not(.case-gallery):not(.case-results):not(.case-reflections), .footer');

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

// Stagger animation for Expertise Cards (About page) - triggers individually upon reaching them
const expertiseCards = gsap.utils.toArray('.expertise-card');
expertiseCards.forEach((card, index) => {
    // Simple pseudo-stagger based on DOM order for cards in the same row
    const delay = (index % 4) * 0.15;
    
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%", // Starts only when the specific card enters viewport
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        duration: 1.2,
        delay: delay,
        ease: "power3.out"
    });
});

// Stagger animation for About section elements
gsap.utils.toArray('.about').forEach(aboutSection => {
    const aboutElements = aboutSection.querySelectorAll('.about-brand, .about-details > div, .about-details > p, .stat-item, .bio-social-icons');
    if (aboutElements.length > 0) {
        gsap.from(aboutElements, {
            scrollTrigger: {
                trigger: aboutSection,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out"
        });
    }
});

// Stagger animation for gallery items (works across home and portfolio pages)
const galleryGrids = document.querySelectorAll('.case-gallery-grid');
galleryGrids.forEach(grid => {
    if (grid.offsetParent !== null) { // only if visible
        gsap.from(grid.querySelectorAll(".gallery-item"), {
            scrollTrigger: {
                trigger: grid,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out"
        });
    }
});

// Animation for typographic editorial cards (Case Studies) - triggers per card so bottom rows wait until visible
const articleCards = gsap.utils.toArray('.inspired-card');
articleCards.forEach((card, index) => {
    // Simple pseudo-stagger based on DOM order for cards in the same row
    const delay = (index % 3) * 0.15;
    
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%", // Starts animation when the top of the card is 85% down the viewport
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        duration: 1.2,
        delay: delay,
        ease: "power3.out"
    });
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

// Animation for Collaboration Section (Who do we align with?)
// 1. Animate the sticky header section first
gsap.from(".collaboration-sticky > *", {
    scrollTrigger: {
        trigger: ".collaboration-sticky",
        start: "top 85%",
        toggleActions: "play none none reverse"
    },
    y: 40,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power3.out"
});

// 2. Animate each collab-block individually when it reaches the viewport
gsap.utils.toArray('.collab-block').forEach(block => {
    // Inside each block, we stagger the number, title, and description
    const elements = block.querySelectorAll('.collab-num, .collab-title, .collab-desc');
    
    gsap.from(elements, {
        scrollTrigger: {
            trigger: block,
            start: "top 85%", // trigger only when the specific block arrives
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
    });
});

// Animation for Scattered Gallery Section (مختارات بصرية)
const scatteredElements = gsap.utils.toArray('.scattered-gallery-section .section-header-minimal > *, .scattered-gallery-section .scattered-text-grid > p');
if (scatteredElements.length > 0) {
    gsap.from(scatteredElements, {
        scrollTrigger: {
            trigger: ".scattered-gallery-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
    });
}

const scatterImages = gsap.utils.toArray('.scattered-gallery-section .scatter-img');
scatterImages.forEach((img, index) => {
    gsap.from(img, {
        scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: (index % 3) * 0.15, // slight stagger feel for images close together
        ease: "power3.out"
    });
});

// Animation for Pre-production Section (Project Details)
const caseGalleryHeading = document.querySelector('.case-gallery h2');
if (caseGalleryHeading) {
    gsap.from(caseGalleryHeading, {
        scrollTrigger: {
            trigger: ".case-gallery",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
}

// Animate each Pre-production gallery item individually
gsap.utils.toArray('.case-gallery .gallery-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%", // Trigger when the item itself is reached
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        duration: 1.2,
        delay: (index % 3) * 0.15, // Stagger columns
        ease: "power3.out"
    });
});

// Animation for Breakdowns Image Grid (Project Details)
gsap.utils.toArray('.collaboration-section .collaboration-blocks > div:not(.collab-block)').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        duration: 1.2,
        delay: (index % 2) * 0.15, // It's a 2-column grid
        ease: "power3.out"
    });
});

// Animation for Case Overview Section (Project Details)
const overviewElements = gsap.utils.toArray('.case-overview .overview-text > *, .case-overview .overview-meta .meta-item');
if (overviewElements.length > 0) {
    gsap.from(overviewElements, {
        scrollTrigger: {
            trigger: ".case-overview",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
    });
}

// Animation for Results Section (Project Details)
const resultsElements = gsap.utils.toArray('.case-results .container > p, .case-results .result-item');
if (resultsElements.length > 0) {
    gsap.from(resultsElements, {
        scrollTrigger: {
            trigger: ".case-results",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
    });
}

// Animation for Reflections Section (Project Details)
const reflectionElements = gsap.utils.toArray('.case-reflections h3, .case-reflections img, .case-reflections span, .case-reflections p, .case-reflections .hero-cta-btn');
if (reflectionElements.length > 0) {
    reflectionElements.forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%", // Trigger exactly when the item itself appears
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });
}

// Animation for Contact Channels
const contactChannels = document.querySelector('.contact-channels');
if (contactChannels) {
    gsap.from(".contact-channels > div", {
        scrollTrigger: {
            trigger: ".contact-channels",
            start: "top 85%", 
            toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
    });
}

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
