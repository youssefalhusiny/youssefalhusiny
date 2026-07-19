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
        
        // Animated loading state
        submitBtn.innerHTML = 'جاري الإرسال...';
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
                        <h3 style="color: rgba(255,255,255,0.95); font-family: 'IBM Plex Sans Arabic', sans-serif; font-weight: 200; font-size: 2.2rem; margin-bottom: 1rem; letter-spacing: -0.5px;">تم استلام طلبك بنجاح</h3>
                        <p style="color: rgba(255,255,255,0.5); font-size: 0.9rem; line-height: 1.8; font-weight: 200; max-width: 500px; margin: 0 auto;">شكراً لثقتك. سأقوم بمراجعة التفاصيل والتواصل معك قريباً لنبدأ رحلة تجسيد فكرتك.</p>
                    </div>
                `;
                contactContainer.style.opacity = '1';
            }, 800); // Wait for fade out
            
        }, 1500); // Simulate network delay
    });
}

// --- Google Translate Integration ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Create a hidden div for Google Translate
    const gtDiv = document.createElement('div');
    gtDiv.id = 'google_translate_element';
    gtDiv.style.cssText = 'position: absolute; opacity: 0; z-index: -999; pointer-events: none;';
    document.body.appendChild(gtDiv);

    // 2. Define the init function
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'ar',
            includedLanguages: 'ar,en',
            autoDisplay: false
        }, 'google_translate_element');
    };

    // 3. Load the Google Translate script
    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);

    // 4. Handle language switcher click
    const langBtn = document.querySelector('.lang-switcher');
    if (langBtn) {
        langBtn.classList.add('notranslate'); // Protect from Google Translate modifying the text
        
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = langBtn.textContent.trim().toUpperCase();
            const selectBox = document.querySelector('.goog-te-combo');
            
            if (currentLang === 'EN') {
                // Switch to English
                document.cookie = 'googtrans=/ar/en; path=/';
                document.cookie = 'googtrans=/ar/en; path=/; domain=' + location.hostname;
                if (selectBox) {
                    selectBox.value = 'en';
                    selectBox.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
                    window.location.reload();
                }
                // Delay text change slightly so Google Translate snapshots the original state properly
                setTimeout(() => langBtn.textContent = 'AR', 50);
            } else {
                // Switch back to Arabic
                document.cookie = 'googtrans=/ar/ar; path=/';
                document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname;
                
                if (selectBox) {
                    selectBox.value = 'ar';
                    selectBox.dispatchEvent(new Event('change', { bubbles: true }));
                    
                    if (selectBox.value !== 'ar') {
                        selectBox.value = '';
                        selectBox.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                } else {
                    window.location.reload();
                }
                // Delay text change so it overrides the DOM restoration
                setTimeout(() => langBtn.textContent = 'EN', 50);
            }
        });

        // 6. Restore active state based on cookie on load
        const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
        if (match) {
            console.log("Language cookie found:", match[2]);
            const transValue = match[2];
            if (transValue === '/ar/en') {
                langBtn.textContent = 'AR';
            }
        }
    }
});

// --- Geolocation Language Detection (Runs immediately) ---
(function() {
    console.log("Checking language cookies and location...");
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    
    if (!match) {
        console.log("No language cookie found. Checking location...");
        const locationChecked = sessionStorage.getItem('locationLangChecked'); 
        
        if (!locationChecked) {
            sessionStorage.setItem('locationLangChecked', 'true');
            fetch('https://get.geojs.io/v1/ip/country.json')
                .then(response => response.json())
                .then(data => {
                    console.log("User country detected as:", data.country);
                    const middleEastCountries = [
                        'AE', 'BH', 'EG', 'IQ', 'JO', 'KW', 'LB', 'OM', 'PS', 'QA', 'SA', 'SY', 'YE', // Middle East
                        'DZ', 'MA', 'TN', 'LY', 'SD', 'MR', 'SO', 'DJ', 'KM', // Other Arab countries
                        'IR', 'TR', 'IL', 'CY' // Others geographically in ME
                    ];
                    if (data.country && !middleEastCountries.includes(data.country)) {
                        console.log("Country is outside Middle East. Switching to English...");
                        document.cookie = 'googtrans=/ar/en; path=/';
                        if (location.hostname) {
                            document.cookie = 'googtrans=/ar/en; path=/; domain=' + location.hostname;
                        }
                        window.location.reload();
                    } else {
                        console.log("Country is in Middle East. Defaulting to Arabic.");
                    }
                })
                .catch(err => console.log('Geolocation detection failed:', err));
        } else {
            console.log("Location was already checked in this session.");
        }
    }
})();
