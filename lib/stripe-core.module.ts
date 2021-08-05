import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { STRIPE_OPTIONS } from './constants';
import { Stripe } from './stripe'
import { StripeOptions, StripeAsyncOptions, StripeOptionsFactory } from './interfaces';

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
     * @param {StripeOptions} options
     *
     * @returns {DynamicModule}
     */
    static forRoot(
        options: StripeOptions
    ): DynamicModule {
        return {
            module: StripeCoreModule,
            providers: [
                {
                    provide: STRIPE_OPTIONS,
                    useValue: options
                }
            ],
        }
    }

    /**
     * Create a dynamic nestjs-stripe module asynchronous-ly.
     *
     * @param {StripeOptions} options
     *
     * @returns {DynamicModule}
     */
    static forRootAsync(
        options: StripeAsyncOptions,
    ): DynamicModule {
        return {
            module: StripeCoreModule,
            imports: options.imports,
            providers: [
                ...this.createAsyncProviders(options),
            ],
        }
    }

    /**
     * Create nestjs-stripe config providers asynchronous-ly.
     *
     * @param {StripeAsyncOptions} options
     *
     * @returns {Provider[]}
     */
    private static createAsyncProviders(options: StripeAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncConfigProvider(options)];
        }

        const useClass = options.useClass as Type<StripeOptionsFactory>;

        return [
            this.createAsyncConfigProvider(options),
            {
                provide: useClass,
                useClass
            },
        ]
    }

    /**
     * Create nestjs-stripe config provider asynchronous-ly.
     *
     * @param {StripeAsyncOptions} options
     *
     * @returns {Provider}
     */
    private static createAsyncConfigProvider(options: StripeAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                provide: STRIPE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            }
        }

        const inject = [
            (options.useClass || options.useExisting) as Type<StripeOptionsFactory>
        ];

        return {
            provide: STRIPE_OPTIONS,
            useFactory: async (configFactory: StripeOptionsFactory) =>
                await configFactory.createStripeOptions(),
            inject
        }
    }
}
