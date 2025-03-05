import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Store } from '@/types/store';
import { createStateObj } from '@/utils/store';
import { Weather, WeatherTemperatureRangeType } from '@/types/weather';
import { weatherConfig } from '@/config/weather';
import { getTemperatureRange } from '@/utils/weather';

type WeatherState = {
  currentWeather: Weather;
  currentLocation: string;
  currentTemperature: {
    value: number;
    range: WeatherTemperatureRangeType;
  } | null;
};

type WeatherActions = {
  setCurrentWeather: (Weather: Weather) => void;
  setCurrentLocation: (location: string) => void;
  setCurrentTemperature: (temperature: number) => void;
};

type WeatherSlicer = WeatherState & WeatherActions;

type CurrentStore = Store & WeatherSlicer;

const initialState: WeatherState = {
  currentWeather: 'clear-sky',
  currentLocation: weatherConfig.location.default,
  currentTemperature: null,
};

const useWeatherStore = create<CurrentStore>()(
  persist(
    set =>
      createStateObj<WeatherSlicer>({
        state: {
          ...initialState,
          setCurrentWeather: (weather: Weather) =>
            set(state => ({ ...state, currentWeather: weather })),
          setCurrentLocation: (location: string) =>
            set(state => ({ ...state, currentLocation: location })),
          setCurrentTemperature: (temperature: number) =>
            set(state => ({
              ...state,
              currentTemperature: {
                range: getTemperatureRange(temperature),
                value: temperature,
              },
            })),
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
