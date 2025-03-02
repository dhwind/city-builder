import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a UUID (version 4).
 * @param prefix A prefix to add to the UUID.
 * @returns A randomly generated UUID.
 */
export const generateUUID = (prefix: string): string => {
  return `${prefix}-${uuidv4()}`;
};
