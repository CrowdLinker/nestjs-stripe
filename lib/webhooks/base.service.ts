import get from 'lodash/get';
import { Stripe } from '../stripe';
import { default as BaseStripe } from 'stripe';
import { BadRequestException } from '@nestjs/common';
import { StripeConfigService } from '../interfaces/config.interface';

/**
 * Base service class dealing to extend stripe webhooks service class based operations.
 *
 * @class
 */
export abstract class BaseStripeWebhooksService {
  /**
   * Create an instance of class.
   *
   * @constructor
   *
   * @param {Stripe} stripe
   * @param {StripeConfigService} stripeConfigService
   */
  constructor(
    protected readonly stripe: Stripe,
    protected readonly stripeConfigService: StripeConfigService,
  ) {}

  /**
   * Verifies webhook request signature.
   *
   * @param {Buffer} requestBody
   * @param {string} webhookSignature
   *
   * @throws {BadRequestException}
   */
  verifySignature(requestBody: Buffer, webhookSignature: string) {
    try {
      return this.stripe.webhooks.constructEvent(
        requestBody,
        webhookSignature,
        this.stripeConfigService.webhookKey,
      );
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }
  }

  /**
   * Get invoice id from invoice object.
   *
   * @param {BaseStripe.Invoice} invoice
   *
   * @returns {string}
   */
  protected getIdOfInvoice(invoice: BaseStripe.Invoice): string {
    return get(invoice, 'id', null);
  }

  /**
   * Get Stripe subscription id from invoice object.
   *
   * @param {BaseStripe.Invoice} invoice
   *
   * @returns {string}
   */
  protected getSubscriptionIdFromInvoice(invoice: BaseStripe.Invoice): string {
    return get(invoice, 'subscription', null);
  }

  /**
   * Get Stripe customer id from invoice object.
   *
   * @param {BaseStripe.Invoice} invoice
   *
   * @returns {string}
   */
  protected getCustomerIdFromInvoice(invoice: BaseStripe.Invoice): string {
    return get(invoice, 'customer', null);
  }

  /**
   * Get Stripe payment intent id from invoice object.
   *
   * @param {BaseStripe.Invoice} invoice
   *
   * @returns {string}
   */
  protected getPaymentIntentIdFromInvoice(invoice: BaseStripe.Invoice): string {
    return get(invoice, 'payment_intent', null);
  }

  /**
   * Get subscription id from subscription object.
   *
   * @param {BaseStripe.Subscription} subscription
   *
   * @returns {string}
   */
  protected getIdOfSubscription(subscription: BaseStripe.Subscription): string {
    return get(subscription, 'id', null);
  }
}
