'use client';

import { useTranslations } from 'next-intl';

import '../../styles/index.css';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useRef, useState } from 'react';
import { horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useBuilderStore } from '@/features/builder/store/builder';
import DndSort from '@/layouts/dnd-sort';
import { WeatherContainer } from '@/features/weather';
import { cn } from '@/lib/utils';
import BuildingItem from './building-item';
import { useWeather } from '@/features/weather/hooks';

const BuildingsContent: React.FC = () => {
  const t = useTranslations('builder');

  const { currentWeather, isWeatherLoading } = useWeather();

  const { buildings, sortBuildings } = useBuilderStore(
    useShallow(state => ({
      buildings: state.buildings,
      sortBuildings: state.sortBuildings,
    })),
  );

  const buildingsListRef = useRef<HTMLUListElement>(null);
  const [groundBgWidth, setGroundBgWidth] = useState<string>('100%');

  const buildingsUuids = Object.keys(buildings);

  useEffect(() => {
    if (buildingsListRef.current) {
      setGroundBgWidth(`${buildingsListRef.current.scrollWidth}px`);
    }
  }, [buildings]);

  const renderActiveCardOverlay = (activeBuildingUuid: UniqueIdentifier) => {
    const activeBuilding = buildings[activeBuildingUuid];

    return <BuildingItem building={activeBuilding} active />;
  };

  const handleBuildingCardsDragEnd = (
    sortedBuildingsUuids: UniqueIdentifier[],
  ) => {
    sortBuildings(sortedBuildingsUuids);
  };

  return (
    <section id="buildings-content" className="col-span-1 xl:col-span-2">
      <div className="border rounded">
        <div className="w-full bg-gray-100 px-6 py-3 font-bold">
          {t('buildings')}
        </div>

        <div
          className={cn(
            'h-[660px] max-h-[660px] relative',
            !isWeatherLoading ? `background-image-${currentWeather?.type}` : '',
          )}
        >
          <WeatherContainer />
          <div className="scrollable-container scrollbar-thin">
            <DndSort
              items={buildingsUuids}
              strategy={horizontalListSortingStrategy}
              renderActiveItem={renderActiveCardOverlay}
              onDragEndHandler={handleBuildingCardsDragEnd}
            >
              <ul
                ref={buildingsListRef}
                className="mt-auto pt-[10rem] w-full scrollable-content"
              >
                {buildingsUuids.map(uuid => (
                  <BuildingItem key={uuid} building={buildings[uuid]} />
                ))}
              </ul>
            </DndSort>

            <div
              style={{
                width: groundBgWidth,
              }}
              className="ground-bg"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildingsContent;
