import { Store } from '@/types';

type PartialParam<T> = T | Partial<T> | ((state: T) => T | Partial<T>);

type CreateStateObjParams<T> = {
  state: T;
  set: (
    partial: PartialParam<T> | { pending: boolean },
    replace?: false,
  ) => void;
};

export const createStateObj = <T>({
  state,
  set,
}: CreateStateObjParams<T>): Store & T => ({
  pending: true,
  setPending: value => set({ pending: value }),
  ...state,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arrayToRecord = <T extends Record<K, any>, K extends keyof T>(
  array: T[],
  key: K,
): Record<T[K], T> => {
  return array.reduce(
    (acc, item) => {
      acc[item[key]] = item;
      return acc;
    },
    {} as Record<T[K], T>,
  );
};
