import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Floor } from '@/types/builder';
import DynamicImage from '@/components/dynamic-image';
import PopoverAtCoordinates from '@/layouts/popover-at-coordinates';
import SelectDropdown from '@/components/select-dropdown';
import { builderConfig } from '@/config/builder';
import { SelectableItem } from '@/types/common';
import usePopover from '@/hooks/use-popover';

type ComponentProps = {
  floor: Floor;
  tileRes: string;
  tileImgWidth: number;
  onChangeFloorColor: (floorUuid: string, color: string) => void;
};

const BuildingFloor: React.FC<ComponentProps> = ({
  floor,
  tileRes,
  tileImgWidth,
  onChangeFloorColor,
}) => {
  const t = useTranslations('fields');

  const { popoverOpen, coordinates, setPopoverOpen, handlePopoverTrigger } =
    usePopover();

  const handleSelect = (value: string) => {
    onChangeFloorColor(floor.uuid, value);
    setPopoverOpen(false);
  };

  const colorItems: SelectableItem<string>[] = builderConfig.colors.map(
    color => ({
      label: t(color.label),
      value: color.value as string,
    }),
  );

  const defaultColorItem = colorItems.find(item => item.value === floor.color)!;

  return (
    <div
      key={floor.uuid}
      className="px-4 flex justify-center w-auto h-auto min-w-[200px] cursor-pointer hover:bg-gray-100 hover:border-y"
      onClick={handlePopoverTrigger}
    >
      <DynamicImage
        src={tileRes}
        width={tileImgWidth}
        className="hover:opacity-85"
        alt={`floor ${floor.name}`}
      />
      <PopoverAtCoordinates
        open={popoverOpen}
        setPopoverOpen={setPopoverOpen}
        coordinates={coordinates}
      >
        <div className="flex flex-col items-start gap-x-2 gap-y-1 sm:flex-row sm:items-center md:flex-col md:items-start xl:flex-row xl:items-center">
          <div>{t('color.labels.title')}</div>
          <SelectDropdown
            items={colorItems}
            defaultValue={defaultColorItem.value}
            onSelect={handleSelect}
          />
        </div>
      </PopoverAtCoordinates>
    </div>
  );
};

export default memo(BuildingFloor);
