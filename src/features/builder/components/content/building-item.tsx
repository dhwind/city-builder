import { memo, useCallback, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import DynamicImage from '@/components/dynamic-image';
import { Building } from '@/types/builder';
import { buildingFloorsTilesRes } from '@/config/builder';
import SortableItem from '@/layouts/sortable-item';
import { useBuilderStore } from '@/store/builder';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/date';

type ComponentProps = {
  building: Building;
  active?: boolean;
};

const BuildingItem: React.FC<ComponentProps> = ({ building, active }) => {
  const t = useTranslations('fields');
  const [itemHovered, setItemHovered] = useState<boolean>(false);

  const { removeBuilding } = useBuilderStore(
    useShallow(state => ({
      removeBuilding: state.removeBuilding,
    })),
  );

  const tiles = buildingFloorsTilesRes[building.type];

  const handleRemoveBuilding = useCallback(() => {
    try {
      removeBuilding(building.uuid);
      toast.info(
        t('remove.success.message', {
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
    } catch (err) {
      console.error(err);
      toast.error(
        t('remove.error.message', {
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
  }, [building.name, building.uuid, removeBuilding, t]);

  return (
    <SortableItem
      id={building.uuid}
      prefix="building"
      sortType="horizontal"
      className="mt-auto h-auto rounded-x rounded-t border-x-3 border-t-3 border-transparent hover:border-gray-400 transition-all"
      active={active}
      hovered={itemHovered}
      handleHover={(hovered: boolean) => setItemHovered(hovered)}
    >
      <div className="flex flex-col-reverse items-center relative -mb-1">
        {building.floors.map((floor, i, arr) => {
          const floorTiles = tiles[floor.color];
          let tileRes = '';

          if (floor.order === 1) {
            tileRes =
              arr.length > 1 ? floorTiles.initial : floorTiles.initial1Floor!;
          } else if (floor.order === arr.length) {
            tileRes = floorTiles.roof;
          } else {
            tileRes = floorTiles.middle;
          }

          return (
            <div
              key={floor.uuid}
              className="px-4 flex justify-center w-auto h-auto min-w-[200px] cursor-pointer hover:bg-gray-100 hover:border-y"
            >
              <DynamicImage
                src={tileRes}
                width={tiles.tileImgWidth}
                className="hover:opacity-85"
                alt={`${building.name} floor`}
              />
            </div>
          );
        })}
        <Button
          variant="default"
          onClick={handleRemoveBuilding}
          className={`absolute rounded bg-gray-200 hover:bg-gray-400 right-0 top-0 opacity-0 z-50 transition-opacity ${itemHovered ? 'opacity-100' : ''}`}
        >
          <X className="stroke-black" size={16} />
        </Button>
        <div
          className={`absolute bottom-0 opacity-0 w-full p-1 leading-normal bg-gray-100 text-xs text-center transition-opacity ${itemHovered ? 'opacity-100' : ''}`}
        >
          {building.name}
        </div>
      </div>
    </SortableItem>
  );
};

export default memo(BuildingItem);
