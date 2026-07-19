import re

# 1. Inject missing translations
translations = {
    "text_189": {"ar": "هل لديك فكرة تود تجسيدها؟", "en": "Have an idea you\\'d like to bring to life?"},
    "text_190": {"ar": "دعنا نصنع أثراً معاً. إذا كانت لديك رؤية تبحث عن تجسيد حقيقي، أو أفكار مبدئية تنتظر من يمنحها الحياة، يسعدني أن نستكشف آفاقها ونصيغها في واقع ملموس.", "en": "Let\\'s create an impact together. If you have a vision looking for true embodiment, or preliminary ideas waiting for someone to bring them to life, I\\'d be happy to explore their horizons and shape them into a tangible reality."},
    "text_191": {"ar": "الإسم الكامل", "en": "Full Name"},
    "text_192": {"ar": "البريد الإلكتروني", "en": "Email Address"},
    "text_193": {"ar": "رقم الهاتف", "en": "Phone Number"},
    "text_194": {"ar": "موضوع المشروع وتفاصيله", "en": "Project Topic and Details"},
    "text_195": {"ar": "إرسال الطلب", "en": "Submit Request"},
    "text_196": {"ar": "محادثة مباشرة", "en": "Direct Chat"},
    "text_197": {"ar": "المراسلات الرسمية", "en": "Official Correspondence"},
    "text_198": {"ar": "الفضاء الفيزيائي", "en": "Physical Space"},
    "text_199": {"ar": "الاسم", "en": "Name"},
    "text_200": {"ar": "البريد", "en": "Email"},
    "text_201": {"ar": "الهاتف", "en": "Phone"},
    "text_202": {"ar": "موضوع المشروع", "en": "Project Topic"}
}

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "r", encoding="utf-8") as f:
    content = f.read()

# Insert AR into AR block
ar_match = re.search(r'(const translations = \{\s*ar: \{)(.*?)(?=\n\s*\},)', content, flags=re.DOTALL)
if ar_match:
    ar_block = ar_match.group(2)
    new_ar = ar_block.rstrip()
    if not new_ar.endswith(','): new_ar += ','
    for key, vals in translations.items():
        if f'"{key}"' not in new_ar:
            new_ar += f'\n    "{key}": "{vals["ar"]}",'
    new_ar = new_ar.rstrip(',')
    content = content[:ar_match.start(2)] + new_ar + content[ar_match.end(2):]

# Insert EN into EN block
en_match = re.search(r'(en: \{)(.*?)(?=\n\s*\})', content, flags=re.DOTALL)
if en_match:
    en_block = en_match.group(2)
    new_en = en_block.rstrip()
    if not new_en.endswith(','): new_en += ','
    for key, vals in translations.items():
        if f'"{key}"' not in new_en:
            new_en += f'\n    "{key}": "{vals["en"]}",'
    new_en = new_en.rstrip(',')
    content = content[:en_match.start(2)] + new_en + content[en_match.end(2):]

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "w", encoding="utf-8") as f:
    f.write(content)

# 2. Fix contact.html inline styles
with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\contact.html", "r", encoding="utf-8") as f:
    html = f.read()

html = html.replace('style="text-align: right;"', 'style="text-align: start;"')
html = html.replace('style="direction: rtl;"', 'style="direction: ltr;"')

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\contact.html", "w", encoding="utf-8") as f:
    f.write(html)

# 3. Add LTR overrides to style.css
with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\style.css", "r", encoding="utf-8") as f:
    css = f.read()

fix_css = """
[dir="ltr"] .form-label-luxury {
    right: auto;
    left: 0;
    transform-origin: top left;
}

[dir="ltr"] .input-focus-line {
    right: auto;
    left: 0;
}
"""

if '[dir="ltr"] .form-label-luxury' not in css:
    css += fix_css

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\style.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Contact translations and LTR styles fixed!")
