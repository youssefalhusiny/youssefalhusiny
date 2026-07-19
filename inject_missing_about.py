import json
import re

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\missing_about.json", "r", encoding="utf-8") as f:
    missing_ar = json.load(f)

# Hardcoded translations for the missing about keys
missing_en = {
  "text_10": "Location",
  "text_11": "Cairo, Egypt",
  "text_12": "Experience",
  "text_13": "Years",
  "text_14": "Projects",
  "text_15": "Clients",
  "text_16": "Specialization & Impact",
  "text_17": "Areas of Expertise",
  "text_18": "Writing",
  "text_19": "Based on deep marketing foundations to produce a product that achieves its goals. We draft studied texts that speak the audience's language and touch their needs, ensuring the message arrives in the most eloquent and impactful form.",
  "text_20": "Motion Graphics",
  "text_21": "Animating elements and designing vibrant 3D environments that serve the artistic vision. We blend art with technology to create dazzling visual experiences that linger in memory and highlight the finest details.",
  "text_22": "Designing vibrant 3D environments, building worlds, shapes, and scenes that combine technical precision with artistic depth to create unforgettable visual experiences.",
  "text_23": "Sound Design",
  "text_24": "Designing and engineering sound to create an immersive auditory experience that enhances emotions and completes the scene. We pay attention to every sound effect and music arrangement to make the work come alive.",
  "text_25": "Evolution & Impact",
  "text_26": "Milestones of Professional History",
  "text_27": "2024 — Present",
  "text_28": "Creative Partnership",
  "text_29": "AXIS Creative Agency",
  "text_30": "Leading digital transformation and developing luxurious visual systems for elite institutions, blending philosophy with technology to create digital identities whose impact defies oblivion.",
  "text_31": "2022 — Present",
  "text_32": "Founding & Supervision",
  "text_33": "'Noqta' Art Agency",
  "text_34": "Establishing an integrated creative platform to redefine sensory art and deconstruct symbols, collaborating with writers and thinkers to produce book covers and authentic visual identities.",
  "text_35": "Spatial Design",
  "text_36": "'Takween' Publishing House",
  "text_37": "Re-engineering the physical and spatial environment of the publishing house, transforming it into a quiet interactive environment that grants books their freedom and makes the architectural space a silent emotional experience.",
  "text_38": "2018 — Present",
  "text_39": "Freelance Consulting",
  "text_40": "Independent Designer & Consultant",
  "text_41": "Providing artistic and engineering consultations for decision-makers, simplifying grand ideas to express depth, and making visual identities and spaces timeless stories.",
  "text_42": "Pillars of Free Thinking",
  "text_43": "Figures I Respect, Even if We Differ.",
  "text_44": "Al-Ghazali",
  "text_46": "I respect his absolute intellectual courage in doubting and dismantling his personal convictions, and his retreat to search for the essence of existential meaning from scratch. But I didn't follow his complete avoidance of material life; I believe in the necessity of staying in the heart of the field.",
  "text_47": "Friedrich Nietzsche",
  "text_49": "I respect his veneration of individual uniqueness, his rejection of the 'herd mentality', and the independent human's ability to forge their own values. But I did not follow him in his harsh nihilism; rather, I choose to harness that free will in building organized aesthetic structures.",
  "text_50": "René Descartes",
  "text_51": "Rationalism and Methodology",
  "text_52": "I respect his insistence on methodical doubt as a tool to reach certainty, his veneration of the authority of reason, and breaking down complex dilemmas into solvable parts. But I didn't follow his sharp separation between body and mind; I see in humans an organic integration that completely melts this barrier.",
  "text_53": "Albert Einstein",
  "text_55": "I respect his infinite childlike curiosity and his brilliant realization that time and space are not absolute. But I didn't follow his quest for a unified cosmic equation; the beauty of existence lies in emotional contradictions and unexpected small details that defy reduction.",
  "text_56": "Ray Dalio",
  "text_58": "I respect his extreme rationality and ability to model life and work into a consistent system built on clear principles. But I didn't follow his attempt to mechanize feelings; pure systems are devoid of soul without art, creative spontaneity, and the beauty of silent spaces.",
  "text_59": "Dr. Mustafa Mahmoud",
  "text_61": "He has the first and greatest credit for my entry into the paths of thinking. Despite disagreeing with him later in some scientific analyses, I still hold full respect for him as my first inspiration who lit my path towards free contemplation.",
  "text_62": "Ibn Taymiyyah",
  "text_63": "Firmness and Principle",
  "text_64": "I respect his amazing intellectual firmness, uncompromising stance on what he believes is true, and his ability to write and engage intellectually even from within his prison walls. But I didn't follow his direct jurisprudential engagement, moving towards rebuilding aesthetic meanings.",
  "text_70": "I respect his high language and boldness in some situations that require a free voice. However, I differ with him on some doctrinal conceptions, believing that linguistic beauty is incomplete without soundness of methodology.",
  "text_73": "I respect his brilliant strategic astuteness, and his early realization that the greatest victories are those won without fighting. But I didn't follow him in turning interaction into a battlefield; rather, I employ this planning to penetrate the market smoothly.",
  "text_76": "I respect his unparalleled tactical genius, his courage in delving into the unknown, and his ability to alter the course of any challenge. I draw inspiration from this audacity in penetrating markets.",
  "text_79": "I respect his boundless ambition and legendary ability to lead armies. But I didn't follow his expansionist imperial path; rather, I choose to transform this passion into creative conquests that enrich human civilization.",
  "text_81": "Presence and Expressive Intensity",
  "text_82": "I respect his terrifying expressive intensity, his ability to fill the space with his overwhelming presence without affection, and his absolute honesty in embodying his characters. I differ with him in the noisy spaces dictated by cinema; as I lean towards the quietness that leaves room for the receiver to discover meaning.",
  "text_84": "Political Realism",
  "text_85": "I respect his extreme realism in reading human nature without embellishment. I disagree with his principle 'the end justifies the means'; as I believe the means is an integral part of the end's honor.",
  "text_88": "I respect his founding of sociology and his deep understanding of the nature of urbanization and the rise and fall of civilizations. I rely on his methodology in reading 'Urbanization' to attempt building works that transcend time.",
  "text_91": "I respect his brilliant practical vision and exceptional ability to link philosophy with work. But I did not follow his extreme perfectionism and managerial harshness that might eliminate the flexible human dimension in order to achieve the vision.",
  "text_94": "I respect his amazing ability for creative imagination and seeing the future decades ahead. But I didn't follow his dreamy idealism; as I believe in the necessity of grounding the inspiring idea into reality and transforming it into a sustainable entity.",
  "text_97": "I respect his unique ability to weave fairy tales and embody fantasy worlds overflowing with life. But I sometimes disagree with his pessimistic view towards human progress and technological development.",
  "text_98": "Xi Jinping",
  "text_99": "Strategic Power and Balancing Hegemony",
  "text_100": "I respect his brilliant ability and sharp strategic intelligence in leading his country to confront Western powers. But I fundamentally disagree with his totalitarian domestic policies and systematic persecution against minorities.",
  "text_101": "Khabib Nurmagomedov",
  "text_102": "Strict Discipline and Identity",
  "text_103": "I respect his iron discipline, his absolute dominance in his field, and his deep pride in his faith and identity before millions without compromise. I only disagree with the harshness of the arena he chose.",
  "text_106": "I respect his absolute justice and his genius in establishing ministries and building state structures from scratch. I draw inspiration from his systematic firmness and commitment to absolute truth.",
  "text_107": "Professionalism and Precision",
  "text_108": "Work Methodology",
  "text_109": "Research and Strategy",
  "text_110": "We start by diving into the details of your project; we understand the market, analyze competitors, and set precise goals to build a clear roadmap that ensures the success of the work.",
  "text_111": "Creative Direction",
  "text_112": "We translate strategy into an integrated artistic vision. We invent the visual style, choose the appropriate tone, and add the creative touches that give the project its unique identity.",
  "text_113": "Production and Execution",
  "text_114": "We turn abstract ideas into tangible reality using the latest technologies. From 3D animation to precise sound engineering, we ensure every detail is executed to the highest industry standards.",
  "text_115": "Delivery and Development",
  "text_116": "Our work doesn't stop at delivery; we review every shot, refine the final details, and ensure the product matches the original vision and achieves the desired impact in the best possible form.",
  "text_117": "Professional and Intellectual Alignment",
  "text_118": "With Whom",
  "text_119": "I believe the best works are not born merely from contracts, but from a convergence of visions and a shared passion to reach the essence.",
  "text_120": "The Detail Obsessed",
  "text_121": "Those looking for meticulous work crafted with love and care, who do not settle for quick solutions or ready-made templates. Those who realize that great beauty lies in the details that make the core difference.",
  "text_122": "A Partner, Not Just a Client",
  "text_123": "You are not looking for a blind executor of commands, but an expert who shares the vision, proposes ideas, occasionally disagrees to reach the best, and contributes to developing your project.",
  "text_124": "Believer in the Power of Narrative",
  "text_125": "Those who realize that behind every product or service is a real story worth telling, and seek someone who can embody this story visually or textually to inspire the audience.",
  "text_126": "Seeker of Impact, Not the Moment",
  "text_127": "Those who prefer building long-term professional relationships based on mutual trust and complete transparency, rather than fleeting projects; ensuring continuous development and sustainable mutual success.",
  "text_128": "Visual Selections",
  "text_130": "Your story doesn't have to be perfect or artificial to be beautiful; it must be honest and felt. I focus on documenting spontaneous moments as they happen, with a cinematic touch.",
  "text_131": "Every project I work on is a collection of compositions, light, and emotions woven together in an integrated visual narrative. I always strive to see beyond the direct scene.",
  "text_132": ""
}

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "r", encoding="utf-8") as f:
    content = f.read()

# Insert into Arabic section
ar_str = ""
for k, v in missing_ar.items():
    if v.strip() == "": continue
    safe_v = v.replace('"', '\\"').replace('\n', '\\n')
    ar_str += f'    "{k}": "{safe_v}",\n'
content = content.replace('"text_213": "ابدأ المحادثة",', f'"text_213": "ابدأ المحادثة",\n{ar_str}')

# Insert into English section
en_str = ""
for k, v in missing_en.items():
    if v.strip() == "": continue
    safe_v = v.replace('"', '\\"').replace('\n', '\\n')
    en_str += f'    "{k}": "{safe_v}",\n'
content = content.replace('"text_213": "Start Conversation",', f'"text_213": "Start Conversation",\n{en_str}')

with open(r"c:\Users\Antica\Desktop\Youssef Alhusiny\Web\translations.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated translations.js with all missing about keys")
