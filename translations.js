// Translation System
const translations = {
    en: {
        // Navigation
        nav_home: "Home",
        nav_gallery: "Gallery",
        nav_thoughts: "Thoughts",
        nav_about: "About",
        nav_contact: "Contact",

        // Hero Section
        hero_welcome: "WELCOME TO",
        hero_name: "Youssef Al-Husiny",
        hero_text: "Transform your life with our exclusive course designed to help you find your purpose and create meaningful impact.",
        hero_discover: "DISCOVER MORE",
        hero_contact: "CONTACT ME",

        // About Section
        about_subtitle: "If you want to know",
        about_title: "Things about me",
        about_text: "In this course, I help you find your direction and become the person you want to be. I help you create a life of purpose and meaning. I help you find your passion and live it. I help you create the LIFE you are supposed to live. I help you become who you want to become. We go from to create impact and income and have through finding clarity. This is the formula you've been looking for to become the person you want to become with the life you want to live.",
        about_join: "JOIN NOW",

        // Portfolio Section
        portfolio_subtitle: "PORTFOLIO",
        portfolio_title: "Things I Did",
        portfolio_text: "A collection of my latest works",

        // Portfolio Items
        portfolio_summer: "Summer Collection",
        portfolio_fashion: "Fashion",
        portfolio_elegant: "Elegant Style",
        portfolio_luxury: "Luxury",
        portfolio_urban: "Urban Chic",
        portfolio_streetwear: "Streetwear",
        portfolio_minimalist: "Minimalist",
        portfolio_casual: "Casual",
        portfolio_bold: "Bold & Beautiful",
        portfolio_evening: "Evening Wear",
        portfolio_classic: "Classic Black",
        portfolio_formal: "Formal",

        // Clients Section
        clients_subtitle: "COLLABORATIONS",
        clients_title: "Featured Clients",
        clients_text: "Brands I've had the pleasure to work with",

        // Client Projects Section
        projects_subtitle: "CURRENT WORK",
        projects_title: "Client Projects",
        projects_text: "A selection of current projects I'm working on for clients",
        projects_brand: "BRAND IDENTITY",
        projects_web: "WEB DESIGN",
        projects_content: "CONTENT STRATEGY",
        projects_lumina: "Lumina Studios",
        projects_lumina_desc: "Complete brand identity development for a contemporary photography studio, including logo design, color palette, and visual language.",
        projects_modern: "The Modern Writer",
        projects_modern_desc: "Responsive website design and development for an online writing platform, focusing on user experience and content readability.",
        projects_urbanite: "Urbanite Magazine",
        projects_urbanite_desc: "Content strategy and editorial planning for a new urban lifestyle magazine, including content calendar and contributor guidelines.",
        projects_progress: "In Progress",
        projects_months_3: "3 Months",
        projects_months_2: "2 Months",
        projects_months_4: "4 Months",

        // Contact Section
        contact_title: "Get In Touch",
        contact_name: "Your Name",
        contact_email: "Your Email",
        contact_message: "Your Message",
        contact_send: "SEND MESSAGE",

        // Footer
        footer_about: "Transforming lives through purpose-driven education and personal development.",
        footer_links: "Quick Links",
        footer_home: "Home",
        footer_about_link: "About",
        footer_courses: "Courses",
        footer_testimonials: "Testimonials",
        footer_contact: "Contact",
        footer_newsletter: "Newsletter",
        footer_newsletter_text: "Subscribe to our newsletter for the latest updates and exclusive content.",
        footer_email_placeholder: "Your email address",
        footer_copyright: "© 2025 Youssef Al-Husiny. All rights reserved.",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Service",
        footer_cookie: "Cookie Policy",
        footer_instagram: "Instagram",
        footer_twitter: "Twitter",
        footer_linkedin: "LinkedIn"
    },
    ar: {
        // Navigation
        nav_home: "الرئيسية",
        nav_gallery: "المعرض",
        nav_thoughts: "أفكار",
        nav_about: "من أنا",
        nav_contact: "تواصل",

        // Hero Section
        hero_welcome: "مرحباً بك في",
        hero_name: "يوسف الحسيني",
        hero_text: "حول حياتك مع دورتنا الحصرية المصممة لمساعدتك على إيجاد هدفك وإحداث تأثير ذي معنى.",
        hero_discover: "اكتشف المزيد",
        hero_contact: "تواصل معي",

        // About Section
        about_subtitle: "إذا كنت تريد أن تعرف",
        about_title: "أشياء عني",
        about_text: "في هذه الدورة، أساعدك على إيجاد اتجاهك وأن تصبح الشخص الذي تريد أن تكونه. أساعدك على خلق حياة ذات هدف ومعنى. أساعدك على إيجاد شغفك وعيشه. أساعدك على خلق الحياة التي من المفترض أن تعيشها. أساعدك على أن تصبح من تريد أن تصبح. ننتقل من إحداث التأثير والدخل من خلال إيجاد الوضوح. هذه هي الصيغة التي تبحث عنها لتصبح الشخص الذي تريد أن تكونه مع الحياة التي تريد أن تعيشها.",
        about_join: "انضم الآن",

        // Portfolio Section
        portfolio_subtitle: "أعمالي",
        portfolio_title: "أشياء قمت بها",
        portfolio_text: "مجموعة من أحدث أعمالي",

        // Portfolio Items
        portfolio_summer: "مجموعة الصيف",
        portfolio_fashion: "أزياء",
        portfolio_elegant: "أسلوب أنيق",
        portfolio_luxury: "فاخر",
        portfolio_urban: "أناقة حضرية",
        portfolio_streetwear: "أزياء الشارع",
        portfolio_minimalist: "بسيط",
        portfolio_casual: "كاجوال",
        portfolio_bold: "جريء وجميل",
        portfolio_evening: "ملابس السهرة",
        portfolio_classic: "أسود كلاسيكي",
        portfolio_formal: "رسمي",

        // Clients Section
        clients_subtitle: "التعاونات",
        clients_title: "العملاء المميزون",
        clients_text: "العلامات التجارية التي سعدت بالعمل معها",

        // Client Projects Section
        projects_subtitle: "العمل الحالي",
        projects_title: "مشاريع العملاء",
        projects_text: "مجموعة مختارة من المشاريع الحالية التي أعمل عليها للعملاء",
        projects_brand: "هوية العلامة التجارية",
        projects_web: "تصميم الويب",
        projects_content: "استراتيجية المحتوى",
        projects_lumina: "استوديوهات لومينا",
        projects_lumina_desc: "تطوير هوية العلامة التجارية الكاملة لاستوديو تصوير معاصر، بما في ذلك تصميم الشعار ولوحة الألوان واللغة البصرية.",
        projects_modern: "الكاتب المعاصر",
        projects_modern_desc: "تصميم وتطوير موقع ويب متجاوب لمنصة كتابة عبر الإنترنت، مع التركيز على تجربة المستخدم وسهولة قراءة المحتوى.",
        projects_urbanite: "مجلة أوربانايت",
        projects_urbanite_desc: "استراتيجية المحتوى والتخطيط التحريري لمجلة نمط حياة حضرية جديدة، بما في ذلك تقويم المحتوى وإرشادات المساهمين.",
        projects_progress: "قيد التنفيذ",
        projects_months_3: "3 أشهر",
        projects_months_2: "شهران",
        projects_months_4: "4 أشهر",

        // Contact Section
        contact_title: "تواصل معنا",
        contact_name: "اسمك",
        contact_email: "بريدك الإلكتروني",
        contact_message: "رسالتك",
        contact_send: "إرسال الرسالة",

        // Footer
        footer_about: "تحويل الحياة من خلال التعليم الموجه نحو الهدف والتنمية الشخصية.",
        footer_links: "روابط سريعة",
        footer_home: "الرئيسية",
        footer_about_link: "من أنا",
        footer_courses: "الدورات",
        footer_testimonials: "الشهادات",
        footer_contact: "تواصل",
        footer_newsletter: "النشرة الإخبارية",
        footer_newsletter_text: "اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات والمحتوى الحصري.",
        footer_email_placeholder: "عنوان بريدك الإلكتروني",
        footer_copyright: "© 2025 يوسف الحسيني. جميع الحقوق محفوظة.",
        footer_privacy: "سياسة الخصوصية",
        footer_terms: "شروط الخدمة",
        footer_cookie: "سياسة ملفات تعريف الارتباط",
        footer_instagram: "انستغرام",
        footer_twitter: "تويتر",
        footer_linkedin: "لينكد إن"
    }
};

// Current language
let currentLang = localStorage.getItem('selectedLanguage') || 'en';

// Function to translate the page
function translatePage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);

    // Update HTML direction for RTL languages
    const html = document.documentElement;
    if (lang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        document.body.classList.add('rtl');
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        document.body.classList.remove('rtl');
    }

    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // Update language switcher display
    const languageSwitch = document.querySelector('.language-switch');
    if (languageSwitch) {
        languageSwitch.textContent = lang === 'ar' ? 'العربية' : 'English';
    }

    // Update active class in dropdown
    document.querySelectorAll('.language-dropdown a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-lang') === lang) {
            link.classList.add('active');
        }
    });
}

// Initialize translation on page load
document.addEventListener('DOMContentLoaded', function () {
    // Apply saved language
    translatePage(currentLang);

    // Language switcher event handlers
    const languageLinks = document.querySelectorAll('.language-dropdown a');
    languageLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang === 'ar' || lang === 'en') {
                translatePage(lang);
            }
        });
    });
});
