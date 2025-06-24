type SelectableItem<T> = {
  label: string;
  value: T;
};

type SelectableDropdownItem = SelectableItem<string> & {
  icon?: React.ReactNode;
};

export type { SelectableDropdownItem, SelectableItem };
