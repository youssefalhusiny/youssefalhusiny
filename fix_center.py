import re

# Fix project-details.html inline center alignment
with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\project-details.html", "r", encoding="utf-8") as f:
    html = f.read()

# Add !important to text-align: center to protect from global LTR override
html = re.sub(r'text-align:\s*center;?', 'text-align: center !important;', html)

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\project-details.html", "w", encoding="utf-8") as f:
    f.write(html)

# Add exceptions to style.css
with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\style.css", "r", encoding="utf-8") as f:
    css = f.read()

fix_css = """
[dir="ltr"] .results-grid * {
    text-align: center !important;
}
[dir="ltr"] .result-item:not(:first-child) {
    border-right: none;
    border-left: 1px solid rgba(255,255,255,0.12);
}
"""

if '[dir="ltr"] .results-grid' not in css:
    css += fix_css

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\style.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Fixed center alignments and LTR borders.")
