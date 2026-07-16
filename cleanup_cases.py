import os
import re

files_to_delete = [
    'case-rashaf.html',
    'case-bayhom.html',
    'case-daralula.html',
    'case-bayomi.html',
    'case-light.html'
]

for f in files_to_delete:
    if os.path.exists(f):
        os.remove(f)

with open('articles.html', 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    full_match = match.group(0)
    href_attr = match.group(1)
    
    # We want to replace case-*.html with case-shin.html
    new_href = 'href="case-shin.html"'
    return full_match.replace(href_attr, new_href)

# We are replacing all case-xxx.html links with case-shin.html
new_content = re.sub(r'(href="case-[^"]*\.html")(\s*class="inspired-card")', replacer, content, flags=re.DOTALL)

with open('articles.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Cleaned up and updated articles.html")
