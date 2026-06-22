const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
function limpiarMarkdown(texto) {

    return texto

        .replace(/^---$/gm, "")

        .replace(/^#{1,6}\s*/gm, "")

        .replace(/\*\*/g, "")

        .replace(/\*/g, "")

        .replace(/\|---.*\|/g, "")

        .replace(/^\|/gm, "")

        .replace(/\|$/gm, "")

        .replace(/Ø=Üò/g, "")

        .trim();

}
function generarPDF(informe) {

    const nombreArchivo = uuidv4() + ".pdf";

    const rutaPDF = path.join(
        __dirname,
        "..",
        "pdf",
        nombreArchivo
    );

    const doc = new PDFDocument({
        margin: 50,
        size: "A4"
    });

    doc.pipe(fs.createWriteStream(rutaPDF));

    const fecha = new Date().toLocaleDateString("es-PE");

    // PORTADA

    doc.fontSize(28)
       .text(
           "INFORME DE ANÁLISIS DE EXPEDIENTE JUDICIAL",
           {
               align: "center"
           }
       );

    doc.moveDown(2);

    doc.fontSize(18)
       .text(
           "Ever Edinson Abogado",
           {
               align: "center"
           }
       );

    doc.moveDown();

    doc.fontSize(14)
       .text(
           "Especialista en Remates Judiciales",
           {
               align: "center"
           }
       );

    doc.moveDown(2);

    doc.fontSize(12)
       .text(
           `Fecha de emisión: ${fecha}`,
           {
               align: "center"
           }
       );

    doc.moveDown(6);

    doc.fontSize(11)
       .text(
           "Informe generado mediante Inteligencia Artificial para apoyar la evaluación de oportunidades de inversión en remates judiciales.",
           {
               align: "center"
           }
       );

    doc.addPage();

    // ENCABEZADO
    
   // RESUMEN EJECUTIVO PREMIUM

doc.fontSize(24)
   .text(
      "RESUMEN EJECUTIVO",
      {
         align: "center"
      }
   );

doc.moveDown(2);

doc.rect(50, 140, 500, 140)
   .stroke();

doc.fontSize(14)
   .text(
      "ÍNDICE DE ATRACTIVO",
      70,
      170
   );

doc.fontSize(20)
   .text(
      "78 / 100",
      350,
      165
   );

doc.fontSize(14)
   .text(
      "RIESGO",
      70,
      205
   );

doc.text(
      "MEDIO",
      350,
      205
   );

doc.text(
      "LITIGIOSIDAD",
      70,
      235
   );

doc.text(
      "MEDIA",
      350,
      235
   );

doc.text(
      "RECOMENDACIÓN",
      70,
      265
   );

doc.text(
      "CON PRECAUCIONES",
      250,
      265
   );

doc.moveDown(10);

    doc.fontSize(16)
       .text(
           "INFORME DETALLADO",
           {
               align: "center"
           }
       );

    doc.moveDown();

const informeLimpio = limpiarMarkdown(informe);

const lineas = informeLimpio.split("\n");

lineas.forEach(linea => {

    const texto = linea.trim();

    if (!texto) {
        doc.moveDown(0.5);
        return;
    }

    if (
        texto.includes("RESUMEN EJECUTIVO") ||
        texto.includes("CALIFICACIÓN GENERAL") ||
        texto.includes("ÍNDICE DE ATRACTIVO") ||
        texto.includes("ANÁLISIS PARA INVERSIONISTAS") ||
        texto.includes("RIESGOS IDENTIFICADOS") ||
        texto.includes("FORTALEZAS IDENTIFICADAS") ||
        texto.includes("RECOMENDACIÓN FINAL") ||
        texto.includes("AVISO LEGAL")
    ) {

        doc.moveDown();

        doc.rect(
            50,
            doc.y,
            500,
            25
        ).stroke();

        doc.fontSize(15)
           .text(
               texto,
               60,
               doc.y + 7
           );

        doc.moveDown(2);

    } else {

        doc.fontSize(11)
           .text(
               texto,
               {
                   align: "justify"
               }
           );

    }

});

    doc.moveDown(2);

    doc.moveDown(6);

    doc.end();

    return nombreArchivo;
}

module.exports = {
    generarPDF
};
