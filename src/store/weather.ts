import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Store } from '@/types/store';
import { createStateObj } from '@/utils/store';
import { Weather } from '@/types/weather';

type WeatherState = {
  currentWeather: Weather;
};

type WeatherActions = {
  setWeather: (Weather: Weather) => void;
};

type WeatherSlicer = WeatherState & WeatherActions;

type CurrentStore = Store & WeatherSlicer;

const initialState: WeatherState = {
  currentWeather: 'clear-sky',
};

const useWeatherStore = create<CurrentStore>()(
  persist(
    set =>
      createStateObj<WeatherSlicer>({
        state: {
          ...initialState,
          setWeather: (weather: Weather) =>
            set(state => ({ ...state, currentWeather: weather })),
        },
        set,
      }),
    {
      name: 'weather-storage',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state.setPending(false);
        }
      },
    },
  ),
);

export { useWeatherStore };
