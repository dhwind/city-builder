import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Building, Floor } from '@/types/builder';
import { Store } from '@/types/store';
import { createStateObj } from '@/utils/store';
import { generateUUID } from '@/utils/uuid';
import { builderConfig } from '@/config/builder';

type BuilderState = {
  buildings: Building[];
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
          buildings: [],
          addBuilding: (building: Building) =>
            set(state => ({
              ...state,
              buildings: [...state.buildings, building],
            })),
          removeBuilding: (uuid: string) =>
            set((state: BuilderState) => ({
              ...state,
              buildings: state.buildings.filter(
                building => building.uuid !== uuid,
              ),
            })),
          sortBuildings: (buildingsUuids: UniqueIdentifier[]) =>
            set((state: BuilderState) => {
              const sortedBuildings = buildingsUuids
                .map(uuid =>
                  state.buildings.find(building => building.uuid === uuid),
                )
                .filter(Boolean) as Building[];
              return { ...state, buildings: sortedBuildings };
            }),
          setBuilding: (building: Building) =>
            set((state: BuilderState) => {
              const updatedBuildings = state.buildings.map(b => {
                if (b.uuid === building.uuid) {
                  return building;
                }

                return b;
              });
              return { ...state, buildings: updatedBuildings };
            }),
          changeFloorsCount: (buildingUuid: string, count: number) =>
            set((state: BuilderState) => {
              const updatedBuildings = state.buildings.map(b => {
                if (b.uuid === buildingUuid) {
                  const floorsLength = b?.floors?.length;

                  if (floorsLength > count) {
                    b.floors = b.floors.filter((_, i) => i < count);
                  } else {
                    const floorsToAdd = count - floorsLength;

                    const newFloors: Floor[] = Array.from({
                      length: floorsToAdd,
                    }).map((_, index) => {
                      const floorOrder = b.floors.length + index + 1;
                      return {
                        uuid: generateUUID('floor'),
                        color: builderConfig.defaultColor,
                        name: `Floor ${floorOrder}`,
                        order: floorOrder,
                      };
                    });

                    b.floors = [...b.floors, ...newFloors];
                  }

                  return { ...b, floors: b.floors };
                }

                return b;
              });

              return { ...state, buildings: updatedBuildings };
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
