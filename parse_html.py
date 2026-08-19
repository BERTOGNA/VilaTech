import re
import json

file_path = r"c:\Users\luan2\VilaTech\Arquivos\exemplo_page\Instituto Vila Tech _ Educação, Tecnologia e Cultura.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the shadow root HTML
shadow_root_match = re.search(r'<template shadowrootmode="closed">(.*?)</template>', content, re.DOTALL)
if shadow_root_match:
    html = shadow_root_match.group(1)
else:
    html = content

def clean_html(html_str):
    # Just find all text tags
    return re.sub(r'<[^>]+>', ' ', html_str)

# Find sections by looking at h1, h2, h3 and surrounding text
headings = re.finditer(r'<h[1-6][^>]*>(.*?)</h[1-6]>', html, re.IGNORECASE | re.DOTALL)

for h in headings:
    text = clean_html(h.group(1)).strip()
    if text:
        print(f"Heading: {text}")

# Let's also extract sections
sections = re.finditer(r'<section[^>]*>(.*?)</section>', html, re.IGNORECASE | re.DOTALL)
for i, s in enumerate(sections):
    print(f"\n--- Section {i} ---")
    text = clean_html(s.group(1))
    text = re.sub(r'\s+', ' ', text).strip()
    print(text[:500])
