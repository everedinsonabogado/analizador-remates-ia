const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const multer = require("multer");
const { extraerTextoPDF } = require("./services/pdf");

const upload = multer({
  dest: "uploads/"
});
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

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

app.post("/analizar", async (req, res) => {

  try {

    const texto = req.body.texto;

    if (!texto) {
      return res.status(400).json({
        error: "No se recibió texto para analizar."
      });
    }

    const prompt = `
Eres el abogado Ever Edinson, especialista en remates judiciales en Perú.

Analiza el expediente y elabora un informe dirigido a un inversionista.

No inventes información.

Extrae todas las fechas.

Calcula el tiempo promedio entre resoluciones.

Identifica incidentes procesales.

Determina el nivel de litigiosidad.

Estima el plazo para Auto de Adjudicación.

Estima el plazo para Partes Judiciales.

Finaliza con una recomendación sobre la conveniencia de participar en el remate.

Utiliza lenguaje sencillo.
`;

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
