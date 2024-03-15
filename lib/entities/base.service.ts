import BaseStripe from 'stripe';
import { Stripe } from '../stripe';
import upperFirst from 'lodash/upperFirst';
import { NotFoundException } from '@nestjs/common';
import { EntityErrors } from '../constants/entity-errors';
import { StripeEntity } from '../interfaces/entity.interface';
import { handleStripeException } from '../helpers/exception-handler';
import { StripeEntityResource } from '../interfaces/resource.interface';
import { EntityErrorInterface } from '../interfaces/entity-error.interface';

/**
 * Service dealing with stripe resource based operations.
 *
 * @class
 * @abstract
 */
export abstract class StripeBaseEntityService<
  T extends StripeEntity,
  K extends StripeEntityResource,
> {
  protected readonly entityErrors: EntityErrorInterface = EntityErrors;

  /**
   * Create an instance of class.
   *
   * @constructor
   *
   * @param {Stripe} stripe
   * @param {K} entityResource
   * @param {string} entityName
   */
  constructor(
    protected readonly stripe: Stripe,
    protected readonly entityResource: K,
    protected readonly entityName = 'entity',
  ) {}

  /**
   * Retrieves a entity instance from Stripe.
   *
   * @param {string} id
   * @param {boolean} throwError
   *
   * @throws {Error}
   *
   * @returns {Promise<T>} Returns Stripe entity.
   */
  async getById(
    id: string,
    throwError = false,
  ): Promise<BaseStripe.Response<T>> {
    this.validateIdArgument(id);

    return await this.entityResource
      .retrieve(id)
      .then((resource) => this.successResponse(resource))
      .catch((error) => this.catchResponse(error, throwError));
  }

  /**
   * Creates the entity resource in Stripe.
   *
   * @abstract
   *
   * @param {any} inputs
   *
   * @returns {Promise<BaseStripe.Response<T>>} Returns Stripe entity.
   */
  abstract create(
    inputs: any,
    metadata: BaseStripe.MetadataParam,
  ): Promise<BaseStripe.Response<T>>;

  /**
   * Updates the entity resource in Stripe.
   *
   * @abstract
   *
   * @param {string} id
   * @param {any} inputs
   *
   * @returns {Promise<BaseStripe.Response<T>>} Returns Stripe entity.
   */
  abstract update(id: string, inputs: any): Promise<BaseStripe.Response<T>>;

  /**
   * Updates entity metadata.
   *
   * @param {string} entityId
   * @param {BaseStripe.MetadataParam} metadata
   *
   * @returns {Promise<BaseStripe.Price>} Returns stripe response.
   */
  async setMetaData(
    entityId: string,
    metadata: BaseStripe.MetadataParam = {},
  ): Promise<BaseStripe.Response<T>> {
    return await this.getById(entityId, true).then(
      async (entity) =>
        await this.entityResource
          .update(entityId, {
            metadata: {
              ...entity.metadata,
              ...metadata,
            },
          })
          .then((resource) => this.successResponse(resource))
          .catch((error) => this.catchResponse(error)),
    );
  }

  /**
   * Validate the "id" argument in functions.
   *
   * @protected
   *
   * @param {string} id
   *
   * @throws {Error}
   *
   * @returns {boolean}
   */
  protected validateIdArgument(id: string): boolean {
    if (!id) {
      throw new Error(
        `Invalid "id" argument provided to "getById" function for Stripe ${upperFirst(
          this.entityName,
        )} entity.`,
      );
    }

    return true;
  }

  /**
   * Callback for when request is successful.
   *
   * @protected
   *
   * @param {BaseStripe.Response<T>} resource
   * @param {boolean} throwError
   *
   * @throws {NotFoundException}
   *
   * @returns {BaseStripe.Response<T>}
   */
  protected successResponse(
    resource: BaseStripe.Response<T>,
    throwError = false,
  ): BaseStripe.Response<T> {
    if (!resource && throwError) {
      throw new NotFoundException(this.entityErrors.NOT_FOUND);
    } else if (!resource) {
      return null;
    } else if (resource && (resource as any).deleted && throwError) {
      throw new NotFoundException(this.entityErrors.NOT_FOUND);
    } else if (resource && (resource as any).deleted) {
      return null;
    }

    return resource as BaseStripe.Response<T>;
  }

  /**
   * Callback for when request fails.
   *
   * @protected
   *
   * @param {any} error
   * @param {boolean} throwError
   *
   * @throws {NotFoundException|StripeInvalidRequestError}
   *
   * @returns {null}
   */
  protected catchResponse(error: any, throwError = true) {
    if (throwError) {
      handleStripeException(error, this.entityErrors);
    } else if (!throwError) {
      return null;
    }
  }
}
