# NestJS Stripe

Stripe module for NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="380" alt="Nest Logo" />
  </a>
</p>

## Packages

- [Stripe](https://www.npmjs.com/package/stripe/v/8.167.0) - stripe (v8.167.0)

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
import { StripeModule, StripeOptions } from '@crowdlinker/nestjs-stripe';

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
    } as StripeOptions),
  ],
})
```

#### Asynchronous

```js
import { StripeModule, StripeOptions } from '@crowdlinker/nestjs-stripe';

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
        } as StripeOptions),
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

  async createConsumer(email) {
    return await this.stripe.customer.create({
      email,
    });
  }
}
```

## Important Points To Note

- Code is written in Typescript (v4.3.5)

## Contributors

- Team @Crowdlinker ([Github](https://github.com/CrowdLinker) | [Bitbucket](https://bitbucket.org/crowdlinker/))
