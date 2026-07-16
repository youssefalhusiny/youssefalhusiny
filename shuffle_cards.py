import re
import random

with open('articles.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Match the first group
match = re.search(r'(<section class="art-section" id="group-1">.*?<div class="articles-4-grid">)(.*?)(</section>\s*<!-- المجموعة الثانية -->)', content, flags=re.DOTALL)
if match:
    pre = match.group(1)
    group1_content = match.group(2)
    post = match.group(3)
    
    # Split by class="inspired-card">
    parts = group1_content.split('class="inspired-card">')
    
    # parts[0] is the whitespace before the first card
    prefix = parts[0]
    cards = parts[1:7]
    
    # We need to change the 6th card's image and title (which is currently "ايقاع")
    # Actually, we can just replace "ايقاع" card specifically or just cards[5].
    
    cards[5] = re.sub(r'<img src="[^"]+"', '<img src="_light_.jpg"', cards[5], count=1)
    cards[5] = re.sub(r'<h3 class="inspired-card-title">[^<]+</h3>', '<h3 class="inspired-card-title">ضوء</h3>', cards[5], count=1)
    
    # Now shuffle the 6 cards
    # Using a fixed seed for predictability or just random
    random.shuffle(cards)
    
    # Reassemble
    new_group1_content = prefix + 'class="inspired-card">'.join([''] + cards)[1:] # [1:] to remove the leading empty string caused by join if we didn't do it carefully
    # Wait, 'class="inspired-card">'.join(cards) will just join the cards. We need 'class="inspired-card">' before each card.
    # Because when we split by 'class="inspired-card">', the delimiter was removed.
    
    new_group1_content = prefix + 'class="inspired-card">'.join(cards) # wait, the first item needs 'class="inspired-card">' too.
    # Ah, parts[0] already ends with something like `<a href="..." ` or `<div ` but NOT `class="inspired-card">`.
    # Let's reconstruct carefully:
    # Actually: group1_content == parts[0] + 'class="inspired-card">' + parts[1] + 'class="inspired-card">' + ...
    # So if we shuffle cards (parts[1:7]), we just join them with 'class="inspired-card">'
    new_group1_content = prefix + 'class="inspired-card">'.join([''] + cards)[1:] # Wait
    
    # Correct way:
    new_group1_content = prefix + 'class="inspired-card">'.join([''] + cards)[22:] # wait no
    new_group1_content = prefix + 'class="inspired-card">' + 'class="inspired-card">'.join(cards)
    
    # Actually the safest way:
    # prefix + 'class="inspired-card">' + cards[0] + 'class="inspired-card">' + cards[1] ...
    new_group1_content = prefix + 'class="inspired-card">'.join([c for c in cards]) 
    new_group1_content = prefix + 'class="inspired-card">' + 'class="inspired-card">'.join(cards)
    
    new_content = content[:match.start()] + pre + new_group1_content + post + content[match.end():]
    
    with open('articles.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Cards replaced and shuffled successfully.')
else:
    print('Group 1 not found')
