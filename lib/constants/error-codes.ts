/**
 * Stripe request error codes.
 *
 * Source: https://stripe.com/docs/error-codes
 *
 * @constant
 */
export const ERROR_CODES = {
  CARD_DECLINED: 'card_declined',
  CARD_EXPIRED: 'expired_card',
  CARD_INVALID_NUMBER: 'invalid_number',
  CARD_INVALID_EXPIRY_MONTH: 'invalid_expiry_month',
  CARD_INVALID_EXPIRY_YEAR: 'invalid_expiry_year',
  CARD_INVALID_CVC: 'invalid_cvc',
  RESOURCE_MISSING: 'resource_missing',
};
