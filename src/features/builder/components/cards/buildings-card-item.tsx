import { Trash2 } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { memo, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { Building, BuildingType, Color } from '@/types/builder';
import { Input } from '@/components/ui/input';
import { builderSchema } from '@/validation/builder';
import { useDebounce } from '@/hooks/use-debounce';
import { formatDate } from '@/utils/date';
import { ParsedError, parseError } from '@/utils/error';
import SelectDropdown from '@/components/select-dropdown';
import { builderConfig } from '@/config/builder';
import { SelectableItem } from '@/types/common';
import SortableItem from '@/layouts/sortable-item';
import { useBuilderStore } from '@/store/builder';
import { Slider } from '@/components/ui/slider';

type ComponentProps = {
  building: Building;
  active?: boolean;
};

const BuildingsCardItem: React.FC<ComponentProps> = ({ building, active }) => {
  const t = useTranslations('fields');

  const { removeBuilding, setBuilding, changeFloorsCount } = useBuilderStore(
    useShallow(state => ({
      removeBuilding: state.removeBuilding,
      setBuilding: state.setBuilding,
      changeFloorsCount: state.changeFloorsCount,
    })),
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const buildingTypesItems: SelectableItem<string>[] = builderConfig.types.map(
    buildingType => ({
      label: t(buildingType.label),
      value: buildingType.value as string,
    }),
  );

  const defaultTypeItem = buildingTypesItems.find(
    item => item.value === building.type,
  )!;

  const buildingColorItems: SelectableItem<string>[] = builderConfig.colors.map(
    color => ({
      label: t(color.label),
      value: color.value as string,
    }),
  );

  const defaultColorItem = buildingColorItems.find(
    item => item.value === building.color,
  )!;

  const handleNameChange = useDebounce(
    useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (inputRef?.current) {
        inputRef.current!.value = e.target.value;
      }
    }, []),
    300,
  );

  const changeBuildingAttribute = useCallback(
    <T extends keyof Building>(key: string, value: Building[T]) => {
      const newBuilding = { ...building, [key]: value };

      setBuilding(newBuilding);

      toast.info(t(`${key}.success.info`), {
        description: formatDate(new Date()),
        cancel: {
          label: <X size={16} />,
          onClick: () => {}, // required prop
        },
      });
    },
    [building, setBuilding, t],
  );

  const displayFieldErrorToast = useCallback(
    (error: ParsedError) => {
      let translationVariables = {};

      if (error.symbols) {
        translationVariables = { symbolsCount: error.symbols!.toString() };
      }

      // translation key is coming as an error message
      toast.error(t(error.message, translationVariables), {
        description: formatDate(new Date()),
        cancel: {
          label: <X size={16} />,
          onClick: () => {}, // required prop
        },
      });
    },
    [t],
  );

  const handleNameFocusOut = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const result = builderSchema.name.safeParse(value);

      if (inputRef!.current!.value === building.name) {
        return;
      }

      if (result.success) {
        changeBuildingAttribute('name', value.trim());
      } else {
        inputRef!.current!.value = building.name;

        displayFieldErrorToast(parseError(result.error.errors[0]));
      }
    },
    [building, changeBuildingAttribute, displayFieldErrorToast],
  );

  const handleNameFocus = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleRemoveBuilding = useCallback(
    () => removeBuilding(building.uuid),
    [building.uuid, removeBuilding],
  );

  const handleSelectType = useCallback(
    (value: string) => {
      const typeValue = value as BuildingType;
      changeBuildingAttribute('type', typeValue);

      const currentFloorsCount = building.floors.length;

      const defaultFloorsMin = builderConfig[typeValue].min.length;
      const defaultFloorsMax = builderConfig[typeValue].max.length;

      if (currentFloorsCount < defaultFloorsMin) {
        changeFloorsCount(building.uuid, defaultFloorsMin);
      }

      if (currentFloorsCount > defaultFloorsMax) {
        changeFloorsCount(building.uuid, defaultFloorsMax);
      }
    },
    [
      building.floors.length,
      building.uuid,
      changeBuildingAttribute,
      changeFloorsCount,
    ],
  );

  const handleSelectColor = useCallback(
    (value: string) => {
      changeBuildingAttribute('color', value as Color);
    },
    [changeBuildingAttribute],
  );

  const handleFloorsCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);

      const result = builderSchema[building.type].safeParse(value);

      if (result.success) {
        changeFloorsCount(building.uuid, value);
      } else {
        displayFieldErrorToast(parseError(result.error.errors[0]));
      }
    },
    [building.type, building.uuid, changeFloorsCount, displayFieldErrorToast],
  );

  const handleSliderChange = useCallback(
    (value: number[]) => {
      const newFloorsCount = value[0];

      const result = builderSchema[building.type].safeParse(newFloorsCount);

      if (result.success) {
        changeFloorsCount(building.uuid, newFloorsCount);
      }
    },
    [building.type, building.uuid, changeFloorsCount],
  );

  return (
    <SortableItem
      id={building.uuid}
      prefix="building-card"
      className="w-full px-2 py-3 border rounded hover:bg-gray-50 flex items-center gap-x-2"
      active={active}
    >
      <div className="flex gap-x-1 w-full">
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              variant="editable"
              onChange={handleNameChange}
              onBlur={handleNameFocusOut}
              defaultValue={building.name}
              ref={inputRef}
            />
            <Button
              variant="ghost"
              className="!h-auto !p-1 rounded"
              onClick={handleNameFocus}
            >
              <SquarePen size={16} />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="flex flex-col items-start gap-x-2 gap-y-1 sm:flex-row sm:items-center md:flex-col md:items-start xl:flex-row xl:items-center">
              <div>{t('type.labels.title')}</div>
              <SelectDropdown
                items={buildingTypesItems}
                defaultValue={defaultTypeItem.value}
                onSelect={handleSelectType}
              />
            </div>
            <div className="flex flex-col items-start gap-x-2 gap-y-1 sm:flex-row sm:items-center md:flex-col md:items-start xl:flex-row xl:items-center">
              <div>{t('color.labels.title')}</div>
              <SelectDropdown
                items={buildingColorItems}
                defaultValue={defaultColorItem.value}
                onSelect={handleSelectColor}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <div className="flex flex-col items-start gap-x-2 gap-y-1 sm:flex-row sm:items-center md:flex-col md:items-start xl:flex-row xl:items-center">
              <div>{t('floor.labels.title')}</div>
              <Input
                variant="default"
                type="number"
                onChange={handleFloorsCountChange}
                value={building.floors.length}
              />
            </div>
            <Slider
              min={builderConfig[building.type].min.length}
              max={builderConfig[building.type].max.length}
              value={[building.floors.length]}
              className="max-w-48"
              onValueChange={handleSliderChange}
            />
          </div>
        </div>

        <div className="h-full mt-auto">
          <Button
            variant="ghost"
            className="mt-auto !h-auto !p-2 rounded"
            onClick={handleRemoveBuilding}
          >
            <Trash2 size={24} />
          </Button>
        </div>
      </div>
    </SortableItem>
  );
};

export default memo(BuildingsCardItem);
