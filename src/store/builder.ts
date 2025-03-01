import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Building } from '@/types/builder';
import { Store } from '@/types/store';

type BuilderState = {
  buildings: Building[];
  addBuilding: (building: Building) => void;
  removeBuilding: (uuid: string) => void;
  setBuildings: (buildings: Building[]) => void;
};

type CurrentStore = Store & BuilderState;

const useBuilderStore = create<CurrentStore>()(
  persist(
    set => ({
      pending: true,
      buildings: [],
      addBuilding: building =>
        set(state => ({
          ...state,
          buildings: [...state.buildings, building],
        })),
      removeBuilding: uuid =>
        set(state => ({
          ...state,
          buildings: state.buildings.filter(building => building.uuid !== uuid),
        })),
      setPending: value => set({ pending: value }),
      setBuildings: (buildings: Building[]) =>
        set(state => ({
          ...state,
          buildings,
        })),
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
