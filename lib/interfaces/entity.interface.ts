import BaseStripe from 'stripe';

/**
 * Stripe entity type declaration.
 *
 * @type
 */
export type StripeEntity =
  | BaseStripe.Price
  | BaseStripe.Coupon
  | BaseStripe.Charge
  | BaseStripe.Product
  | BaseStripe.Invoice
  | BaseStripe.Customer
  | BaseStripe.Subscription
  | BaseStripe.PromotionCode
  | BaseStripe.PaymentMethod
  | BaseStripe.PaymentIntent
  | BaseStripe.SubscriptionSchedule;
