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

    doc.fontSize(18)
       .text(
           "RESUMEN EJECUTIVO",
           {
               align: "center"
           }
       );

    doc.moveDown();

    doc.rect(50, 100, 500, 110)
       .stroke();

    doc.fontSize(12)
       .text(
           "Nivel de Riesgo: Según análisis del expediente",
           70,
           120
       );

    doc.text(
           "Nivel de Litigiosidad: Según análisis del expediente",
           70,
           145
       );

    doc.text(
           "Estado Procesal: Revisar conclusiones del informe",
           70,
           170
       );

    doc.moveDown(8);

    doc.fontSize(16)
       .text(
           "INFORME DETALLADO",
           {
               align: "center"
           }
       );

    doc.moveDown();

const informeLimpio = limpiarMarkdown(informe);

doc.fontSize(11)
   .text(informeLimpio, {
       align: "justify"
   });

    doc.moveDown(2);

    // RECOMENDACIÓN DESTACADA

    doc.rect(
        50,
        doc.y,
        500,
        90
    ).stroke();

    doc.fontSize(14)
       .text(
           "RECOMENDACIÓN",
           70,
           doc.y + 15
       );

    doc.fontSize(11)
       .text(
           "Se recomienda complementar este informe con una revisión legal especializada antes de participar en cualquier remate judicial.",
           70,
           doc.y + 15,
           {
               width: 430
           }
       );

    doc.moveDown(6);

    // AVISO LEGAL

    doc.fontSize(14)
       .text(
           "AVISO LEGAL",
           {
               underline: true
           }
       );

    doc.moveDown();

    doc.fontSize(10)
       .text(
           "Este informe ha sido generado mediante inteligencia artificial sobre la base de la información contenida en el expediente proporcionado. Constituye una herramienta de apoyo para la toma de decisiones y no reemplaza el criterio profesional de un abogado ni constituye asesoría legal personalizada."
       );

    doc.moveDown();

    doc.text(
           "Para una evaluación integral del expediente, la situación registral y posesoria del inmueble, se recomienda solicitar asesoría especializada."
       );

    doc.moveDown(2);

    doc.fontSize(11)
       .text(
           "WhatsApp: +51 963 337 017",
           {
               align: "center"
           }
       );

    doc.text(
           "www.everedinsonabogado.com",
           {
               align: "center"
           }
       );

    doc.end();

    return nombreArchivo;
}

module.exports = {
    generarPDF
};
