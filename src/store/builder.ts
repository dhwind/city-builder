import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Building } from '@/types/builder';
import { Store } from '@/types/store';
import { createStateObj } from '@/utils/store';
import { generateUUID } from '@/utils/uuid';

type BuilderState = {
  buildings: Record<string, Building>;
};

type BuilderActions = {
  addBuilding: (building: Building) => void;
  removeBuilding: (uuid: string) => void;
  sortBuildings: (buildingsUuids: UniqueIdentifier[]) => void;
  setBuilding: (building: Building) => void;
  changeFloorsCount: (buildingUuid: string, count: number) => void;
};

type BuilderSlicer = BuilderState & BuilderActions;

type CurrentStore = Store & BuilderSlicer;

const useBuilderStore = create<CurrentStore>()(
  persist(
    set =>
      createStateObj<BuilderSlicer>({
        state: {
          buildings: {},
          addBuilding: (building: Building) =>
            set(state => ({
              ...state,
              buildings: { ...state.buildings, [building.uuid]: building },
            })),
          removeBuilding: (uuid: string) =>
            set((state: BuilderState) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { [uuid]: _, ...remainingBuildings } = state.buildings;
              return { ...state, buildings: remainingBuildings };
            }),
          sortBuildings: (buildingsUuids: UniqueIdentifier[]) =>
            set((state: BuilderState) => {
              const sortedBuildings = buildingsUuids.reduce(
                (acc, uuid) => {
                  if (state.buildings[uuid]) {
                    acc[uuid] = state.buildings[uuid];
                  }
                  return acc;
                },
                {} as Record<string, Building>,
              );
              return { ...state, buildings: sortedBuildings };
            }),
          setBuilding: (building: Building) =>
            set((state: BuilderState) => ({
              ...state,
              buildings: { ...state.buildings, [building.uuid]: building },
            })),
          changeFloorsCount: (buildingUuid: string, count: number) =>
            set((state: BuilderState) => {
              const building = state.buildings[buildingUuid];

              const buildingFloors = Object.keys(building?.floors);
              const floorsLength = buildingFloors.length;

              if (floorsLength > count) {
                buildingFloors
                  .filter((_, i) => i >= count)
                  .forEach(floorUuid => {
                    delete building.floors[floorUuid];
                  });
              } else {
                const floorsToAdd = count - floorsLength;

                Array.from({
                  length: floorsToAdd,
                }).forEach((_, index) => {
                  const floorOrder = floorsLength + index + 1;
                  const newFloor = {
                    uuid: generateUUID('floor'),
                    color: building.color,
                    name: `Floor ${floorOrder}`,
                    order: floorOrder,
                  };

                  building.floors[newFloor.uuid] = newFloor;
                });
              }

              return {
                ...state,
                buildings: {
                  ...state.buildings,
                  [buildingUuid]: {
                    ...building,
                  },
                },
              };
            }),
        },
        set,
      }),
    {
      name: 'builder-storage',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state.setPending(false);
        }
      },
    },
  ),
);

export { useBuilderStore };
