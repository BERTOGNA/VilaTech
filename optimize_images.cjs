const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, 'app/public/images');
const filesToProcess = [
  { in: 'educacao/educacao3.jpg', out: 'educacao/educacao3.webp' },
  { in: 'educacao/educacao4.jpg', out: 'educacao/educacao4.webp' },
  { in: 'educacao/educacao2.webp', out: 'educacao/educacao2.webp' },
  { in: 'arte/IMG_5144.webp', out: 'arte/IMG_5144.webp' },
  { in: 'arte/IMG_5159.webp', out: 'arte/IMG_5159.webp' }
];

async function processImages() {
  for (const file of filesToProcess) {
    const inPath = path.join(publicDir, file.in);
    const outPath = path.join(publicDir, file.out);
    const tempOutPath = outPath + '.tmp.webp';

    if (fs.existsSync(inPath)) {
      try {
        await sharp(inPath)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(tempOutPath);
        
        fs.renameSync(tempOutPath, outPath);
        console.log(`Processed: ${file.in} -> ${file.out}`);
      } catch (err) {
        console.error(`Error processing ${file.in}:`, err);
      }
    } else {
      console.warn(`File not found: ${inPath}`);
    }
  }
}

processImages();
