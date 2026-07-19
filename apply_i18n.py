import os

# Define the replacements for index.html
# We'll use exact string replacements to add data-i18n attributes

replacements = [
    # Head script
    ('<script src="script.js"></script>', '<script src="translations.js"></script>\n    <script src="script.js"></script>'),
    
    # Nav
    ('<li><a href="#hero" class="active">البداية</a></li>', '<li><a href="#hero" class="active" data-i18n="nav.home">البداية</a></li>'),
    ('<li><a href="portfolio.html">معرض الأعمال</a></li>', '<li><a href="portfolio.html" data-i18n="nav.portfolio">معرض الأعمال</a></li>'),
    ('<li><a href="case-studies">دراسات حالة</a></li>', '<li><a href="case-studies" data-i18n="nav.cases">دراسات حالة</a></li>'),
    ('<li><a href="about">من أنا</a></li>', '<li><a href="about" data-i18n="nav.about">من أنا</a></li>'),
    ('<li><a href="contact">تواصل معي</a></li>', '<li><a href="contact" data-i18n="nav.contact">تواصل معي</a></li>'),
    
    # Hero
    ('<p class="hero-subtitle hero-initial-hide">مفكر، كاتب، ومؤسس. يسعى لصناعة أثرٍ حقيقي في هذا العالم؛ يشقّ طريقه بالبحث والسير، ويُجسد أفكاره ورؤاه في أعمالٍ وتجسيدات ملموسة على أرض الواقع.</p>', '<p class="hero-subtitle hero-initial-hide" data-i18n="hero.subtitle">مفكر، كاتب، ومؤسس. يسعى لصناعة أثرٍ حقيقي في هذا العالم؛ يشقّ طريقه بالبحث والسير، ويُجسد أفكاره ورؤاه في أعمالٍ وتجسيدات ملموسة على أرض الواقع.</p>'),
    ('<a href="https://wa.me/966577545142" target="_blank" class="hero-cta-btn hero-initial-hide">تحدث معي</a>', '<a href="https://wa.me/966577545142" target="_blank" class="hero-cta-btn hero-initial-hide" data-i18n="hero.cta">تحدث معي</a>'),
    
    # About
    ('<div class="brand-logo">يوسف الحسيني</div>', '<div class="brand-logo" data-i18n="about.name">يوسف الحسيني</div>'),
    ('<div class="brand-est">مفكر، كاتب، ومؤسس</div>', '<div class="brand-est" data-i18n="about.title">مفكر، كاتب، ومؤسس</div>'),
    ('<p>أؤمن أن الحياة فرصة وحيدة، لذا أرفض اختزالها، رغم إدراكي التام لزوالها وزوال كل ما يُبنى فيها. هذا التناقض لا يربكني؛ بل أراه توازناً، حيث لا تعارض بين الفناء والمعنى، وإنما هو امتزاج لا يراه إلا من يتأمل الصورة الكاملة.</p>', '<p data-i18n="about.p1">أؤمن أن الحياة فرصة وحيدة، لذا أرفض اختزالها، رغم إدراكي التام لزوالها وزوال كل ما يُبنى فيها. هذا التناقض لا يربكني؛ بل أراه توازناً، حيث لا تعارض بين الفناء والمعنى، وإنما هو امتزاج لا يراه إلا من يتأمل الصورة الكاملة.</p>'),
    ('<p>لا أميل إلى الانحياز، ولا أرتاح للولاء الأعمى للأفكار أو الأشخاص؛ فالانتماء الضيق سجن يحرم العقل من آفاق الرؤية الشاملة. أنظر إلى العالم بعين مجردة وتواقة للمطلق، متخففاً من قيود الأيديولوجيا والمسلمات المسبقة؛ لا يهمني مَن قال، بل يهمني ما قيل، فالأفكار الحقيقية هي التي تملك سلطتها الذاتية وتتحدث بلغة الحقيقة المجردة.</p>', '<p data-i18n="about.p2">لا أميل إلى الانحياز، ولا أرتاح للولاء الأعمى للأفكار أو الأشخاص؛ فالانتماء الضيق سجن يحرم العقل من آفاق الرؤية الشاملة. أنظر إلى العالم بعين مجردة وتواقة للمطلق، متخففاً من قيود الأيديولوجيا والمسلمات المسبقة؛ لا يهمني مَن قال، بل يهمني ما قيل، فالأفكار الحقيقية هي التي تملك سلطتها الذاتية وتتحدث بلغة الحقيقة المجردة.</p>'),
    ('<p>أسعى لأن يكون لموتي معنى عميق يكافئ ولادتي، ولأن يترك وجودي في هذا العالم أثراً واضحاً ملموساً وصامتاً في آن واحد؛ أثراً يشبه نقش الحجر الذي لا يمحوه الزمن, يؤدي دوره الوجودي الكامل، ويلهم الآخرين بصمت، ثم ينسحب بهدوء، تاركاً خلفه فراغاً أنيقاً يملأه المعنى.</p>', '<p data-i18n="about.p3">أسعى لأن يكون لموتي معنى عميق يكافئ ولادتي، ولأن يترك وجودي في هذا العالم أثراً واضحاً ملموساً وصامتاً في آن واحد؛ أثراً يشبه نقش الحجر الذي لا يمحوه الزمن, يؤدي دوره الوجودي الكامل، ويلهم الآخرين بصمت، ثم ينسحب بهدوء، تاركاً خلفه فراغاً أنيقاً يملأه المعنى.</p>'),
    
    # Portfolio
    ('<span class="section-kicker-small">مشاريع مختارة</span>', '<span class="section-kicker-small" data-i18n="portfolio.kicker">مشاريع مختارة</span>'),
    ('<h2 class="section-title-medium">معرض الأعمال</h2>', '<h2 class="section-title-medium" data-i18n="portfolio.title">معرض الأعمال</h2>'),
    ('<h3 class="gallery-overlay-title">شين</h3>', '<h3 class="gallery-overlay-title" data-i18n="proj.shin.title">شين</h3>'),
    ('<p class="gallery-overlay-desc">فيديو موشن جرافيك يستكشف مفهوم الحرف العربي وعلاقته بالهوية البصرية والثقافية عبر حركة مدروسة وإيقاع بصري متأنٍّ.</p>', '<p class="gallery-overlay-desc" data-i18n="proj.shin.desc">فيديو موشن جرافيك يستكشف مفهوم الحرف العربي وعلاقته بالهوية البصرية والثقافية عبر حركة مدروسة وإيقاع بصري متأنٍّ.</p>'),
    ('<h3 class="gallery-overlay-title">رشف</h3>', '<h3 class="gallery-overlay-title" data-i18n="proj.rashf.title">رشف</h3>'),
    ('<p class="gallery-overlay-desc">تصميم بصري يجمع بين الخط العربي والتصوير الضوئي في تجربة مرئية تتسلل إلى الحواس بهدوء وعمق غير مباشر.</p>', '<p class="gallery-overlay-desc" data-i18n="proj.rashf.desc">تصميم بصري يجمع بين الخط العربي والتصوير الضوئي في تجربة مرئية تتسلل إلى الحواس بهدوء وعمق غير مباشر.</p>'),
    ('<h3 class="gallery-overlay-title">بينهم</h3>', '<h3 class="gallery-overlay-title" data-i18n="proj.baynahom.title">بينهم</h3>'),
    ('<p class="gallery-overlay-desc">عمل بصري يتناول العلاقات الإنسانية وما يسكن المساحات الصامتة بين الناس من توتر ودفء وغموض لا يُقال.</p>', '<p class="gallery-overlay-desc" data-i18n="proj.baynahom.desc">عمل بصري يتناول العلاقات الإنسانية وما يسكن المساحات الصامتة بين الناس من توتر ودفء وغموض لا يُقال.</p>'),
    ('<h3 class="gallery-overlay-title">Dar Al-Ula Branding</h3>', '<h3 class="gallery-overlay-title" data-i18n="proj.dar.title">Dar Al-Ula Branding</h3>'),
    ('<p class="gallery-overlay-desc">هوية بصرية متكاملة تجمع بين عراقة المكان وحداثة التصميم في منظومة بصرية تعكس روح العلا وعمقها الحضاري.</p>', '<p class="gallery-overlay-desc" data-i18n="proj.dar.desc">هوية بصرية متكاملة تجمع بين عراقة المكان وحداثة التصميم في منظومة بصرية تعكس روح العلا وعمقها الحضاري.</p>'),
    ('<h3 class="gallery-overlay-title">Poems for Life</h3>', '<h3 class="gallery-overlay-title" data-i18n="proj.poems.title">Poems for Life</h3>'),
    ('<p class="gallery-overlay-desc">مشروع بصري شعري يترجم النصوص الأدبية إلى تجارب مرئية تأملية تقف عند حدود ما بين الكلمة والصورة والمعنى.</p>', '<p class="gallery-overlay-desc" data-i18n="proj.poems.desc">مشروع بصري شعري يترجم النصوص الأدبية إلى تجارب مرئية تأملية تقف عند حدود ما بين الكلمة والصورة والمعنى.</p>'),
    ('<h3 class="gallery-overlay-title">Light</h3>', '<h3 class="gallery-overlay-title" data-i18n="proj.light.title">Light</h3>'),
    ('<p class="gallery-overlay-desc">دراسة بصرية في الضوء وتأثيره على الفضاء والمزاج، تُسجَّل عبر لقطات دقيقة وتكوينات هادئة تجعل من الإضاءة لغةً قائمة بذاتها.</p>', '<p class="gallery-overlay-desc" data-i18n="proj.light.desc">دراسة بصرية في الضوء وتأثيره على الفضاء والمزاج، تُسجَّل عبر لقطات دقيقة وتكوينات هادئة تجعل من الإضاءة لغةً قائمة بذاتها.</p>'),
    
    # Articles
    ('<span class="section-kicker-small">تحليل وتفكيك</span>', '<span class="section-kicker-small" data-i18n="articles.kicker">تحليل وتفكيك</span>'),
    ('<h2 class="section-title-medium">دراسات حالة</h2>', '<h2 class="section-title-medium" data-i18n="articles.title">دراسات حالة</h2>'),
    ('<h3 class="inspired-card-title">بينهم</h3>', '<h3 class="inspired-card-title" data-i18n="proj.baynahom.title">بينهم</h3>'),
    ('<span class="inspired-card-kicker">حوار الفردية والمنظومة</span>', '<span class="inspired-card-kicker" data-i18n="art1.kicker">حوار الفردية والمنظومة</span>'),
    ('<p class="inspired-card-desc">تحليل فلسفي يبحث في المقارنة والدمج بين التفكير الفردي الإبداعي والتفكير المؤسسي المستدام، وكيف يمكن للمنظومات الناجحة أن تحتضن فرادة المبتكرين دون خسارة تماسك الكيان.</p>', '<p class="inspired-card-desc" data-i18n="art1.desc">تحليل فلسفي يبحث في المقارنة والدمج بين التفكير الفردي الإبداعي والتفكير المؤسسي المستدام، وكيف يمكن للمنظومات الناجحة أن تحتضن فرادة المبتكرين دون خسارة تماسك الكيان.</p>'),
    ('<h3 class="inspired-card-title">رشف</h3>', '<h3 class="inspired-card-title" data-i18n="proj.rashf.title">رشف</h3>'),
    ('<span class="inspired-card-kicker">إرادة القوة والفرادة</span>', '<span class="inspired-card-kicker" data-i18n="art2.kicker">إرادة القوة والفرادة</span>'),
    ('<p class="inspired-card-desc">أحترم فيه تقديسه للفرادة الفردية، ورفضه لـ "عقلية القطيع"، وقدرة الإنسان المستقل على صياغة قيمه الخاصة. لكنني لم أتبعه في عدميته القاسية؛ بل أختار تسخير تلك الإرادة في بناء هياكل جمالية منظمة.</p>', '<p class="inspired-card-desc" data-i18n="art2.desc">أحترم فيه تقديسه للفرادة الفردية، ورفضه لـ "عقلية القطيع"، وقدرة الإنسان المستقل على صياغة قيمه الخاصة. لكنني لم أتبعه في عدميته القاسية؛ بل أختار تسخير تلك الإرادة في بناء هياكل جمالية منظمة.</p>'),
    ('<h3 class="inspired-card-title">بايومي</h3>', '<h3 class="inspired-card-title" data-i18n="art3.title">بايومي</h3>'),
    ('<span class="inspired-card-kicker">المبادئ والأنظمة</span>', '<span class="inspired-card-kicker" data-i18n="art3.kicker">المبادئ والأنظمة</span>'),
    ('<p class="inspired-card-desc">أحترم فيه عقلانيته المفرطة وقدرته على نمذجة الحياة والعمل في هيئة نظام متسق مبني على مبادئ وحلقات تغذية راجعة واضحة. لكنني لم أتبعه في محاولته مكننة المشاعر؛ فالفن والعفوية لا يمكن قياسها.</p>', '<p class="inspired-card-desc" data-i18n="art3.desc">أحترم فيه عقلانيته المفرطة وقدرته على نمذجة الحياة والعمل في هيئة نظام متسق مبني على مبادئ وحلقات تغذية راجعة واضحة. لكنني لم أتبعه في محاولته مكننة المشاعر؛ فالفن والعفوية لا يمكن قياسها.</p>'),
    ('>اطلع على المزيد</a>', ' data-i18n="articles.more">اطلع على المزيد</a>'),
    
    # Contact
    ('هل لديك فكرة تود تجسيدها؟', '<span data-i18n="contact.title">هل لديك فكرة تود تجسيدها؟</span>'),
    ('دعنا نصنع أثراً معاً. إذا كانت لديك رؤية تبحث عن تجسيد حقيقي، أو أفكار مبدئية تنتظر من يمنحها الحياة، يسعدني أن نستكشف آفاقها ونصيغها في واقع ملموس.', '<span data-i18n="contact.desc">دعنا نصنع أثراً معاً. إذا كانت لديك رؤية تبحث عن تجسيد حقيقي، أو أفكار مبدئية تنتظر من يمنحها الحياة، يسعدني أن نستكشف آفاقها ونصيغها في واقع ملموس.</span>'),
    ('>ابدأ المحادثة</a>', ' data-i18n="contact.btn">ابدأ المحادثة</a>'),
    
    # Footer
    ('<p class="footer-about-text">مفكر، كاتب، ومؤسس. يسعى لصناعة أثرٍ حقيقي في هذا العالم؛ يشقّ طريقه بالبحث والسير، ويُجسد أفكاره ورؤاه في أعمالٍ وتجسيدات ملموسة على أرض الواقع.</p>', '<p class="footer-about-text" data-i18n="hero.subtitle">مفكر، كاتب، ومؤسس. يسعى لصناعة أثرٍ حقيقي في هذا العالم؛ يشقّ طريقه بالبحث والسير، ويُجسد أفكاره ورؤاه في أعمالٍ وتجسيدات ملموسة على أرض الواقع.</p>'),
    ('<h4 class="footer-title">استكشف</h4>', '<h4 class="footer-title" data-i18n="footer.explore">استكشف</h4>'),
    ('<li><a href="#hero">البداية</a></li>', '<li><a href="#hero" data-i18n="nav.home">البداية</a></li>'),
    ('<li><a href="about">من أنا</a></li>', '<li><a href="about" data-i18n="nav.about">من أنا</a></li>'),
    ('<li><a href="gallery">المعرض</a></li>', '<li><a href="gallery" data-i18n="footer.gallery">المعرض</a></li>'),
    ('<li><a href="contact">تواصل معي</a></li>', '<li><a href="contact" data-i18n="nav.contact">تواصل معي</a></li>'),
    ('<h4 class="footer-title">تابعني</h4>', '<h4 class="footer-title" data-i18n="footer.follow">تابعني</h4>'),
    ('>لينكدإن</a>', ' data-i18n="footer.linkedin">لينكدإن</a>'),
    ('>بيهانس</a>', ' data-i18n="footer.behance">بيهانس</a>'),
    ('>إكس</a>', ' data-i18n="footer.x">إكس</a>'),
    ('>إنستغرام</a>', ' data-i18n="footer.insta">إنستغرام</a>'),
    ('>يوتيوب</a>', ' data-i18n="footer.youtube">يوتيوب</a>'),
    ('<h4 class="footer-title">معلومات الاتصال</h4>', '<h4 class="footer-title" data-i18n="footer.contact">معلومات الاتصال</h4>'),
    ('<p class="footer-info-item">القاهرة، جمهورية مصر العربية</p>', '<p class="footer-info-item" data-i18n="footer.location">القاهرة، جمهورية مصر العربية</p>'),
    ('واتساب: ', '<span data-i18n="footer.whatsapp">واتساب: </span>'),
    ('البريد الإلكتروني: ', '<span data-i18n="footer.email">البريد الإلكتروني: </span>'),
    ('&copy; ٢٠٢٦ يوسف الحسيني. جميع الحقوق محفوظة.', '<span data-i18n="footer.copyright">&copy; ٢٠٢٦ يوسف الحسيني. جميع الحقوق محفوظة.</span>'),
    ('<span class="footer-note">مساحة للفكر</span>', '<span class="footer-note" data-i18n="footer.note">مساحة للفكر</span>')
]

html_path = r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

for old, new in replacements:
    content = content.replace(old, new)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("index.html updated successfully!")
