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
import { SelectableDropdownItem } from '@/types';

type SelectProps = {
  items: SelectableDropdownItem[];
  headerLabel?: string;
  defaultValue?: string;
  triggerLabel?: string;
  className?: {
    trigger?: string;
    content?: string;
  };
  onSelect: (value: string) => void;
};

const SelectDropdown: React.FC<SelectProps> = ({
  items,
  headerLabel,
  defaultValue,
  triggerLabel,
  className,
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
      <SelectTrigger className={className?.trigger}>
        <SelectValue placeholder={triggerLabel || t('open')} />
      </SelectTrigger>
      <SelectContent className={className?.content}>
        {headerLabel && (
          <SelectGroup>
            <SelectLabel>{headerLabel}</SelectLabel>
          </SelectGroup>
        )}
        {items.map(item => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="flex items-center cursor-pointer gap-x-2"
          >
            <div>{item.icon ? item.icon : null}</div>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown;
