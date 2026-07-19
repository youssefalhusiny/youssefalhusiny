import re
import json

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\project-details.html", "r", encoding="utf-8") as f:
    html = f.read()

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "r", encoding="utf-8") as f:
    js = f.read()

ar_keys = re.findall(r'"(text_\d+)":\s*"', js)

matches = re.findall(r'data-i18n="(text_\d+)"[^>]*>\s*([^<]+?)\s*<', html)

missing = {}
for key, val in matches:
    if key not in ar_keys:
        missing[key] = val.strip()

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\missing_project.json", "w", encoding="utf-8") as f:
    json.dump(missing, f, ensure_ascii=False, indent=2)

# Also replace text-align: right with text-align: start, and text-align: left with text-align: end
html = re.sub(r'text-align:\s*right', 'text-align: start', html)
html = re.sub(r'text-align:\s*left', 'text-align: end', html)

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\project-details.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Extracted missing project keys and fixed inline text alignments.")
