# NestJS Stripe

Stripe module for NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="380" alt="Nest Logo" />
  </a>
</p>

## Packages

- [Stripe](https://www.npmjs.com/package/stripe/v/14.21.0) - stripe (v14.21.0)

## Installation

```bash
npm install --save @crowdlinker/nestjs-stripe stripe
npm install --save-dev @types/stripe
// or
// yarn add @crowdlinker/nestjs-stripe stripe
// yarn add -D @types/stripe
```

## Usage

### Importing the Module

#### Synchronous

```js
import { StripeModule, StripeModuleOptions } from '@crowdlinker/nestjs-stripe';

@Module({
  imports: [
    StripeModule.forRoot({
      apiKey: 'STRIPE_API_KEY',
      config: {
        apiVersion: '2019-08-08',
        maxNetworkRetries: 1,
        httpAgent: null,
        timeout: 1000,
        host: 'api.example.com',
        port: 123,
        telemetry: true,
      }
    } as StripeModuleOptions),
  ],
})
```

#### Asynchronous

```js
import { StripeModule, StripeModuleOptions } from '@crowdlinker/nestjs-stripe';

@Module({
  imports: [
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          apiKey: configService.apiKey,
          config: {
            apiVersion: configService.apiVersion,
            maxNetworkRetries: configService.maxNetworkRetries,
            httpAgent: configService.httpAgent,
            timeout: configService.timeout,
            host: configService.host,
            port: configService.port,
            telemetry: configService.telemetry,
          }
        } as StripeModuleOptions),
    inject: [ConfigService],
    }),
  ],
})
```

### Importing in a Class/Service

```js
import { Stripe } from '@crowdlinker/nestjs-stripe';

class StripeService {
  constructor(private readonly stripe: Stripe) {}

  async createCustomer(email) {
    return await this.stripe.customer.create({ email });
  }
}
```

### For Previous v0.1.0 Version

- `StripeOptions` was renamed to `StripeModuleOptions` in `v0.2.0`. So, for versions lower than `v0.2.0`, please update your imports accordingly.

## Important Points To Note

- Code is written in Typescript (v5.1.3)

## Contributors

- Team @Crowdlinker ([Github](https://github.com/CrowdLinker) | [Bitbucket](https://bitbucket.org/crowdlinker/))
