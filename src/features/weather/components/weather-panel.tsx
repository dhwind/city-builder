import { Button } from '@/components/ui/button';
import { weatherConfig } from '@/config/weather';
import LoaderLayout from '@/layouts/loader';
import { cn } from '@/lib/utils';
import { useWeatherStore } from '@/store/weather';
import { useShallow } from 'zustand/react/shallow';

const WeatherPanel = () => {
  const { currentWeather, pending, setWeather } = useWeatherStore(
    useShallow(state => ({
      currentWeather: state.currentWeather,
      pending: state.pending,
      setWeather: state.setWeather,
    })),
  );

  const weatherButtons = weatherConfig.types.map(weatherType => (
    <Button
      key={`weather-button-${weatherType.id}`}
      variant="outline"
      className={cn(
        'mt-auto bg-gray-100 hover:bg-gray-400 !h-auto !p-1 rounded',
        weatherType.id === currentWeather ? 'bg-gray-400' : '',
      )}
      onClick={() => setWeather(weatherType.id)}
    >
      <weatherType.Icon size={12} />
    </Button>
  ));
  console.log('here');

  return (
    <div className="rounded border-3 bg-white px-2 py-1">
      <LoaderLayout size="xs" className="p-0" isLoading={pending}>
        <div className="flex items-center gap-x-2">{weatherButtons}</div>
      </LoaderLayout>
    </div>
  );
};

export default WeatherPanel;
