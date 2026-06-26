const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

async function crearPreferencia(expedienteId) {

    const preference = new Preference(client);

    const respuesta = await preference.create({

        body: {

            external_reference: expedienteId,

            back_urls: {

                success: "https://www.everedinsonabogado.com/2026/06/analiza-tu-expediente-judicial-antes-de.html?pagado=1",

                failure: "https://www.everedinsonabogado.com/2026/06/analiza-tu-expediente-judicial-antes-de.html?error=1",

                pending: "https://www.everedinsonabogado.com/2026/06/analiza-tu-expediente-judicial-antes-de.html?pendiente=1"

            },

            auto_return: "approved",

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
