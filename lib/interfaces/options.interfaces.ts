import BaseStripe from 'stripe';
import { ModuleMetadata, Type } from '@nestjs/common';

/**
 * Stripe options type declaration.
 *
 * @interface
 */
export interface StripeOptions {
    apiKey: string;
    config: BaseStripe.StripeConfig;
}

/**
 * Stripe config factory type declaration.
 *
 * @interface
 */
export interface StripeOptionsFactory {
    createStripeOptions(): StripeOptions | Promise<StripeOptions>;
}

/**
 * Stripe async config type declaration.
 *
 * @interface
 */
export interface StripeAsyncOptions extends Pick<ModuleMetadata, 'imports'>{
    name?: string;
    inject?: any[];
    useClass?: Type<StripeOptionsFactory>;
    useExisting?: Type<StripeOptionsFactory>;
    useFactory?: (...args: any[]) => StripeOptions | Promise<StripeOptions>;
}
