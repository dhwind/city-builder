import React, { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectableItem } from '@/types/common';

type SelectProps = {
  items: SelectableItem<string>[];
  headerLabel?: string;
  defaultValue?: string;
  triggerLabel?: string;
  onSelect: (value: string) => void;
};

const SelectDropdown: React.FC<SelectProps> = ({
  items,
  headerLabel,
  defaultValue,
  triggerLabel,
  onSelect,
}) => {
  const t = useTranslations('common');

  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const handleSelect = useCallback(
    (value: string) => {
      setSelectedValue(value);
      onSelect(value);
    },
    [onSelect],
  );

  return (
    <Select value={selectedValue} onValueChange={handleSelect}>
      <SelectTrigger className="bg-white">
        <SelectValue placeholder={triggerLabel || t('open')} />
      </SelectTrigger>
      <SelectContent>
        {headerLabel && (
          <SelectGroup>
            <SelectLabel>{headerLabel}</SelectLabel>
          </SelectGroup>
        )}
        {items.map(item => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown;
