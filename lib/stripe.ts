import BaseStripe from 'stripe';
import { StripeModuleOptions } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { STRIPE_MODULE_OPTIONS } from './stripe-core.module';

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
   * @param {StripeModuleOptions} options
   *
   */
  constructor(@Inject(STRIPE_MODULE_OPTIONS) options: StripeModuleOptions) {
    super(options.apiKey, options.config);
  }
}
