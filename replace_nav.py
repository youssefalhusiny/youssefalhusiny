import os
import re

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace <li><a href="articles">المقالات</a></li>
        # and <li><a href="articles" class="active">المقالات</a></li>
        # with "تفكيك"
        new_content = re.sub(r'href="articles"(.*?)>المقالات</a>', r'href="articles"\1>تفكيك</a>', content)
        
        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
