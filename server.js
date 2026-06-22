const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { extraerTextoPDF } = require("./services/pdf");
const { generarPDF } = require("./services/pdfGenerator");
const upload = multer({
  dest: "uploads/"
});
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/pdf", express.static(path.join(__dirname, "pdf")));
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    estado: "ok",
    mensaje: "Backend Analizador IA funcionando correctamente",
    autor: "Ever Edinson Abogado"
  });
});
app.post("/subir", upload.single("pdf"), async (req, res) => {

  try {

const texto = await extraerTextoPDF(req.file.path);

const prompt = fs.readFileSync(
  path.join(__dirname, "prompts", "remates.txt"),
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
res.json({

    informe: informe,

    pdf:
      "https://analizador-remates-ia-1.onrender.com/pdf/" +
      nombreArchivo

});

  } catch (e) {

    res.status(500).json({
      error: e.message
    });

  }

});
app.post("/analizar", async (req, res) => {

  try {

    const texto = req.body.texto;

    if (!texto) {
      return res.status(400).json({
        error: "No se recibió texto para analizar."
      });
    }

    const prompt = fs.readFileSync(
  path.join(__dirname, "prompts", "remates.txt"),
  "utf8"
);

    const respuesta = await client.responses.create({
      model: "gpt-5.5",
      input: `${prompt}\n\nEXPEDIENTE:\n${texto}`
    });

    res.json({
      informe: respuesta.output_text
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
