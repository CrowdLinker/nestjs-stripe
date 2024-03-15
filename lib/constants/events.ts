/**
 * Constants declaring stripe events.
 *
 * @constant
 */
export const STRIPE_EVENTS = {
  CUSTOMER: {
    CREATED: 'customer.created',
    UPDATED: 'customer.updated',
    DELETED: 'customer.deleted',
    DISCOUNT: {
      CREATED: 'customer.discount.created',
      UPDATED: 'customer.discount.updated',
      DELETED: 'customer.discount.deleted',
    },
    SOURCE: {
      CREATED: 'customer.source.created',
      UPDATED: 'customer.source.updated',
      DELETED: 'customer.source.deleted',
    },
    SUBSCRIPTION: {
      CREATED: 'customer.subscription.created',
      UPDATED: 'customer.subscription.updated',
      DELETED: 'customer.subscription.deleted',
    },
  },
  INVOICE: {
    CREATED: 'invoice.created',
    UPDATED: 'invoice.updated',
    DELETED: 'invoice.deleted',
    FINALIZED: 'invoice.finalized',
    FINALIZATION_FAILED: 'invoice.finalization_failed',
    MARKED_UNCOLLECTIBLE: 'invoice.marked_uncollectible',
    PAID: 'invoice.paid',
    PAYMENT_FAILED: 'invoice.payment_failed',
    PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
    PAYMENT_ACTION_REQUIRED: 'invoice.payment_action_required',
    SENT: 'invoice.sent',
    UPCOMING: 'invoice.upcoming',
    VOIDED: 'invoice.voided',
  },
};
