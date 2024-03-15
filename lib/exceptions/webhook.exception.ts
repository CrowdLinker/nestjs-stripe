import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Stripe webhook exception response interface
 *
 * @interface
 */
export interface StripeWebhookExceptionResponseInterface {
  statusCode: number;
  message: string;
  error: string;
}

/**
 * Stripe webhook exception descriptions.
 *
 * @constant
 */
export const StripeWebhookExceptionDescription = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  BAD_REQUEST: 'Bad Request',
};

/**
 * Special exception used for webhook handler exceptions.
 *
 * @class
 */
export class StripeWebhookException extends HttpException {
  /**
   * Instantiate a `StripeWebhookException` Exception.
   *
   * @param {string|Record<string, unknown>|any} objectOrError
   * @param {string} description
   * @param {number} status
   */
  constructor(
    objectOrError?: string | Record<string, unknown> | any,
    description = StripeWebhookExceptionDescription.INTERNAL_SERVER_ERROR,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(HttpException.createBody(objectOrError, description, status), status);
  }
}
