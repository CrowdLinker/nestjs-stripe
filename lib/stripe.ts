import BaseStripe from 'stripe';
import { Inject, Injectable } from '@nestjs/common';
import { STRIPE_OPTIONS } from './constants';
import { StripeOptions } from './interfaces';

/**
 * Class related to handling stripe tasks.
 *
 * @class
 */
@Injectable()
export class Stripe extends BaseStripe {
  /**
   * Create an instance of class.
   *
   * @constructor
   *
   * @param {StripeOptions} options
   *
   */
  constructor(@Inject(STRIPE_OPTIONS) options: StripeOptions) {
    super(options.apiKey, options.config);
  }
}
