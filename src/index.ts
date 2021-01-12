/* eslint-disable simple-import-sort/sort */
import { NexusPlugin } from '@nexus/schema/dist/plugin';
import { fieldDefTypes } from './fieldDefTypes';
import { plugin } from '@nexus/schema';
import { validationResolver } from './validationResolver';

export const argsValidatorPlugin = (): NexusPlugin => {
  return plugin({
    name: 'arguments-validation',
    description: 'Validation of arguments with Yup object shape.',
    fieldDefTypes,
    onCreateFieldResolver: (config) => validationResolver(config),
  });
};
