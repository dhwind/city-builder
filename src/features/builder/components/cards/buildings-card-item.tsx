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

  const { removeBuilding, setBuilding, setBuildingName, changeFloorsCount } =
    useBuilderStore(
      useShallow(state => ({
        removeBuilding: state.removeBuilding,
        setBuilding: state.setBuilding,
        setBuildingName: state.setBuildingName,
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
      try {
        const newBuilding = { ...building, [key]: value };

        newBuilding.floors = Object.fromEntries(
          Object.entries(newBuilding.floors).map(([uuid, floor]) => [
            uuid,
            { ...floor, color: newBuilding.color },
          ]),
        );

        setBuilding(newBuilding);

        toast.info(
          t(`${key}.success.message`, {
            buildingOldName: building.name,
            buildingName: newBuilding.name,
          }),
          {
            description: formatDate(new Date()),
            cancel: {
              label: <X size={16} />,
              onClick: () => {}, // required prop
            },
          },
        );
      } catch (err) {
        console.error(err);
        toast.error(
          t(`${key}.error.message`, {
            buildingName: building.name,
          }),
          {
            description: formatDate(new Date()),
            cancel: {
              label: <X size={16} />,
              onClick: () => {}, // required prop
            },
          },
        );
      }
    },
    [building, setBuilding, t],
  );

  const displayFieldErrorToast = useCallback(
    (error: ParsedError) => {
      let translationVariables: { [key: string]: string } = {
        type: t(`type.labels.${building.type}`),
      };

      if (error.symbols) {
        translationVariables = {
          ...translationVariables,
          symbolsCount: error.symbols!.toString(),
        };
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
    [building.type, t],
  );

  const handleNameFocusOut = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const newName = value.trim();
      const result = builderSchema.name.safeParse(newName);

      if (inputRef!.current!.value === building.name) {
        return;
      }

      if (result.success) {
        setBuildingName(building.uuid, newName);
        toast.info(
          t('name.success.message', {
            buildingOldName: building.name,
            buildingName: newName,
          }),
          {
            description: formatDate(new Date()),
            cancel: {
              label: <X size={16} />,
              onClick: () => {}, // required prop
            },
          },
        );
      } else {
        inputRef!.current!.value = building.name;

        displayFieldErrorToast(parseError(result.error.errors[0]));
      }
    },
    [building.name, building.uuid, setBuildingName, t, displayFieldErrorToast],
  );

  const handleNameFocus = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleRemoveBuilding = useCallback(() => {
    try {
      removeBuilding(building.uuid);
      toast.info(
        t('remove.success.message', {
          buildingName: building.name,
        }),
      );
    } catch (err) {
      console.error(err);
      toast.error(
        t('remove.error.message', {
          buildingName: building.name,
        }),
      );
    }
  }, [building.name, building.uuid, removeBuilding, t]);

  const handleSelectType = useCallback(
    (value: string) => {
      const typeValue = value as BuildingType;
      changeBuildingAttribute('type', typeValue);

      const currentFloorsCount = Object.keys(building.floors).length;

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
      building.floors,
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
      sortType="vertical"
      className="w-full px-2 py-3 border rounded hover:bg-gray-50"
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
                value={Object.keys(building.floors).length}
              />
            </div>
            <Slider
              min={builderConfig[building.type].min.length}
              max={builderConfig[building.type].max.length}
              value={[Object.keys(building.floors).length]}
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
