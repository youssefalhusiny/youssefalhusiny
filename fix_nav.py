import glob, codecs, re
for f in glob.glob('*.html'):
    with codecs.open(f, 'r', 'utf-8') as file:
        content = file.read()
    content = re.sub(r'<a([^>]*)href="gallery(?:.html)?"([^>]*)>??????</a>', r'<a\1href="portfolio.html"\2>???? ???????</a>', content)
    with codecs.open(f, 'w', 'utf-8') as file:
        file.write(content)
print('Done')
