const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

async function crearPreferencia() {

    const preference = new Preference(client);

    const respuesta = await preference.create({

        body: {

            items: [

                {
                    title: "Análisis IA de Expediente Judicial",
                    quantity: 1,
                    currency_id: "PEN",
                    unit_price: 19
                }

            ]

        }

    });

    return respuesta.init_point;

}

module.exports = {
    crearPreferencia
};
