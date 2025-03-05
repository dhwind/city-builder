import { useQuery } from '@tanstack/react-query';
import { fetchLocationWeather } from '../services';
import { WeatherQueryParams } from '@/types/weather';

const useGetLocationWeather = ({ q, lang, unit }: WeatherQueryParams) => {
  return useQuery({
    queryKey: ['city-weather', q, unit],
    queryFn: async () => {
      const weatherData = await fetchLocationWeather({ q, lang, unit });

      return weatherData;
    },
  });
};

export { useGetLocationWeather };
