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

    const rutaPDF = path.join(__dirname, "..", "pdf", nombreArchivo);

    const doc = new PDFDocument({
        margin: 50,
        size: "A4"
    });

    doc.pipe(fs.createWriteStream(rutaPDF));

    const fecha = new Date().toLocaleDateString("es-PE");

    const dibujarHeader = () => {

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
    };

    const dibujarPie = () => {

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
    };

    dibujarHeader();
    dibujarPie();

    doc.fontSize(26)
        .fillColor("#7A001C")
        .text("INFORME DE ANÁLISIS", { align: "center" });

    doc.moveDown(1);

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

    doc.addPage();
    dibujarHeader();
    dibujarPie();

    doc.fontSize(16)
        .fillColor("#000")
        .text("INFORME DETALLADO", { align: "center" });

    doc.moveDown();

    const lineas = limpiarMarkdown(informe).split("\n");

    lineas.forEach(linea => {

        const texto = linea.trim();

        if (!texto) {
            doc.moveDown(0.5);
            return;
        }

        doc.fontSize(11)
            .fillColor("#000")
            .text(texto, { align: "justify" });
    });

    doc.end();

    return nombreArchivo;
}

module.exports = { generarPDF };
