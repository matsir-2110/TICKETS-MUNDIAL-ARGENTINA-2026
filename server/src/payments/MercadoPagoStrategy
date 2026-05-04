import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PaymentStrategy } from './PaymentStrategy';

export class MercadoPagoStrategy implements PaymentStrategy {
    async createPaymentIntent(ticketData: any): Promise<string> {
        const client = new MercadoPagoConfig({ accessToken: 'APP_USR-a00b687a-d2b2-4a90-bb1f-08b96ff80f3c' });
        const preference = new Preference(client);

        try {
            const result = await preference.create({
                body: {
                    items: [
                        {
                            id: ticketData.productoId || 'ticket-mundial-2026',
                            title: 'Ticket Mundial Argentina 2026',
                            quantity: Number(ticketData.cantidad) || 1,
                            unit_price: Number(ticketData.precio) || 50000
                        }
                    ],
                    back_urls: {
                        success: "http://localhost:3000/pago-exitoso",
                        failure: "http://localhost:3000/pago-fallido",
                        pending: "http://localhost:3000/pago-pendiente"
                    },
                    auto_return: "approved",
                }
            });

            // Retornamos la URL donde el usuario tiene que ir a pagar
            return result.init_point!;
        } catch (error) {
            console.error("Error al crear la preferencia en Mercado Pago:", error);
            throw new Error("No se pudo procesar el pago del ticket");
        }
    }
}