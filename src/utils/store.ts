import { Store } from '@/types/store';

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
