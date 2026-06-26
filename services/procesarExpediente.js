const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const { extraerTextoPDF } = require("./pdf");
const { generarPDF } = require("./pdfGenerator");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function procesarExpediente(rutaPDF) {

    const texto = await extraerTextoPDF(rutaPDF);

    const prompt = fs.readFileSync(
        path.join(__dirname, "..", "prompts", "remates.txt"),
        "utf8"
    );

    const respuesta = await client.responses.create({

        model: "gpt-5.5",

        input: `${prompt}

========================

EXPEDIENTE JUDICIAL

${texto}

========================`

    });

    const informe = respuesta.output_text;

    const nombreArchivo = generarPDF(informe);

    return {
        informe,
        nombreArchivo
    };

}

module.exports = {
    procesarExpediente
};
