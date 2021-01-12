/* eslint-disable simple-import-sort/sort */
import { CreateFieldResolverInfo, MiddlewareFn } from '@nexus/schema/dist/core';
import {
  ErrorMessageConfigType,
  ThrowErrorType,
  throwTypeError,
} from './error';

import { ArgsValidationResolverType } from './fieldDefTypes';
import { GraphQLFieldResolver } from 'graphql/type/definition';
import { argValidator } from './argValidator';

export const validationResolver = (
  config: CreateFieldResolverInfo,
): MiddlewareFn | undefined => {
  //! 1) Fetch ALL Nexus fields
  //! 2) Apply some rules/config (`validation`)?
  const nexusFieldConfig = config.fieldConfig.extensions?.nexus?.config;
  const {
    validation,
    args,
  }: {
    validation: ArgsValidationResolverType;
    args: Record<string, unknown>;
  } = nexusFieldConfig;
  const argsPath = validation?.argsPath;

  /*
   * If there is no nexus configured `args` or `validation` config DO NOTHING.
   */
  if (!args || !validation) {
    return undefined;
  }

  //! 3) Validate ONLY when the Resolver is EXECUTED (`args`)? Customizing logic?
  return (root, args, ctx, info, next) => {
    /*
     * If there is no resolver `args` DO NOTHING.
     */
    if (args === undefined) {
      return undefined;
    }

    let result: ThrowErrorType | GraphQLFieldResolver<any, any> | void;
    const shouldValidate =
      validation.shouldValidate && validation.shouldValidate(args);
    const { isValidValue, path, value } = argValidator(args, argsPath) || {};
    const messageConfig: ErrorMessageConfigType = {
      field: info.fieldName,
      shouldValidate,
      path,
      value,
    };
    result = throwTypeError(messageConfig);

    // if field `validation.shouldValidate === true`
    if (shouldValidate) {
      // if validated values by `argPath` are true
      if (isValidValue) {
        result = next(root, args, ctx, info);
      }
    }
    return result;
  };
};
