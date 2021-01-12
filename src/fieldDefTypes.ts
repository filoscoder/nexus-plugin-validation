import {
  printedGenTyping,
  printedGenTypingImport,
} from '@nexus/schema/dist/core';

const ArgValidationResolverImport = printedGenTypingImport({
  module: '../utils/argsValidatorPlugin/fieldDefTypes',
  bindings: ['ArgsValidationResolverType'],
});

export const fieldDefTypes = printedGenTyping({
  optional: true,
  name: 'validation',
  description: `Field that checks if an argument value is valid by it data type.
  Need setting \`shouldValidate = true\`, and provide \`argsPath\` as an Array`,
  type: 'ArgsValidationResolverType',
  imports: [ArgValidationResolverImport],
});

type isValidArgsType = Readonly<Record<string, any>>;

export interface ArgsValidationResolverType {
  shouldValidate?: (args?: isValidArgsType) => boolean;
  argsPath?: Array<string>;
}
