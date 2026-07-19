import re

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\about.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace inline text-align: right with text-align: start
content = re.sub(r'text-align:\s*right', 'text-align: start', content)

# Replace inline text-align: left with text-align: end
content = re.sub(r'text-align:\s*left', 'text-align: end', content)

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\about.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated about.html inline text alignments to logical properties.")
