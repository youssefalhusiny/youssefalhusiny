import re
import json

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\about.html", "r", encoding="utf-8") as f:
    html = f.read()

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "r", encoding="utf-8") as f:
    js = f.read()

ar_keys = re.findall(r'"(text_\d+)":\s*"', js)

matches = re.findall(r'data-i18n="(text_\d+)"[^>]*>\s*([^<]+?)\s*<', html)

missing = {}
for key, val in matches:
    if key not in ar_keys:
        missing[key] = val.strip()

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\missing_about.json", "w", encoding="utf-8") as f:
    json.dump(missing, f, ensure_ascii=False, indent=2)
