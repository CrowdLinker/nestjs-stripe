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
  | BaseStripe.PaymentMethod
  | BaseStripe.PaymentIntent
  | BaseStripe.SubscriptionSchedule;

/**
 * Stripe entity param type declaration.
 *
 * @type
 */
export type StripeEntityParam =
  | BaseStripe.Price
  | BaseStripe.Coupon
  | BaseStripe.Charge
  | BaseStripe.Product
  | BaseStripe.Invoice
  | BaseStripe.Customer
  | BaseStripe.Subscription
  | BaseStripe.PaymentMethod
  | BaseStripe.PaymentIntent
  | BaseStripe.SubscriptionSchedule;
