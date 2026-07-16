import re

with open('articles.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'شين': 'case-shin.html',
    'رشف': 'case-rashaf.html',
    'بينهم': 'case-bayhom.html',
    'دار العلا': 'case-daralula.html',
    'بايومي': 'case-bayomi.html',
    'ضوء': 'case-light.html'
}

# The links are currently <a href="study-case.html?id=...">
# We need to find the <a href="..."> block that contains the title.
# We can do this by regexing the <a href="[^"]*"(.*?)<h3 class="inspired-card-title">(.*?)</h3>
# It is simpler to find the card blocks and replace the href.

def replacer(match):
    full_match = match.group(0)
    href_attr = match.group(1)
    title = match.group(3)
    
    if title in replacements:
        new_href = f'href="{replacements[title]}"'
        # replace the href_attr in the full_match
        return full_match.replace(href_attr, new_href)
    return full_match

# <a href="..." class="inspired-card"> ... <h3 class="inspired-card-title">TITLE</h3>
new_content = re.sub(r'(href="[^"]*")(\s*class="inspired-card".*?<h3 class="inspired-card-title">)(.*?)(</h3>)', replacer, content, flags=re.DOTALL)

with open('articles.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("articles.html updated")
