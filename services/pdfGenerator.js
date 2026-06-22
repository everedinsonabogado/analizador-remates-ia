const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const logo = path.join(
    __dirname,
    "..",
    "assets",
    "logo-ever.png"
);
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
doc.image(
    logo,
    170,
    40,
    {
        width: 250
    }
);

doc.moveDown(8);
  doc.fontSize(24)
   .text(
       "INFORME DE ANÁLISIS",
       {
           align: "center"
       }
   );

doc.fontSize(20)
   .text(
       "DE EXPEDIENTE JUDICIAL",
       {
           align: "center"
       }
   );
           {
               align: "center"
           }
       );

    doc.moveDown(2);

    doc.fontSize(18)
   .fillColor("#7A001C")
   .text(
       "EVER EDINSON ABOGADO",
       {
           align: "center"
       }
   );

doc.fillColor("black");
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
