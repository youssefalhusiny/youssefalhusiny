import re

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "r", encoding="utf-8") as f:
    content = f.read()

# Insert AR into AR block
ar_match = re.search(r'(const translations = \{\s*ar: \{)(.*?)(?=\n\s*\},)', content, flags=re.DOTALL)
if ar_match:
    ar_block = ar_match.group(2)
    if not ar_block.rstrip().endswith(','):
        new_ar = ar_block.rstrip() + ',\n    "text_269": "كواليس<br/>العمل<br/>والمراحل"'
    else:
        new_ar = ar_block.rstrip() + '\n    "text_269": "كواليس<br/>العمل<br/>والمراحل"'
    
    content = content[:ar_match.start(2)] + new_ar + content[ar_match.end(2):]

# Insert EN into EN block
en_match = re.search(r'(en: \{)(.*?)(?=\n\s*\})', content, flags=re.DOTALL)
if en_match:
    en_block = en_match.group(2)
    if not en_block.rstrip().endswith(','):
        new_en = en_block.rstrip() + ',\n    "text_269": "Behind<br/>The Scenes<br/>& Stages"'
    else:
        new_en = en_block.rstrip() + '\n    "text_269": "Behind<br/>The Scenes<br/>& Stages"'
    
    content = content[:en_match.start(2)] + new_en + content[en_match.end(2):]

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Injected text_269")
