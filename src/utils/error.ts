import { ZodIssue } from 'zod';

type ParsedError = {
  message: string;
  symbols?: number | bigint;
};

const parseError = (error: ZodIssue): ParsedError => {
  const result: ParsedError = {
    message: error.message,
  };

  if (error.code === 'too_big') {
    result.symbols = error.maximum;
  }

  if (error.code === 'too_small') {
    result.symbols = error.minimum;
  }

  return result;
};

export type { ParsedError };
export { parseError };
