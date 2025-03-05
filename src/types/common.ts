export type SelectableItem<T> = {
  label: string;
  value: T;
};

export type SelectableDropdownItem = SelectableItem<string> & {
  icon?: React.ReactNode;
};
