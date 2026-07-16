import re

with open('articles.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add the new grid style in head
style = '''    <style>
        .articles-4-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2.5rem 2rem;
            margin-top: 3rem;
        }
        @media (max-width: 1200px) {
            .articles-4-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        @media (max-width: 991px) {
            .articles-4-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (max-width: 600px) {
            .articles-4-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
'''
content = content.replace('</head>', style + '</head>')

# Replace elegant-article-list with articles-4-grid
content = content.replace('class="elegant-article-list"', 'class="articles-4-grid"')

def replace_item(match):
    tag = match.group(1) # 'a' or 'div'
    href = match.group(2) if match.group(2) else ''
    index = match.group(3)
    img = match.group(4)
    title = match.group(5).strip()
    kicker = match.group(6).strip()
    desc = match.group(7).strip()
    
    start_tag = f'<{tag}{href} class="inspired-card">'
    
    return f'''{start_tag}
                        <div class="inspired-img-wrapper">
                            {img}
                        </div>
                        <div class="inspired-card-content">
                            <div class="inspired-card-header">
                                <h3 class="inspired-card-title">{title}</h3>
                                <span class="inspired-card-kicker">{kicker}</span>
                            </div>
                            <p class="inspired-card-desc">{desc}</p>
                        </div>
                    </{tag}>'''

pattern = r'<(a|div)([^>]*) class="ea-item">\s*<div class="ea-index">(\d+)</div>\s*<div class="ea-image">\s*(<img[^>]*>)\s*</div>\s*<div class="ea-content">\s*<h3 class="ea-title">([^<]+)</h3>\s*<span class="ea-kicker">([^<]+)</span>\s*</div>\s*<div class="ea-desc">([^<]+)</div>\s*<div class="ea-arrow">←</div>\s*</(?:a|div)>'

new_content = re.sub(pattern, replace_item, content, flags=re.DOTALL)

with open('articles.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done replacing cards in articles.html")
