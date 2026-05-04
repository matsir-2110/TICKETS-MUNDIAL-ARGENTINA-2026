import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PaymentStrategy } from './PaymentStrategy';

export class MercadoPagoStrategy implements PaymentStrategy {
    async createPaymentIntent(ticketData: any): Promise<string> {
        const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! });
        const preference = new Preference(client);

        try {
            const result = await preference.create({
                body: { // <--- Todo empieza acá
                    items: [
                        {
                            id: ticketData.productoId || 'ticket-mundial-2026',
                            title: 'Ticket Mundial Argentina 2026',
                            quantity: Number(ticketData.cantidad) || 1,
                            unit_price: Number(ticketData.precio || ticketData.unit_price) || 50000
                        }
                    ],
                    back_urls: { // <--- Ahora está ADENTRO del body
                        success: "http://localhost:3000/pago-exitoso",
                        failure: "http://localhost:3000/pago-fallido",
                        pending: "http://localhost:3000/pago-pendiente"
                    },
                    auto_return: "approved",
                } // <--- Acá cierra el body
            });

            return result.init_point;
        } catch (error) {
            console.error("Error al crear la preferencia en Mercado Pago:", error);
            throw new Error("No se pudo procesar el pago del ticket");
        }
    }
}