```javascript
const fs = require("fs");
const pdf = require("pdf-parse");

async function extraerTextoPDF(rutaArchivo){

    const buffer = fs.readFileSync(rutaArchivo);

    const data = await pdf(buffer);

    return data.text;

}

module.exports = {
    extraerTextoPDF
};
```
