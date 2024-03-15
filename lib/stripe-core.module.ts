import {
  StripeModuleOptions,
  StripeAsyncModuleOptions,
  StripeModuleOptionsFactory,
} from './interfaces';
import { Stripe } from './stripe';
import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';

/**
 * Constant defining token for injecting stripe module options.
 *
 * @constant
 */
export const STRIPE_MODULE_OPTIONS = 'STRIPE_MODULE_OPTIONS';

/**
 * Import and provide base stripe related classes.
 *
 * @module
 */
@Global()
@Module({
  providers: [Stripe],
  exports: [Stripe],
})
export class StripeCoreModule {
  /**
   * Create a dynamic nestjs-stripe module.
   *
   * @param {StripeModuleOptions} options
   *
   * @returns {DynamicModule}
   */
  static forRoot(options: StripeModuleOptions): DynamicModule {
    return {
      module: StripeCoreModule,
      providers: [
        {
          provide: STRIPE_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  /**
   * Create a dynamic nestjs-stripe module asynchronous-ly.
   *
   * @param {StripeModuleOptions} options
   *
   * @returns {DynamicModule}
   */
  static forRootAsync(options: StripeAsyncModuleOptions): DynamicModule {
    return {
      module: StripeCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options)],
    };
  }

  /**
   * Create nestjs-stripe config providers asynchronous-ly.
   *
   * @param {StripeAsyncModuleOptions} options
   *
   * @returns {Provider[]}
   */
  private static createAsyncProviders(options: StripeAsyncModuleOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncConfigProvider(options)];
    }

    const useClass = options.useClass as Type<StripeModuleOptionsFactory>;

    return [
      this.createAsyncConfigProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  /**
   * Create nestjs-stripe config provider asynchronous-ly.
   *
   * @param {StripeAsyncModuleOptions} options
   *
   * @returns {Provider}
   */
  private static createAsyncConfigProvider(
    options: StripeAsyncModuleOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: STRIPE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<StripeModuleOptionsFactory>,
    ];

    return {
      provide: STRIPE_MODULE_OPTIONS,
      useFactory: async (configFactory: StripeModuleOptionsFactory) =>
        await configFactory.createStripeModuleOptions(),
      inject,
    };
  }
}
