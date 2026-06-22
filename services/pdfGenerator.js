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

});
    doc.pipe(fs.createWriteStream(rutaPDF));
dibujarHeader();
dibujarPie();
    const fecha = new Date().toLocaleDateString("es-PE");
function dibujarHeader() {

    doc.save();

    doc.rect(0, 0, 595.28, 60)
        .fill("#7A001C");

    doc.strokeColor("#C9A227")
        .lineWidth(2)
        .moveTo(0, 60)
        .lineTo(595.28, 60)
        .stroke();

    doc.restore();

    if (fs.existsSync(logo)) {
        doc.image(logo, 40, 10, { width: 80 });
    }
}

function dibujarPie() {

    doc.strokeColor("#C9A227")
        .lineWidth(1)
        .moveTo(0, 820)
        .lineTo(595.28, 820)
        .stroke();

    doc.fontSize(8)
        .fillColor("#7A001C")
        .text(
            "Ever Edinson Abogado - Remates Judiciales",
            50,
            830,
            { align: "center", width: 495 }
        );
}
    // =========================
    // ENCABEZADO
    // =========================
    function encabezado() {

        doc.save();

        doc.rect(0, 0, 595.28, 60)
            .fill("#7A001C");

        doc.strokeColor("#C9A227")
            .lineWidth(2)
            .moveTo(0, 60)
            .lineTo(595.28, 60)
            .stroke();

        doc.restore();

        if (fs.existsSync(logo)) {
            doc.image(logo, 40, 10, { width: 80 });
        }
    }

    function pie() {

        doc.strokeColor("#C9A227")
            .lineWidth(1)
            .moveTo(0, 820)
            .lineTo(595.28, 820)
            .stroke();

        doc.fontSize(8)
            .fillColor("#7A001C")
            .text(
                "Ever Edinson Abogado - Remates Judiciales",
                50,
                830,
                { align: "center", width: 495 }
            );
    }


    // =========================
    // PRIMERA PÁGINA
    // =========================
    encabezado();
    pie();

    doc.moveDown(8);

    doc.fontSize(26)
        .fillColor("#7A001C")
        .text("INFORME DE ANÁLISIS", { align: "center" });

    doc.moveDown(0.5);

    doc.fontSize(18)
        .fillColor("#333")
        .text("DE EXPEDIENTE JUDICIAL", { align: "center" });

    doc.moveDown(2);

    doc.fontSize(16)
        .fillColor("#7A001C")
        .text("EVER EDINSON ABOGADO", { align: "center" });

    doc.moveDown(1);

    doc.fontSize(12)
        .fillColor("#555")
        .text("Especialista en Remates Judiciales", { align: "center" });

    doc.moveDown(2);

    doc.fontSize(11)
        .fillColor("#777")
        .text(`Fecha de emisión: ${fecha}`, { align: "center" });

    doc.moveDown(5);

    doc.fontSize(10)
        .fillColor("#666")
        .text(
            "Documento elaborado para análisis de inversión en procesos de remates judiciales.",
            { align: "center" }
        );

    // =========================
    // NUEVA PÁGINA
    // =========================
    doc.addPage();
dibujarHeader();
dibujarPie();

    doc.fontSize(16)
        .fillColor("#000")
        .text("INFORME DETALLADO", { align: "center" });

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

            doc.rect(50, doc.y, 500, 25).stroke();

            doc.fontSize(15)
                .fillColor("#000")
                .text(texto, 60, doc.y + 7);

            doc.moveDown(2);

        } else {

            doc.fontSize(11)
                .fillColor("#000")
                .text(texto, { align: "justify" });

        }
    });

    doc.end();

    return nombreArchivo;
}

module.exports = {
    generarPDF
};
