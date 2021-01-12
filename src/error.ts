export interface ErrorMessageConfigType {
  field: string;
  shouldValidate: boolean | undefined;
  path?: string;
  value?: unknown;
}

export interface ThrowErrorType {
  (config: ErrorMessageConfigType): void;
}

export const throwTypeError: ThrowErrorType = ({
  field,
  shouldValidate = false,
  path,
  value,
}) => {
  const type = typeof value;

  if (!shouldValidate) {
    throw new Error(
      `Some argument in \`${field}\` resolver is causing \`validation.shouldValidate = ${shouldValidate}\``,
    );
  }
  throw new Error(
    `The argument: \`${path}\` type \`${type}\` has an invalid value: \`${value}\``,
  );
};
