import glob
import re

html_files = glob.glob(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\*.html")

standard_footer_links = """<ul class="footer-links">
<li><a data-i18n="text_1" href="/#hero">البداية</a></li>
<li><a data-i18n="text_2" href="portfolio.html">معرض الأعمال</a></li>
<li><a data-i18n="text_3" href="case-studies.html">دراسات حالة</a></li>
<li><a data-i18n="text_4" href="about.html">من أنا</a></li>
<li><a data-i18n="text_5" href="contact.html">تواصل معي</a></li>
</ul>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the ul block following <h4 class="footer-title" data-i18n="text_135">استكشف</h4>
    # Or just replace any ul that contains data-i18n="text_1" inside footer-links
    
    # Let's find the footer block
    pattern = r'(<h4[^>]*data-i18n="text_135"[^>]*>.*?</h4>\s*)<ul class="footer-links">.*?</ul>'
    new_content = re.sub(pattern, r'\1' + standard_footer_links, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed footer in {file}")

