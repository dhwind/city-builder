import { createContext } from 'react';
import { Weather, LocationCity } from '../types';
import { weatherConfig } from '../config';

type WeatherContextType = {
  currentWeather: Weather;
  isWeatherLoading: boolean;
  handleGetWeather: (currentLocation: LocationCity) => void;
  changeWeather: (weather: Weather) => void;
};

const WeatherContext = createContext<WeatherContextType>({
  currentWeather: weatherConfig.defaultWeather,
  isWeatherLoading: false,
  handleGetWeather: () => {},
  changeWeather: () => {},
});

export { WeatherContext };
