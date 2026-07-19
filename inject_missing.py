import json
import re

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\missing.json", "r", encoding="utf-8") as f:
    missing_ar = json.load(f)

missing_en = {
  "text_158": "Case Studies Space",
  "text_48": "Will to Power and Individuality",
  "text_57": "Principles and Systems",
  "text_166": "Dar Al-Ula",
  "text_54": "Relativity and Existential Curiosity",
  "text_167": "I respect his infinite childlike curiosity and his brilliant realization that time and space are not absolute. But I didn't follow his quest for a unified cosmic equation; the beauty of existence lies in emotional contradictions and details that defy reduction.",
  "text_45": "Doubt and Existential Methodology",
  "text_169": "I respect his absolute intellectual courage in doubting and dismantling his personal convictions, and his retreat to search for the essence of existential meaning from scratch. But I didn't follow his complete avoidance of material life; I believe in the necessity of staying in the heart of the field.",
  "text_170": "Light",
  "text_60": "First Gateway of Thought",
  "text_171": "He has the first and greatest credit for my entry into the first paths of thinking; he was the one who pulled me with his unique propositions to the first steps of thought. Despite disagreeing with him later, I still hold full respect for him as my first inspiration.",
  "text_172": "Group Two",
  "text_173": "Historical Strategy and Leadership",
  "text_65": "Dr. Nayef bin Nahar",
  "text_66": "Logic and Discourse Deconstruction",
  "text_67": "I respect his brilliant ability to deconstruct discourses and apply the tools of logic and scientific research methodologies in a strict and clear systematic manner, connecting authenticity with contemporary reality.",
  "text_68": "Tamim Al-Barghouti",
  "text_69": "Eloquence of Word and Boldness of Stance",
  "text_174": "I respect his high language and boldness in some situations that require a free voice and a striking poem. However, I differ with him on some doctrinal conceptions, believing that linguistic beauty is incomplete without soundness of methodology.",
  "text_71": "Sun Tzu",
  "text_72": "Strategy and Astuteness",
  "text_175": "I respect his brilliant strategic astuteness, and his early realization that the greatest victories are those won without fighting. But I didn't follow him in turning interaction into a battlefield; rather, I employ this planning to penetrate the market smoothly.",
  "text_74": "Khalid Ibn Al-Walid",
  "text_75": "Military Genius and Audacity",
  "text_176": "I respect his unparalleled tactical genius, his courage in delving into the unknown, and his ability to alter the course of any challenge through quick wit and firm certainty. I draw inspiration from this audacity in penetrating markets.",
  "text_77": "Alexander the Great",
  "text_78": "Imperial Ambition and Conquering the Unknown",
  "text_177": "I respect his boundless ambition and legendary ability to lead armies. But I didn't follow his expansionist path; rather, I choose to transform this passion into creative conquests that enrich human civilization without destruction.",
  "text_83": "Niccolò Machiavelli",
  "text_178": "Political Realism and the Study of Power",
  "text_179": "I respect his extreme realism in reading human nature without embellishment. I disagree with his principle 'the end justifies the means'; as I believe the means is an integral part of the end's honor.",
  "text_104": "Omar Ibn Al-Khattab",
  "text_105": "Strict Justice and Institutional Foundation",
  "text_180": "I respect his absolute justice and his genius in establishing ministries and building state structures from scratch with institutional awareness ahead of his time. I draw inspiration from his systematic firmness and commitment to absolute truth.",
  "text_181": "Group Three",
  "text_182": "Creativity, Vision, and Entrepreneurship",
  "text_80": "Al Pacino",
  "text_183": "Creative Embodiment and Psychological Depth",
  "text_184": "I respect his brilliant ability for complete psychological embodiment and deep immersion into the complexities of dramatic characters. But I disagree with the excessive emotional consumption; I believe in maintaining a conscious distance to build real entities.",
  "text_86": "Ibn Khaldun",
  "text_87": "Urbanization and Reading History",
  "text_185": "I respect his founding of sociology and his deep understanding of the nature of urbanization and the rise and fall of civilizations. I rely on his methodology in reading 'Urbanization' to attempt building works that transcend time and interact genuinely with the context of their societies.",
  "text_89": "Steve Jobs",
  "text_90": "Practical Vision and Linking Philosophy to Work",
  "text_186": "I respect his brilliant practical vision and exceptional ability to link philosophy with work. But I did not follow his extreme perfectionism and managerial harshness that might eliminate the flexible human dimension in order to achieve the vision.",
  "text_92": "Nikola Tesla",
  "text_93": "Imaginative Thinking and Infinite Energy",
  "text_187": "I respect his amazing ability for creative imagination and seeing the future decades ahead. But I didn't follow his dreamy idealism; as I believe in the necessity of grounding the inspiring idea into reality and transforming it into a sustainable entity.",
  "text_95": "Hayao Miyazaki",
  "text_96": "Visual Storytelling and Fantasy Worlds",
  "text_188": "I respect his unique ability to weave fairy tales and embody fantasy worlds overflowing with life and details. But I sometimes disagree with his pessimistic view towards human progress and technological development.",
  "text_136": "Follow Me",
  "text_137": "LinkedIn",
  "text_138": "Behance",
  "text_139": "X",
  "text_140": "Instagram",
  "text_141": "YouTube",
  "text_142": "Contact Information",
  "text_143": "Cairo, Arab Republic of Egypt",
  "text_144": "© 2026 Youssef Alhusiny. All rights reserved.",
  "text_145": "Space for Thought"
}

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "r", encoding="utf-8") as f:
    content = f.read()

# Insert into Arabic section
ar_str = ""
for k, v in missing_ar.items():
    safe_v = v.replace('"', '\\"')
    ar_str += f'    "{k}": "{safe_v}",\n'
content = content.replace('"text_213": "ابدأ المحادثة",', f'"text_213": "ابدأ المحادثة",\n{ar_str}')

# Insert into English section
en_str = ""
for k, v in missing_en.items():
    safe_v = v.replace('"', '\\"')
    en_str += f'    "{k}": "{safe_v}",\n'
content = content.replace('"text_213": "Start Conversation",', f'"text_213": "Start Conversation",\n{en_str}')

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated translations.js with all missing case studies and footer keys")
