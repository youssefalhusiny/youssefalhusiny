from bs4 import BeautifulSoup
import re

with open('articles.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the inline <style> block in head
html = re.sub(r'<style>.*?</style>', '', html, flags=re.DOTALL)

soup = BeautifulSoup(html, 'html.parser')

# Find the main tag
main_tag = soup.find('main')
if main_tag:
    main_tag['class'] = main_tag.get('class', []) + ['split-main']
    
    # Remove style attributes from main
    if 'style' in main_tag.attrs:
        del main_tag['style']
        
    # The structure has <section class="inspired-section">
    section = main_tag.find('section', class_='inspired-section')
    if section:
        # We will create a new section content
        new_section = soup.new_tag('div')
        
        container = section.find('div', class_='container')
        
        if container:
            # Iterate through children of container
            current_group_title = None
            current_group_kicker = None
            groups = []
            
            for child in container.children:
                if child.name == 'div':
                    if 'row-header' in child.get('class', []):
                        h3 = child.find('h3')
                        text = h3.get_text(strip=True) if h3 else ''
                        if ':' in text:
                            parts = text.split(':', 1)
                            current_group_kicker = parts[0].strip()
                            current_group_title = parts[1].strip()
                        else:
                            current_group_kicker = ''
                            current_group_title = text
                    elif 'inspired-slider' in child.get('class', []):
                        # Extract all cards
                        cards = []
                        for card in child.find_all(['a', 'div'], class_='inspired-card'):
                            img_wrapper = card.find('div', class_='inspired-img-wrapper')
                            img = img_wrapper.find('img') if img_wrapper else None
                            
                            # Content is in the next div
                            content_divs = card.find_all('div', recursive=False)
                            content_div = content_divs[1] if len(content_divs) > 1 else None
                            
                            if content_div:
                                header_div = content_div.find('div')
                                h3_title = header_div.find('h3') if header_div else None
                                span_role = header_div.find('span') if header_div else None
                                p_desc = content_div.find('p')
                                
                                cards.append({
                                    'tag_name': card.name,
                                    'href': card.get('href', ''),
                                    'img_src': img.get('src', '') if img else '',
                                    'img_alt': img.get('alt', '') if img else '',
                                    'title': h3_title.get_text(strip=True) if h3_title else '',
                                    'role': span_role.get_text(strip=True) if span_role else '',
                                    'desc': p_desc.get_text(strip=True) if p_desc else ''
                                })
                        groups.append({
                            'kicker': current_group_kicker,
                            'title': current_group_title,
                            'cards': cards
                        })
            
            # Now build the new HTML structure
            for group in groups:
                split_section = soup.new_tag('section')
                split_section['class'] = 'split-section'
                
                split_container = soup.new_tag('div')
                split_container['class'] = 'split-container'
                split_section.append(split_container)
                
                # Left (actually right in RTL) column - Header
                header_col = soup.new_tag('div')
                header_col['class'] = 'split-header-col'
                split_container.append(header_col)
                
                sticky_header = soup.new_tag('div')
                sticky_header['class'] = 'sticky-header'
                header_col.append(sticky_header)
                
                if group['kicker']:
                    span_kicker = soup.new_tag('span')
                    span_kicker['class'] = 'sh-kicker'
                    span_kicker.string = group['kicker']
                    sticky_header.append(span_kicker)
                    
                h2_title = soup.new_tag('h2')
                h2_title['class'] = 'sh-title'
                h2_title.string = group['title']
                sticky_header.append(h2_title)
                
                # Right (actually left in RTL) column - List
                list_col = soup.new_tag('div')
                list_col['class'] = 'split-list-col'
                split_container.append(list_col)
                
                for card in group['cards']:
                    row_tag = soup.new_tag('a' if card['href'] else 'div')
                    row_tag['class'] = 'figure-row'
                    if card['href']:
                        row_tag['href'] = card['href']
                        
                    fr_image = soup.new_tag('div')
                    fr_image['class'] = 'fr-image'
                    row_tag.append(fr_image)
                    
                    img = soup.new_tag('img')
                    img['src'] = card['img_src']
                    img['alt'] = card['img_alt']
                    fr_image.append(img)
                    
                    fr_content = soup.new_tag('div')
                    fr_content['class'] = 'fr-content'
                    row_tag.append(fr_content)
                    
                    fr_header = soup.new_tag('div')
                    fr_header['class'] = 'fr-header'
                    fr_content.append(fr_header)
                    
                    h3_name = soup.new_tag('h3')
                    h3_name['class'] = 'fr-name'
                    h3_name.string = card['title']
                    fr_header.append(h3_name)
                    
                    if card['role']:
                        span_role = soup.new_tag('span')
                        span_role['class'] = 'fr-role'
                        span_role.string = card['role']
                        fr_header.append(span_role)
                        
                    fr_body = soup.new_tag('div')
                    fr_body['class'] = 'fr-body'
                    fr_content.append(fr_body)
                    
                    p_desc = soup.new_tag('p')
                    p_desc.string = card['desc']
                    fr_body.append(p_desc)
                    
                    list_col.append(row_tag)
                
                new_section.append(split_section)
            
            # Replace the old section entirely with the new sections
            section.replace_with(new_section)

# Remove the outer div we used to wrap sections by just unwrapping it
new_wrapper = soup.find('main').find('div', recursive=False)
if new_wrapper:
    new_wrapper.unwrap()

with open('articles.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
