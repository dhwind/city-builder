'use client';

import { useCallback, useEffect, useState } from 'react';
import { Weather, LocationCity } from '../types';
import { useTranslations } from 'next-intl';
import { WeatherContext } from '../context';
import { useGetWeather } from '../api';
import { weatherConfig } from '../config';
const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const t = useTranslations('weather');

  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<Weather>(
    weatherConfig.defaultWeather,
  );

  const { mutate: getWeather } = useGetWeather();

  const handleGetWeather = useCallback(
    (currentLocation: LocationCity) => {
      setIsLoading(true);
      getWeather(
        {
          q: currentLocation ? t(`location.${currentLocation}`) : '',
          unit: 'metric',
        },
        {
          onSuccess: data => {
            setCurrentWeather(data);
          },
          onSettled: () => {
            setIsLoading(false);
          },
        },
      );
    },
    [getWeather, t],
  );

  const handleChangeWeather = useCallback(
    (weather: Weather) => {
      setCurrentWeather(weather);
    },
    [setCurrentWeather],
  );

  useEffect(() => {
    handleGetWeather(weatherConfig.location.default);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        isWeatherLoading: isLoading,
        handleGetWeather,
        changeWeather: handleChangeWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider };
