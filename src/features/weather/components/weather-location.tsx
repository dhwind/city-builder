import { useTranslations } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';
import { MousePointerClick } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import SelectDropdown from '@/components/select-dropdown';
import { weatherConfig } from '@/config/weather';
import { Button } from '@/components/ui/button';
import { useWeatherStore } from '@/store/weather';
import LoaderLayout from '@/layouts/loader';
import { useGetLocationWeather } from '../api/use-get-location-weather';

const WeatherLocation: React.FC = () => {
  const t = useTranslations('weather');

  const {
    pending,
    currentLocation,
    simulation,
    setSimulation,
    setCurrentLocation,
    setCurrentWeather,
    setCurrentTemperature,
  } = useWeatherStore(
    useShallow(state => ({
      pending: state.pending,
      currentLocation: state.currentLocation,
      simulation: state.simulation,
      setSimulation: state.setSimulation,
      setCurrentLocation: state.setCurrentLocation,
      setCurrentWeather: state.setCurrentWeather,
      setCurrentTemperature: state.setCurrentTemperature,
    })),
  );

  const [currentCity, setCurrentCity] = useState<string>('');

  const {
    data: weatherData,
    isLoading,
    refetch,
  } = useGetLocationWeather({
    q: currentLocation ? t(`location.${currentLocation}`) : '',
    unit: 'metric',
  });

  const locationItems = weatherConfig.location.items.map(location => ({
    value: location.id,
    label: t(`location.${location.id}`),
  }));

  const handleSelectLocation = useCallback(
    (location: string) => {
      setCurrentCity(location);
    },
    [setCurrentCity],
  );

  const handleGetLocationWeather = useCallback(() => {
    refetch();
    setCurrentLocation(currentCity);
    setSimulation(false);
  }, [currentCity, refetch, setCurrentLocation, setSimulation]);

  useEffect(() => {
    if (!weatherData || simulation) {
      return;
    }

    setCurrentWeather(weatherData.weather);
    setCurrentTemperature(weatherData.temperature);
  }, [setCurrentTemperature, setCurrentWeather, weatherData, simulation]);

  useEffect(() => {
    setCurrentCity(currentLocation);
    setSimulation(false);
  }, [currentLocation, setSimulation, setCurrentCity]);

  return (
    <div className="flex gap-x-2 items-center rounded border-3 bg-white px-2 py-1">
      <div className="text-xs whitespace-nowrap">{t('dropdownLabel')}</div>
      <div className="min-w-[8rem]">
        <LoaderLayout isLoading={pending} size="xs">
          <SelectDropdown
            items={locationItems}
            defaultValue={currentLocation}
            onSelect={handleSelectLocation}
          />
        </LoaderLayout>
      </div>
      <Button
        onClick={handleGetLocationWeather}
        variant="outline"
        className="bg-gray-100 hover:bg-gray-400 !h-auto !p-2 rounded"
      >
        <LoaderLayout isLoading={isLoading} className="p-0" size="xs">
          <MousePointerClick size={16} />
        </LoaderLayout>
      </Button>
    </div>
  );
};

export default WeatherLocation;
