const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Arquivos', 'exemplo_page', 'Instituto Vila Tech _ Educação, Tecnologia e Cultura.html');
const content = fs.readFileSync(filePath, 'utf-8');

// Extract body/shadow root content
const html = content;

// Use regex to find headings and text
const headingRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi;
let match;
while ((match = headingRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text) console.log('Heading:', text);
}

// Find sections
const sectionRegex = /<section[^>]*>(.*?)<\/section>/gi;
let sectionCount = 0;
while ((match = sectionRegex.exec(html)) !== null) {
    console.log(`\n--- Section ${sectionCount++} ---`);
    const text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(text.substring(0, 800));
}
