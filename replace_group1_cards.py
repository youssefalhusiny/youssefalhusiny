import re

with open('articles.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Group 1 is between <section class="art-section" id="group-1"> and <!-- المجموعة الثانية -->
match = re.search(r'(<section class="art-section" id="group-1">.*?<div class="articles-4-grid">)(.*?)(</section>\s*<!-- المجموعة الثانية -->)', content, flags=re.DOTALL)
if match:
    pre = match.group(1)
    group1_content = match.group(2)
    post = match.group(3)
    
    parts = group1_content.split('class="inspired-card">')
    
    replacements = [
        ('Dar Al-Ula Branding.jpg', 'دار العلا'),
        ('Poems for Life.jpg', 'بايومي'),
        ('إيقاع - Rhythm _@hibrayer_#hibrayer #hibrayer2026 _#حبراير #حبراير_2026.jpg', 'ايقاع')
    ]
    
    for i in range(3):
        idx = i + 4 # cards 4, 5, 6
        img_src, title = replacements[i]
        part = parts[idx]
        part = re.sub(r'<img src="[^"]+"', f'<img src="{img_src}"', part, count=1)
        part = re.sub(r'<h3 class="inspired-card-title">[^<]+</h3>', f'<h3 class="inspired-card-title">{title}</h3>', part, count=1)
        parts[idx] = part
    
    # Keep only parts[0] to parts[6] (which means the prefix string + 6 cards)
    kept_parts = parts[:7]
    
    # Notice we need to close the last tag properly if it was split
    # Since we split by 'class="inspired-card">', each part after index 0 ends with closing tags (</a> or </div> depending on the tag)
    # So joining them back should be perfectly fine, but we have to trim any trailing spaces in parts[6]
    # actually parts[6] already contains the closing tag for the 6th card.
    
    new_group1_content = 'class="inspired-card">'.join(kept_parts) + '\n                '
    
    new_content = content[:match.start()] + pre + new_group1_content + post + content[match.end():]
    
    with open('articles.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully modified Group 1')
else:
    print('Group 1 not found')
