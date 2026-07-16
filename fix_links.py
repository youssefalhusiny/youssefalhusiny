import re
import os

def update_index():
    if not os.path.exists('index.html'): return
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('href="project"', 'href="case-shin.html"')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

def update_gallery():
    if not os.path.exists('gallery.html'): return
    with open('gallery.html', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    out_lines = []
    in_gallery_item = False
    div_depth = 0
    
    for line in lines:
        if '<div class="gallery-item">' in line:
            line = line.replace('<div class="gallery-item">', '<a href="case-shin.html" class="gallery-item" style="display:block; text-decoration:none; color:inherit;">')
            in_gallery_item = True
            div_depth = 1
            out_lines.append(line)
            continue
        
        if in_gallery_item:
            # Count divs to find the closing one
            div_depth += line.count('<div')
            div_depth -= line.count('</div')
            
            if div_depth == 0 and '</div>' in line:
                # This is the closing div for gallery-item
                line = line.replace('</div>', '</a>', 1)
                in_gallery_item = False
                
        out_lines.append(line)
        
    with open('gallery.html', 'w', encoding='utf-8') as f:
        f.writelines(out_lines)

update_index()
update_gallery()
print("Links updated successfully.")
