const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const logo = path.join(__dirname, "..", "assets", "logo-ever.png");

function limpiarMarkdown(texto) {
    return texto
        .replace(/^---$/gm, "")
        .replace(/^#{1,6}\s*/gm, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/\|---.*\|/g, "")
        .replace(/^\|/gm, "")
        .replace(/\|$/gm, "")
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
    margin: 60,
    size: "A4",
    bufferPages: true
});

    doc.pipe(fs.createWriteStream(rutaPDF));

    const fecha = new Date().toLocaleDateString("es-PE");

    const dibujarHeader = () => {

        doc.save();

        doc.rect(
            0,
            0,
            595.28,
            75
        ).fill("#7A001C");

        doc.rect(
            0,
            70,
            595.28,
            5
        ).fill("#C9A227");

        doc.restore();

        if (fs.existsSync(logo)) {

            doc.image(
                logo,
                40,
                10,
                {
                    width: 80
                }
            );

        }
    };

    const dibujarPie = () => {

        doc.save();

        doc.rect(
    0,
    760,
    595,
    30
        ).fill("#7A001C");

        doc.restore();

        doc.fillColor("white")
           .fontSize(9)
           .text(
               "www.everedinsonabogado.com",
               25,
               770
           );

        doc.text(
               "WhatsApp: +51 963 337 017",
               220,
               770
           );

        doc.fillColor("black");

    };

    // PORTADA

    dibujarHeader();
    dibujarPie();
doc.y = 100;
    doc.moveDown(3);

    doc.fontSize(26)
       .fillColor("#7A001C")
       .text(
           "INFORME DE ANÁLISIS",
           {
               align: "center"
           }
       );

    doc.moveDown();

    doc.fontSize(18)
       .fillColor("#333")
       .text(
           "DE EXPEDIENTE JUDICIAL",
           {
               align: "center"
           }
       );

    doc.moveDown(2);

    doc.fontSize(16)
       .fillColor("#7A001C")
       .text(
           "EVER EDINSON ABOGADO",
           {
               align: "center"
           }
       );

    doc.moveDown();

    doc.fontSize(12)
       .fillColor("#555")
       .text(
           "Especialista en Remates Judiciales",
           {
               align: "center"
           }
       );

    doc.moveDown(2);

    doc.rect(
        120,
        280,
        350,
        140
    )
    .stroke("#C9A227");

    doc.fontSize(14)
       .fillColor("#7A001C")
       .text(
           "INFORME PROFESIONAL PARA INVERSIONISTAS",
           140,
           320,
           {
               width: 310,
               align: "center"
           }
       );

    doc.fontSize(11)
       .fillColor("#555")
       .text(
           `Fecha de emisión: ${fecha}`,
           140,
           370,
           {
               width: 310,
               align: "center"
           }
       );

    // PÁGINA DEL INFORME

    doc.addPage();

    dibujarHeader();
    dibujarPie();

    doc.fontSize(18)
       .fillColor("#7A001C")
       .text(
           "INFORME DETALLADO",
           {
               align: "center"
           }
       );

    doc.moveDown(2);

    const lineas = limpiarMarkdown(informe).split("\n");

const titulos = [

    "RESUMEN EJECUTIVO",
    "CALIFICACIÓN GENERAL",
    "ÍNDICE DE ATRACTIVO PARA INVERSIONISTAS",
    "NIVEL DE RIESGO",
    "NIVEL DE LITIGIOSIDAD",
    "FICHA DEL EXPEDIENTE",
    "CRONOLOGÍA PROCESAL",
    "INCIDENTES PROCESALES DETECTADOS",
    "RIESGOS IDENTIFICADOS",
    "PROYECCIÓN DEL PROCEDIMIENTO",
    "ANÁLISIS PARA INVERSIONISTAS",
    "RECOMENDACIÓN FINAL",
    "AVISO LEGAL"

];

lineas.forEach(linea => {

    const texto = linea.trim();
// if (doc.y > 700) {

//     doc.addPage();

//     dibujarHeader();
//     dibujarPie();

//     doc.y = 100;

// }
    if (!texto) {

        doc.moveDown(0.5);
        return;

    }

    if (titulos.includes(texto.toUpperCase())) {

        doc.moveDown();

        const y = doc.y;

        doc.rect(
            50,
            y,
            495,
            24
        )
        .fill("#7A001C");

        doc.fillColor("white")
           .fontSize(12)
           .text(
               texto,
               60,
               y + 6
           );

        doc.moveDown(2);

        doc.fillColor("black");

        return;

    }

    doc.fontSize(11)
       .fillColor("#000")
       .text(
           texto,
           {
               align: "justify"
           }
       );

});

    doc.end();

    return nombreArchivo;

}

module.exports = {
    generarPDF
};
