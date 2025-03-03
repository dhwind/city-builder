'use client';

import { House } from 'lucide-react';

import { useTranslations } from 'next-intl';
import { UniqueIdentifier } from '@dnd-kit/core';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { generateUUID } from '@/utils/uuid';
import { builderConfig } from '@/config/builder';
import LoaderLayout from '@/layouts/loader';
import DndSort from '@/layouts/dnd-sort';
import { useBuilderStore } from '@/store/builder';
import { Floor } from '@/types/builder';
import { arrayToRecord } from '@/utils/store';
import BuildingsCardItem from './buildings-card-item';

const BuildingsCardsList: React.FC = () => {
  const t = useTranslations('builder');

  const { buildings, pending, addBuilding, sortBuildings } = useBuilderStore(
    useShallow(state => ({
      buildings: state.buildings,
      pending: state.pending,
      addBuilding: state.addBuilding,
      sortBuildings: state.sortBuildings,
    })),
  );

  const buildingsUuids = Object.keys(buildings);

  const buildingsCount = Object.keys(buildings).length;

  const handleAddNewBuilding = () => {
    const defaultBuildingType = builderConfig.defaultType;
    const defaultBuildingColor = builderConfig.defaultColor;

    const floors: Floor[] = Array.from({
      length: builderConfig[defaultBuildingType].min.length,
    }).map((_, index) => {
      return {
        uuid: generateUUID('floor'),
        color: defaultBuildingColor,
        name: `Floor ${index + 1}`,
        order: index + 1,
      };
    });

    addBuilding({
      uuid: generateUUID('building'),
      name: `Building ${buildings ? buildingsCount + 1 : ''}`,
      type: defaultBuildingType,
      color: defaultBuildingColor,
      floors: arrayToRecord(floors, 'uuid'),
    });
  };

  const renderActiveCardOverlay = (activeBuildingUuid: UniqueIdentifier) => {
    const activeBuilding = buildings[activeBuildingUuid];

    return <BuildingsCardItem building={activeBuilding} active />;
  };

  const handleBuildingCardsDragEnd = (
    sortedBuildingsUuids: UniqueIdentifier[],
  ) => {
    sortBuildings(sortedBuildingsUuids);
  };

  return (
    <section id="buildings-cards" className="col-span-1">
      <div className="border rounded">
        <div className="w-full bg-gray-100 px-6 py-3 font-bold">
          {t('panel')}
        </div>
        <div className="w-full scrollbar-thin max-h-[600px] h-[600px] overflow-y-auto overflow-x-hidden relative p-2">
          <LoaderLayout isLoading={pending}>
            <DndSort
              items={buildingsUuids}
              strategy={verticalListSortingStrategy}
              renderActiveItem={renderActiveCardOverlay}
              onDragEndHandler={handleBuildingCardsDragEnd}
            >
              {buildingsCount > 0 ? (
                <ul className="flex flex-col gap-y-2">
                  {buildingsUuids?.map(uuid => (
                    <BuildingsCardItem key={uuid} building={buildings[uuid]} />
                  ))}
                </ul>
              ) : (
                <div className="flex text-center justify-center align-center px-6 py-3 ">
                  {t('noBuildings')}
                </div>
              )}
            </DndSort>
          </LoaderLayout>
        </div>
        <div className="flex justify-center align-center mt-auto bg-gray-100 px-6 py-3 ">
          <Button variant="outline" onClick={handleAddNewBuilding}>
            <House size={24} />
            {t('add')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BuildingsCardsList;
