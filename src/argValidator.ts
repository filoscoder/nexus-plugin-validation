interface argValidatorReturn {
  isValidValue: boolean;
  path: string;
  value: unknown;
}
type argValidatorType = (
  args: Record<string, unknown> | undefined,
  argsPath: Array<string> | undefined,
) => argValidatorReturn | undefined;

type validationTypesType = (
  argValue: number | string | unknown | undefined,
) => boolean;

/*
 * Validate the `args` value  by each data type.
 */
/* eslint-disable no-console */
export const argValidator: argValidatorType = (args, argsPath) => {
  if (args && argsPath) {
    let isValidValue = true;
    let currentPath = '';
    let argValue: unknown;
    if (argsPath.length > 0) {
      argsPath.some((element: string) => {
        currentPath = element;
        argValue = getArgValue(args, currentPath.split('.'));
        isValidValue = validationTypes(argValue);
        // break the loop if `isValidValue = false`
        if (!isValidValue) return true;
      });
      return {
        isValidValue,
        path: currentPath,
        value: argValue,
      };
    } else {
      return {
        isValidValue: validationTypes(args[argsPath[0]]),
        path: argsPath[0],
        value: args[argsPath[0]],
      };
    }
  }
};

/*
 * Recursive method that digs in `args` with given `path`
 */
const getArgValue = (
  args: Record<string, any>,
  path: Array<string>,
): Record<string, any> | Function => {
  while (path.length > 0) {
    return getArgValue(args[path.shift() || ''], path);
  }
  return args;
};

/*
 * Define `argValue` data type and go trought validation check
 */
const validationTypes: validationTypesType = (argValue): boolean => {
  const argValueType = typeof argValue;
  switch (argValueType) {
    case 'string':
      return argValue !== '';
      break;
    case 'number':
      return isNaN(Number(argValue));
      break;
    case 'undefined':
      return argValue !== undefined;
      break;
    case 'object':
      return argValue !== null;
      break;
    default:
      return true;
      break;
  }
};
