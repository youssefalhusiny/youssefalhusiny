import re

with open('articles.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract head and nav
head_match = re.search(r'(<!DOCTYPE html>.*?</nav>)', html, flags=re.DOTALL)
head_nav = head_match.group(1) if head_match else ''

# Extract footer and scripts
footer_match = re.search(r'(<!-- فوتر الموقع المطابق -->.*</html>)', html, flags=re.DOTALL)
footer_scripts = footer_match.group(1) if footer_match else ''

# Template
template = head_nav + '''
    <main class="case-main">
        <!-- Hero Section -->
        <section class="case-hero">
            <div class="case-hero-image">
                <img src="__IMAGE__" alt="__TITLE__">
                <div class="case-hero-overlay"></div>
            </div>
            <div class="case-hero-content">
                <span class="case-kicker">__KICKER__</span>
                <h1 class="case-title">__TITLE__</h1>
            </div>
        </section>

        <!-- Overview Section -->
        <section class="case-overview">
            <div class="container">
                <div class="case-overview-grid">
                    <div class="overview-text">
                        <h2>نظرة عامة</h2>
                        <p>__DESC__</p>
                        <p>هذا النص هو مساحة مؤقتة لعرض تفاصيل إضافية حول المشروع. يمكنك لاحقاً استبداله بنص يشرح الفكرة المعمارية أو الفنية، وكيف تم تنفيذ الفكرة على أرض الواقع لخلق هذه التجربة الفريدة. يعتمد هذا التصميم على المساحات السلبية لإعطاء العين فرصة للتنفس والتركيز على المحتوى البصري.</p>
                    </div>
                    <div class="overview-meta">
                        <div class="meta-item">
                            <span class="meta-label">النوع</span>
                            <span class="meta-value">تفكيك أعمال</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">السنة</span>
                            <span class="meta-value">2026</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Visual Showcase Section -->
        <section class="case-gallery">
            <div class="container">
                <div class="case-gallery-grid">
                    <div class="gallery-item large">
                        <img src="__IMAGE__" alt="__TITLE__ 1">
                    </div>
                    <div class="gallery-item">
                        <img src="__IMAGE__" alt="__TITLE__ 2">
                    </div>
                    <div class="gallery-item">
                        <img src="__IMAGE__" alt="__TITLE__ 3">
                    </div>
                </div>
            </div>
        </section>

        <!-- Next / Prev Projects -->
        <section class="case-navigation">
            <div class="container">
                <div class="nav-wrapper">
                    <a href="articles.html" class="back-to-all">العودة للبطاقات</a>
                </div>
            </div>
        </section>
    </main>
''' + footer_scripts

cards = [
    {'id': 'shin', 'title': 'شين', 'kicker': 'دراسة حالة', 'image': 'شين.png', 'desc': 'مشروع شين يمثل تجسيداً للفكرة بأسلوب بسيط ومعبر.'},
    {'id': 'rashaf', 'title': 'رشف', 'kicker': 'دراسة حالة', 'image': 'رشف.png', 'desc': 'مشروع رشف هو استكشاف في البصريات والهدوء.'},
    {'id': 'bayhom', 'title': 'بينهم', 'kicker': 'دراسة حالة', 'image': 'بينهم.png', 'desc': 'تصميم يركز على الروابط والتواصل البصري.'},
    {'id': 'daralula', 'title': 'دار العلا', 'kicker': 'هوية بصرية', 'image': 'Dar Al-Ula Branding.jpg', 'desc': 'تطوير هوية بصرية تعكس عراقة المكان وتطوره.'},
    {'id': 'bayomi', 'title': 'بايومي', 'kicker': 'قصائد للحياة', 'image': 'Poems for Life.jpg', 'desc': 'مشروع بايومي: قصائد مرئية تُروى عبر التصميم.'},
    {'id': 'light', 'title': 'ضوء', 'kicker': 'إيقاع', 'image': '_light_.jpg', 'desc': 'الضوء كمصدر أساسي للإلهام والتكوين البصري.'}
]

for card in cards:
    content = template.replace('__TITLE__', card['title'])
    content = content.replace('__IMAGE__', card['image'])
    content = content.replace('__KICKER__', card['kicker'])
    content = content.replace('__DESC__', card['desc'])
    
    with open(f"case-{card['id']}.html", 'w', encoding='utf-8') as out_f:
        out_f.write(content)

print('Generated all case pages.')
