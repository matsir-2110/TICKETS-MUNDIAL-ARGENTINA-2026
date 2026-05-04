import { PaymentStrategy } from './PaymentStrategy';

export class PaymentProcessor {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    async processTicketPayment(ticketData: any): Promise<string> {
        return await this.strategy.createPaymentIntent(ticketData);
    }
}