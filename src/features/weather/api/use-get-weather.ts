import { useReactQueryMutation } from '@/hooks';
import { useLocale } from 'next-intl';
import { fetchLocationWeather } from '../services';
import { WeatherQueryParams } from '@/features/weather/types/weather';

const useGetWeather = () => {
  const locale = useLocale();

  return useReactQueryMutation({
    queryKeys: ['city-weather', locale],
    mutationFn: async ({ q, lang, unit }: WeatherQueryParams) => {
      const weatherData = await fetchLocationWeather({ q, lang, unit });

      return weatherData;
    },
  });
};

export { useGetWeather };
