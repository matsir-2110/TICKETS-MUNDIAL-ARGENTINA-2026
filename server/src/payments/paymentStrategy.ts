export interface PaymentStrategy {
    createPaymentIntent(ticketData: any): Promise<string>;
}