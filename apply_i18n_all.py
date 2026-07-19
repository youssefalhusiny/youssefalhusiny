import os
import glob

# Shared replacements across all files (Nav, Footer)
shared_replacements = [
    # Head script
    ('<script src="script.js"></script>', '<script src="translations.js"></script>\n    <script src="script.js"></script>'),
    
    # Nav
    ('<li><a href="/" class="active">البداية</a></li>', '<li><a href="/" class="active" data-i18n="nav.home">البداية</a></li>'),
    ('<li><a href="/">البداية</a></li>', '<li><a href="/" data-i18n="nav.home">البداية</a></li>'),
    ('<li><a href="#hero" class="active">البداية</a></li>', '<li><a href="#hero" class="active" data-i18n="nav.home">البداية</a></li>'),
    ('<li><a href="#hero">البداية</a></li>', '<li><a href="#hero" data-i18n="nav.home">البداية</a></li>'),
    
    ('<li><a href="portfolio.html">معرض الأعمال</a></li>', '<li><a href="portfolio.html" data-i18n="nav.portfolio">معرض الأعمال</a></li>'),
    ('<li><a href="portfolio.html" class="active">معرض الأعمال</a></li>', '<li><a href="portfolio.html" class="active" data-i18n="nav.portfolio">معرض الأعمال</a></li>'),
    
    ('<li><a href="case-studies">دراسات حالة</a></li>', '<li><a href="case-studies" data-i18n="nav.cases">دراسات حالة</a></li>'),
    ('<li><a href="case-studies.html">دراسات حالة</a></li>', '<li><a href="case-studies.html" data-i18n="nav.cases">دراسات حالة</a></li>'),
    ('<li><a href="case-studies" class="active">دراسات حالة</a></li>', '<li><a href="case-studies" class="active" data-i18n="nav.cases">دراسات حالة</a></li>'),
    
    ('<li><a href="about">من أنا</a></li>', '<li><a href="about" data-i18n="nav.about">من أنا</a></li>'),
    ('<li><a href="about.html">من أنا</a></li>', '<li><a href="about.html" data-i18n="nav.about">من أنا</a></li>'),
    ('<li><a href="about" class="active">من أنا</a></li>', '<li><a href="about" class="active" data-i18n="nav.about">من أنا</a></li>'),
    
    ('<li><a href="contact">تواصل معي</a></li>', '<li><a href="contact" data-i18n="nav.contact">تواصل معي</a></li>'),
    ('<li><a href="contact.html">تواصل معي</a></li>', '<li><a href="contact.html" data-i18n="nav.contact">تواصل معي</a></li>'),
    ('<li><a href="contact" class="active">تواصل معي</a></li>', '<li><a href="contact" class="active" data-i18n="nav.contact">تواصل معي</a></li>'),
    
    # Footer
    ('<p class="footer-about-text">مفكر، كاتب، ومؤسس. يسعى لصناعة أثرٍ حقيقي في هذا العالم؛ يشقّ طريقه بالبحث والسير، ويُجسد أفكاره ورؤاه في أعمالٍ وتجسيدات ملموسة على أرض الواقع.</p>', '<p class="footer-about-text" data-i18n="hero.subtitle">مفكر، كاتب، ومؤسس. يسعى لصناعة أثرٍ حقيقي في هذا العالم؛ يشقّ طريقه بالبحث والسير، ويُجسد أفكاره ورؤاه في أعمالٍ وتجسيدات ملموسة على أرض الواقع.</p>'),
    ('<h4 class="footer-title">استكشف</h4>', '<h4 class="footer-title" data-i18n="footer.explore">استكشف</h4>'),
    ('<li><a href="gallery">المعرض</a></li>', '<li><a href="gallery" data-i18n="footer.gallery">المعرض</a></li>'),
    ('<li><a href="portfolio.html">المعرض</a></li>', '<li><a href="portfolio.html" data-i18n="footer.gallery">المعرض</a></li>'),
    ('<h4 class="footer-title">تابعني</h4>', '<h4 class="footer-title" data-i18n="footer.follow">تابعني</h4>'),
    ('>لينكدإن</a>', ' data-i18n="footer.linkedin">لينكدإن</a>'),
    ('>بيهانس</a>', ' data-i18n="footer.behance">بيهانس</a>'),
    ('>إكس</a>', ' data-i18n="footer.x">إكس</a>'),
    ('>إنستغرام</a>', ' data-i18n="footer.insta">إنستغرام</a>'),
    ('>يوتيوب</a>', ' data-i18n="footer.youtube">يوتيوب</a>'),
    ('<h4 class="footer-title">معلومات الاتصال</h4>', '<h4 class="footer-title" data-i18n="footer.contact">معلومات الاتصال</h4>'),
    ('<p class="footer-info-item">القاهرة، جمهورية مصر العربية</p>', '<p class="footer-info-item" data-i18n="footer.location">القاهرة، جمهورية مصر العربية</p>'),
    ('واتساب: ', '<span data-i18n="footer.whatsapp">واتساب: </span>'),
    ('البريد الإلكتروني: ', '<span data-i18n="footer.email">البريد الإلكتروني: </span>'),
    ('&copy; ٢٠٢٦ يوسف الحسيني. جميع الحقوق محفوظة.', '<span data-i18n="footer.copyright">&copy; ٢٠٢٦ يوسف الحسيني. جميع الحقوق محفوظة.</span>'),
    ('<span class="footer-note">مساحة للفكر</span>', '<span class="footer-note" data-i18n="footer.note">مساحة للفكر</span>')
]

directory = r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web"
html_files = glob.glob(os.path.join(directory, "*.html"))

for file_path in html_files:
    if "index.html" in file_path:
        # index.html already processed fully for these, wait, I might have messed up if I run again.
        # But wait, index.html might need the shared replacements if any were missed, but let's skip index.html to be safe.
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if translations.js is already injected to avoid duplicates
    if '<script src="translations.js"></script>' in content:
        continue

    for old, new in shared_replacements:
        content = content.replace(old, new)
        
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Processed {len(html_files) - 1} HTML files for shared components.")
