import re

with open('articles.html', 'r', encoding='utf-8') as f:
    content = f.read()

parts = content.split('class="inspired-card">')

replacements = [
    ('شين.png', 'شين'),
    ('رشف.png', 'رشف'),
    ('بينهم.png', 'بينهم')
]

for i in range(3):
    img_src, title = replacements[i]
    part = parts[i+1]
    # replace img
    part = re.sub(r'<img src="[^"]+"', f'<img src="{img_src}"', part, count=1)
    # replace title
    part = re.sub(r'<h3 class="inspired-card-title">[^<]+</h3>', f'<h3 class="inspired-card-title">{title}</h3>', part, count=1)
    parts[i+1] = part

new_content = 'class="inspired-card">'.join(parts)

with open('articles.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Cards replaced.')
