/**
 * Stripe config service type declaration.
 *
 * @interface
 */
export interface StripeConfigService {
  apiKey: string,
  apiVersion: string,
  webhookKey: string,
}
