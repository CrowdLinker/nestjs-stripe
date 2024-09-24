import {
  HttpStatus,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import get from 'lodash/get';
import { ERROR_CODES } from '../constants/error-codes';
import { EntityErrors } from '../constants/entity-errors';
import { STRIPE_EXCEPTIONS } from '../constants/exceptions';
import { EntityErrorInterface } from '../interfaces/entity-error.interface';

/**
 * Handles stripe exceptions.
 *
 * @param {any} err
 *
 * @throws {BadRequestException}
 *
 * @returns {void}
 */
export const handleStripeException = (
  err: any,
  entityErrors: EntityErrorInterface = EntityErrors,
): void => {
  const type = get(err, 'type', null);
  const code = get(err, 'code', null);
  const message = get(err, 'message', null);

  switch (type) {
    case STRIPE_EXCEPTIONS.CARD_ERROR:
      switch (code) {
        case ERROR_CODES.CARD_DECLINED:
          throw new BadRequestException('Your card was declined.');
        case ERROR_CODES.CARD_EXPIRED:
          throw new BadRequestException('Your card seems to have expired.');
        case ERROR_CODES.CARD_INVALID_NUMBER:
        case ERROR_CODES.CARD_INVALID_EXPIRY_MONTH:
        case ERROR_CODES.CARD_INVALID_EXPIRY_YEAR:
        case ERROR_CODES.CARD_INVALID_CVC:
          throw new BadRequestException('Your card details are invalid.');
        default:
          throw new BadRequestException('Your card is invalid.');
      }
    case STRIPE_EXCEPTIONS.INVALID_REQUEST_ERROR:
      if (code === ERROR_CODES.RESOURCE_MISSING) {
        throw new NotFoundException(entityErrors.NOT_FOUND);
      } else {
        throw new BadRequestException(message);
      }
    case STRIPE_EXCEPTIONS.RATE_LIMIT_ERROR:
    case STRIPE_EXCEPTIONS.API_ERROR:
    case STRIPE_EXCEPTIONS.CONNECTION_ERROR:
    case STRIPE_EXCEPTIONS.AUTHENTICATION_ERROR:
      throw new BadRequestException(
        'There was an issue connecting with the payment gateway.',
      );
    default:
      throw new HttpException(
        'There was an error processing your payment.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
};
