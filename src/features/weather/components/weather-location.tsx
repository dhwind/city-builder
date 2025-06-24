import { useTranslations } from 'next-intl';
import { MousePointerClick } from 'lucide-react';
import { useCallback, useState } from 'react';
import SelectDropdown from '@/components/select-dropdown';
import { weatherConfig } from '@/features/weather/config';
import { Button } from '@/components/ui/button';
import LoaderLayout from '@/layouts/loader';
import { useWeather } from '../hooks';
import { LocationCity } from '../types';

const WeatherLocation: React.FC = () => {
  const t = useTranslations('weather');

  const [currentCity, setCurrentCity] = useState<LocationCity>(
    weatherConfig.location.default,
  );

  const { isWeatherLoading, handleGetWeather } = useWeather();

  const locationItems = weatherConfig.location.items.map(location => ({
    value: location.id as string,
    label: t(`location.${location.id}`),
  }));

  const handleSelectLocation = useCallback(
    (location: LocationCity) => {
      setCurrentCity(location);
    },
    [setCurrentCity],
  );

  const handleGetLocationWeather = () => {
    handleGetWeather(currentCity);
  };

  return (
    <div className="flex gap-x-2 items-center rounded border-3 bg-white px-2 py-1">
      <div className="text-xs whitespace-nowrap">{t('dropdownLabel')}</div>
      <div className="min-w-[8rem]">
        <LoaderLayout isLoading={isWeatherLoading} size="xs">
          <SelectDropdown
            items={locationItems}
            defaultValue={currentCity}
            onSelect={value => handleSelectLocation(value as LocationCity)}
          />
        </LoaderLayout>
      </div>
      <Button
        onClick={handleGetLocationWeather}
        variant="outline"
        className="bg-gray-100 hover:bg-gray-400 !h-auto !p-2 rounded"
      >
        <LoaderLayout isLoading={isWeatherLoading} className="p-0" size="xs">
          <MousePointerClick size={16} />
        </LoaderLayout>
      </Button>
    </div>
  );
};

export default WeatherLocation;
