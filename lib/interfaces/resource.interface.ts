import BaseStripe from 'stripe';

/**
 * Stripe entity resource type declaration.
 *
 * @type
 */
export type StripeEntityResource =
  | BaseStripe.PricesResource
  | BaseStripe.CouponsResource
  | BaseStripe.ChargesResource
  | BaseStripe.InvoicesResource
  | BaseStripe.ProductsResource
  | BaseStripe.CustomersResource
  | BaseStripe.SubscriptionsResource
  | BaseStripe.PaymentMethodsResource
  | BaseStripe.PromotionCodesResource
  | BaseStripe.PaymentIntentsResource
  | BaseStripe.SubscriptionSchedulesResource;
