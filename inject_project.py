import re

translations = {
  "text_238": {"ar": "لماذا توقفت؟", "en": "Why did you stop?"},
  "text_239": {"ar": "انقر للمواصلة", "en": "Click to continue"},
  "text_240": {"ar": "تفاصيل المشروع", "en": "Project Details"},
  "text_241": {"ar": "العميل", "en": "Client"},
  "text_242": {"ar": "مستقل", "en": "Independent"},
  "text_243": {"ar": "النوع", "en": "Type"},
  "text_244": {"ar": "موشن جرافيك · 3D", "en": "Motion Graphics · 3D"},
  "text_245": {"ar": "التاريخ", "en": "Date"},
  "text_246": {"ar": "تشغيل الفيديو", "en": "Play Video"},
  "text_247": {"ar": "نظرة عامة", "en": "Overview"},
  "text_248": {"ar": "كان التحدي الرئيسي هو تجسيد هذه الرؤية الفلسفية المعقدة في شكل مرئي مبسط وقوي في نفس الوقت. استخدمت حركة الحرف العربي لخلق توازن بين الثبات والتحول، مع التركيز على التكوينات البصرية التي تعكس التناقضات بين الفناء والمعنى، مما أدى إلى منتج نهائي يحاكي عمق الفكرة الأساسية.", "en": "The main challenge was embodying this complex philosophical vision into a simple yet powerful visual form. I used the movement of Arabic calligraphy to create a balance between stability and transformation, focusing on visual compositions that reflect the contradictions between mortality and meaning."},
  "text_249": {"ar": "المشكلة", "en": "The Problem"},
  "text_250": {"ar": "تحويل مفاهيم فلسفية مجردة إلى سرد بصري مفهوم وجذاب.", "en": "Translating abstract philosophical concepts into an engaging and comprehensible visual narrative."},
  "text_251": {"ar": "الهدف", "en": "The Goal"},
  "text_252": {"ar": "صناعة هوية بصرية حركية تعكس التوازن بين الفناء والمعنى.", "en": "Creating a kinetic visual identity that reflects the balance between mortality and meaning."},
  "text_253": {"ar": "الدور", "en": "Role"},
  "text_254": {"ar": "ما قبل الإنتاج", "en": "Pre-production"},
  "text_255": {"ar": "تشريح العمل", "en": "Work Anatomy"},
  "text_256": {"ar": "تتطلب صناعة الأثر دقة متناهية في كل تفصيلة، من البناء الأولي وحتى خروج المشهد للنور.", "en": "Creating an impact requires absolute precision in every detail, from initial construction to bringing the scene to life."},
  "text_257": {"ar": "النتائج والأرقام", "en": "Results & Numbers"},
  "text_258": {"ar": "مشاهدة", "en": "Views"},
  "text_259": {"ar": "نسبة النقر", "en": "Click Rate"},
  "text_260": {"ar": "تفاعل حقيقي", "en": "Real Engagement"},
  "text_261": {"ar": "ماذا أقول", "en": "What I Say"},
  "text_262": {"ar": "كل مشروع هو رحلة لاكتشاف أبعاد جديدة للتعبير البصري. العمل هنا لم يكن مجرد بناء مشهد، بل كان محاولة جادة لترجمة الأفكار غير الملموسة إلى لغة يفهمها البصر، حيث تتشابك الرؤية الفنية مع الرسالة العميقة لتخلق تجربة لا تُنسى.", "en": "Every project is a journey to discover new dimensions of visual expression. The work here was not merely building a scene, but a serious attempt to translate intangible ideas into a visual language, intertwining artistic vision with a profound message."},
  "text_263": {"ar": "في هذا المشروع، لم يكن التحدي الأكبر في إتقان الحركة أو ضبط الإضاءة، بل في كيفية تطويع هذه الأدوات التقنية لخدمة الفكرة المجردة. التقنية مجرد أداة، الأثر الحقيقي يُخلق عندما تلامس القصة شيئاً صادقاً بداخلنا. التجربة أكدت لي أن أقوى الأعمال البصرية هي تلك التي تترك مساحة للمشاهد ليكمل القصة بخياله، بدلاً من إخباره بكل شيء.", "en": "The biggest challenge wasn't mastering movement or lighting, but adapting these technical tools to serve the abstract idea. Technology is merely a tool; true impact is created when the story touches something genuine within us. The most powerful visual works leave room for the viewer's imagination."},
  "text_264": {"ar": "دعنا نبني فكرتك", "en": "Let's Build Your Idea"},
  "text_265": {"ar": "الأعمال التالية", "en": "Next Projects"},
  "text_266": {"ar": "تصميم بصري يجمع بين الخط والتصوير.", "en": "A visual design combining calligraphy and photography."},
  "text_267": {"ar": "عمل بصري يتناول العلاقات الإنسانية.", "en": "A visual piece exploring human relationships."},
  "text_268": {"ar": "هوية بصرية تعكس روح العلا.", "en": "A visual identity reflecting the spirit of AlUla."}
}

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "r", encoding="utf-8") as f:
    content = f.read()

# Insert AR into AR block
ar_match = re.search(r'(const translations = \{\s*ar: \{)(.*?)(?=\n\s*\},)', content, flags=re.DOTALL)
if ar_match:
    ar_block = ar_match.group(2)
    # Check if last line has a comma
    new_ar = ar_block.rstrip()
    if not new_ar.endswith(','):
        new_ar += ','
    
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
    if not new_en.endswith(','):
        new_en += ','
    
    for key, vals in translations.items():
        if f'"{key}"' not in new_en:
            # Escape quotes
            safe_en = vals["en"].replace('"', '\\"')
            new_en += f'\n    "{key}": "{safe_en}",'
    
    new_en = new_en.rstrip(',')
    content = content[:en_match.start(2)] + new_en + content[en_match.end(2):]

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Injected all missing keys!")
