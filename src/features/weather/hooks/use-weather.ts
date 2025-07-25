'use client';

import { useContext } from 'react';
import { WeatherContext } from '../context';

const useWeather = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }

  return context;
};

export { useWeather };
