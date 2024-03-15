import BaseStripe from 'stripe';
import { ModuleMetadata, Type } from '@nestjs/common';

/**
 * Stripe options type declaration.
 *
 * @interface
 */
export interface StripeModuleOptions {
  apiKey: string;
  config: BaseStripe.StripeConfig;
}

/**
 * Stripe config factory type declaration.
 *
 * @interface
 */
export interface StripeModuleOptionsFactory {
  createStripeModuleOptions(): StripeModuleOptions | Promise<StripeModuleOptions>;
}

/**
 * Stripe async config type declaration.
 *
 * @interface
 */
export interface StripeAsyncModuleOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  inject?: any[];
  useClass?: Type<StripeModuleOptionsFactory>;
  useExisting?: Type<StripeModuleOptionsFactory>;
  useFactory?: (...args: any[]) => StripeModuleOptions | Promise<StripeModuleOptions>;
}
