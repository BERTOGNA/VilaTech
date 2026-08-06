const fs = require('fs');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser(this, 1); // 1 = text only

pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));
pdfParser.on('pdfParser_dataReady', pdfData => {
    console.log(pdfParser.getRawTextContent());
});

pdfParser.loadPDF('docs/pagespeed/Relatorio_Tecnico_Performance_Vila_Tech_Hub.docx (1).pdf');
