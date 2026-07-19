import re

ar_additions = {
    "text_159": "بينهم",
    "text_160": "حوار الفردية والمنظومة",
    "text_161": "تحليل فلسفي يبحث في المقارنة والدمج بين التفكير الفردي الإبداعي والتفكير المؤسسي المستدام، وكيف يمكن للمنظومات الناجحة أن تحتضن فرادة المبتكرين دون خسارة تماسك الكيان.",
    "text_162": "رشف",
    "text_163": "أحترم فيه تقديسه للفرادة الفردية، ورفضه لـ \"عقلية القطيع\"، وقدرة الإنسان المستقل على صياغة قيمه الخاصة. لكنني لم أتبعه في عدميته القاسية؛ بل أختار تسخير تلك الإرادة في بناء هياكل جمالية منظمة.",
    "text_164": "بايومي",
    "text_165": "أحترم فيه عقلانيته المفرطة وقدرته على نمذجة الحياة والعمل في هيئة نظام متسق مبني على مبادئ وحلقات تغذية راجعة واضحة. لكنني لم أتبعه في محاولته مكننة المشاعر؛ فالفن والعفوية لا يمكن قياسها.",
    "text_168": "شين",
    "text_204": "مشاريع مختارة",
    "text_205": "فيديو موشن جرافيك يستكشف مفهوم الحرف العربي وعلاقته بالهوية البصرية والثقافية عبر حركة مدروسة وإيقاع بصري متأنٍّ.",
    "text_206": "تصميم بصري يجمع بين الخط العربي والتصوير الضوئي في تجربة مرئية تتسلل إلى الحواس بهدوء وعمق غير مباشر.",
    "text_207": "عمل بصري يتناول العلاقات الإنسانية وما يسكن المساحات الصامتة بين الناس من توتر ودفء وغموض لا يُقال.",
    "text_208": "هوية بصرية متكاملة تجمع بين عراقة المكان وحداثة التصميم في منظومة بصرية تعكس روح العلا وعمقها الحضاري.",
    "text_209": "مشروع بصري شعري يترجم النصوص الأدبية إلى تجارب مرئية تأملية تقف عند حدود ما بين الكلمة والصورة والمعنى.",
    "text_210": "دراسة بصرية في الضوء وتأثيره على الفضاء والمزاج، تُسجَّل عبر لقطات دقيقة وتكوينات هادئة تجعل من الإضاءة لغةً قائمة بذاتها.",
    "text_214": "أحدث المشاريع",
    "text_215": "سينماتوغرافيا تجريدية",
    "text_216": "طيف أزرق",
    "text_217": "توجيه إبداعي",
    "text_218": "تناغم الحواس",
    "text_219": "تصميم مرئي",
    "text_220": "انعكاس الروح",
    "text_221": "إنتاج فني",
    "text_222": "ظل النور",
    "text_223": "مارتين إمدور — لوحة مائية تشكيلية",
    "text_224": "رجل في المحيط — سكون الأعماق",
    "text_225": "تأمل عميق — زوايا الضوء الشارد",
    "text_226": "صمت مطبق — درجات الرمادي",
    "text_227": "غموض المياه — انسيابية الكتل",
    "text_228": "انعكاس الضوء — حوار الظلال",
    "text_229": "أفق بعيد — تجريد معاصر",
    "text_230": "حوار ملهم — فلسفة الفراغ",
    "text_231": "أبعاد تشكيلية — هندسة حركية صامتة",
    "text_232": "أحلام معمارية — مملكة الشغف",
    "text_233": "زوايا حادة — انعطافات حرة",
    "text_234": "تبادلات حسية — ظلال متباينة",
    "text_235": "خطوط الأفق — موازين بصرية",
    "text_236": "حوار الماء والجسد — أثر جمالي",
    "text_237": "لحظة تأمل — السكون المطلق"
}

en_additions = {
    "text_159": "Among Them",
    "text_160": "Dialogue of Individuality and System",
    "text_161": "A philosophical analysis exploring the comparison and integration between creative individual thinking and sustainable institutional thinking, and how successful systems can embrace the uniqueness of innovators without losing the entity's cohesion.",
    "text_162": "Rashf",
    "text_163": "I respect his veneration of individual uniqueness, his rejection of the 'herd mentality', and the independent human's ability to forge their own values. But I did not follow him in his harsh nihilism; rather, I choose to harness that will in building organized aesthetic structures.",
    "text_164": "Bayoumi",
    "text_165": "I respect his extreme rationality and ability to model life and work into a consistent system built on clear principles and feedback loops. But I did not follow him in his attempt to mechanize feelings; art and spontaneity cannot be measured.",
    "text_168": "Shin",
    "text_204": "Selected Projects",
    "text_205": "A motion graphics video exploring the concept of the Arabic letter and its relationship with visual and cultural identity through deliberate movement and a measured visual rhythm.",
    "text_206": "A visual design combining Arabic calligraphy and photography in a visual experience that quietly and indirectly permeates the senses.",
    "text_207": "A visual work addressing human relationships and what dwells in the silent spaces between people: unspoken tension, warmth, and mystery.",
    "text_208": "An integrated visual identity combining the heritage of the place and the modernity of design in a visual system reflecting the spirit of AlUla and its civilizational depth.",
    "text_209": "A poetic visual project translating literary texts into contemplative visual experiences standing at the boundaries between word, image, and meaning.",
    "text_210": "A visual study on light and its effect on space and mood, recorded through precise shots and serene compositions making lighting a language of its own.",
    "text_214": "Latest Projects",
    "text_215": "Abstract Cinematography",
    "text_216": "Blue Spectrum",
    "text_217": "Creative Direction",
    "text_218": "Harmony of Senses",
    "text_219": "Visual Design",
    "text_220": "Reflection of the Soul",
    "text_221": "Art Production",
    "text_222": "Shadow of Light",
    "text_223": "Martine Emdur — Abstract Watercolor",
    "text_224": "Man in the Ocean — Stillness of the Depths",
    "text_225": "Deep Contemplation — Angles of Stray Light",
    "text_226": "Profound Silence — Shades of Gray",
    "text_227": "Mystery of Waters — Fluidity of Masses",
    "text_228": "Reflection of Light — Dialogue of Shadows",
    "text_229": "Distant Horizon — Contemporary Abstraction",
    "text_230": "Inspiring Dialogue — Philosophy of the Void",
    "text_231": "Plastic Dimensions — Silent Kinetic Geometry",
    "text_232": "Architectural Dreams — Kingdom of Passion",
    "text_233": "Sharp Angles — Free Turns",
    "text_234": "Sensory Exchanges — Contrasting Shadows",
    "text_235": "Horizon Lines — Visual Balances",
    "text_236": "Dialogue of Water and Body — Aesthetic Mark",
    "text_237": "Moment of Contemplation — Absolute Stillness"
}

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "r", encoding="utf-8") as f:
    content = f.read()

# Insert into Arabic section
ar_str = ""
for k, v in ar_additions.items():
    ar_str += f'    "{k}": "{v}",\n'
content = content.replace('"text_213": "ابدأ المحادثة",', f'"text_213": "ابدأ المحادثة",\n{ar_str}')

# Insert into English section
en_str = ""
for k, v in en_additions.items():
    en_str += f'    "{k}": "{v}",\n'
content = content.replace('"text_213": "Start Conversation",', f'"text_213": "Start Conversation",\n{en_str}')

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated translations.js")
