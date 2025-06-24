import { Button } from '@/components/ui/button';
import { weatherConfig } from '@/features/weather/config';
import LoaderLayout from '@/layouts/loader';
import { cn } from '@/lib/utils';
import { useWeather } from '../hooks';

const WeatherPanel: React.FC = () => {
  const { currentWeather, changeWeather, isWeatherLoading } = useWeather();

  const weatherButtons = weatherConfig.types.map(weatherType => (
    <Button
      key={`weather-button-${weatherType.id}`}
      variant="outline"
      className={cn(
        'mt-auto bg-gray-100 hover:bg-gray-400 !h-auto !p-2 rounded',
        weatherType.id === currentWeather?.type ? 'bg-gray-400' : '',
      )}
      onClick={() => {
        changeWeather({
          ...currentWeather,
          type: weatherType.id,
        });
      }}
    >
      <weatherType.Icon size={16} />
    </Button>
  ));

  return (
    <div className="rounded border-3 bg-white px-2 py-1 min-w-[140px]">
      <LoaderLayout size="xs" className="p-2" isLoading={isWeatherLoading}>
        <div className="flex items-center gap-x-2">{weatherButtons}</div>
      </LoaderLayout>
    </div>
  );
};

export default WeatherPanel;
