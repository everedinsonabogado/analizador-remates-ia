const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analizarExpediente(textoExpediente) {

  const promptPath = path.join(__dirname, "..", "prompts", "remates.txt");

  const prompt = fs.readFileSync(promptPath, "utf8");

  const respuesta = await client.responses.create({

    model: "gpt-5.5",

    input: `${prompt}

========================

EXPEDIENTE JUDICIAL

${textoExpediente}

========================
`

  });

  return respuesta.output_text;

}

module.exports = {
  analizarExpediente
};
