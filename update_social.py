import os
import re

files_to_update = [
    'index.html',
    'about.html',
    'contact.html',
    'case-studies.html',
    'portfolio.html',
    'project-details.html'
]

old_block = '''                    <ul class="footer-links">
                        <li><a href="https://www.behance.net/youssefal-husi" target="_blank">بيهانس</a></li>
                        <li><a href="https://www.instagram.com/youssefalhusiny/?hl=en" target="_blank">إنستغرام</a></li>
                        <li><a href="https://www.linkedin.com/feed/" target="_blank">لينكدإن</a></li>
                        <li><a href="#" target="_blank">إكس</a></li>
                        <li><a href="https://www.youtube.com/@youssefalhusiny" target="_blank">يوتيوب</a></li>
                    </ul>'''

new_block = '''                    <ul class="footer-links">
                        <li><a href="https://www.linkedin.com/feed/" target="_blank">لينكدإن</a></li>
                        <li><a href="https://www.behance.net/youssefal-husi" target="_blank">بيهانس</a></li>
                        <li><a href="#" target="_blank">إكس</a></li>
                        <li><a href="https://www.instagram.com/youssefalhusiny/?hl=en" target="_blank">إنستغرام</a></li>
                        <li><a href="https://www.youtube.com/@youssefalhusiny" target="_blank">يوتيوب</a></li>
                    </ul>'''

for filename in files_to_update:
    filepath = os.path.join(r'C:\Users\Antica\Desktop\Youssef Alhusiny\Web', filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # We will use regex to find the UL block under <h4 class="footer-title">تابعني</h4> just in case of formatting differences.
        pattern = r'<h4 class="footer-title">تابعني</h4>\s*<ul class="footer-links">.*?</ul>'
        
        replacement = f'<h4 class="footer-title">تابعني</h4>\n{new_block}'
        
        new_content, count = re.subn(pattern, replacement, content, flags=re.DOTALL)
        
        if count > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"Could not find block in {filename}")
