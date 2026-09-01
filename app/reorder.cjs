const fs = require('fs');
const path = 'c:/Users/luan2/VilaTech/app/src/pages/InstitutePage.tsx';
let content = fs.readFileSync(path, 'utf8');

const s1 = '      {/* Comunidade */}\n      <section id="comunidade"';
const s2 = '      {/* Bioeconomia (Sustentabilidade) */}\n      <section id="bioeconomia"';
const s3 = '      {/* Educação em Tecnologia */}\n      <section id="educacao"';
const s4 = '      {/* Arte e Cultura */}\n      <section id="cultura"';
const s5 = '      {/* Liderança e Conselho */}\n      <section id="conselho"';

const i1 = content.indexOf(s1);
const i2 = content.indexOf(s2);
const i3 = content.indexOf(s3);
const i4 = content.indexOf(s4);
const i5 = content.indexOf(s5);

if (i1 !== -1 && i2 !== -1 && i3 !== -1 && i4 !== -1 && i5 !== -1) {
  const before = content.slice(0, i1);
  const comunidade = content.slice(i1, i2);
  const bio = content.slice(i2, i3);
  const educacao = content.slice(i3, i4);
  const cultura = content.slice(i4, i5);
  const after = content.slice(i5);
  
  const newContent = before + educacao + bio + cultura + comunidade + after;
  fs.writeFileSync(path, newContent);
  console.log('Reordered correctly');
} else {
  console.log('Indexes not found:', i1, i2, i3, i4, i5);
}
