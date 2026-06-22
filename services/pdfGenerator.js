const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function generarPDF(informe){

    const nombreArchivo = uuidv4() + ".pdf";

    const rutaPDF = path.join(
        __dirname,
        "..",
        "pdf",
        nombreArchivo
    );

    const doc = new PDFDocument({
        margin: 40
    });

    doc.pipe(fs.createWriteStream(rutaPDF));

    doc.fontSize(22)
       .text(
          "INFORME DE ANALISIS DE EXPEDIENTE JUDICIAL",
          { align:"center" }
       );

    doc.moveDown();

    doc.fontSize(11)
       .text(
          "Ever Edinson Abogado - Especialista en Remates Judiciales"
       );

    doc.moveDown();

    doc.fontSize(12)
       .text(informe);

    doc.end();

    return nombreArchivo;

}

module.exports = {
    generarPDF
};
