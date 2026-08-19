const fs = require('fs');

const content = fs.readFileSync('Arquivos/exemplo_page/Instituto Vila Tech _ Educação, Tecnologia e Cultura_files/index-PXBfgNu3.js.download', 'utf8');

function extractAround(term) {
    const regex = new RegExp(`(.{0,1000})${term}(.{0,1000})`, 'gi');
    let match;
    while ((match = regex.exec(content)) !== null) {
        console.log(`\n\n--- MATCH FOR ${term} ---`);
        console.log(match[0]);
        break; // just first match
    }
}

extractAround('O QUE NOS MOVE');
extractAround('frentes');
extractAround('hero');
extractAround('missão');
extractAround('visão');
extractAround('valores');
