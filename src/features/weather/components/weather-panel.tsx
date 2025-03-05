import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { weatherConfig } from '@/config/weather';
import LoaderLayout from '@/layouts/loader';
import { cn } from '@/lib/utils';
import { useWeatherStore } from '@/store/weather';

const WeatherPanel: React.FC = () => {
  const { currentWeather, pending, setCurrentWeather, setSimulation } =
    useWeatherStore(
      useShallow(state => ({
        currentWeather: state.currentWeather,
        pending: state.pending,
        setCurrentWeather: state.setCurrentWeather,
        setSimulation: state.setSimulation,
      })),
    );

  const weatherButtons = weatherConfig.types.map(weatherType => (
    <Button
      key={`weather-button-${weatherType.id}`}
      variant="outline"
      className={cn(
        'mt-auto bg-gray-100 hover:bg-gray-400 !h-auto !p-2 rounded',
        weatherType.id === currentWeather ? 'bg-gray-400' : '',
      )}
      onClick={() => {
        setCurrentWeather(weatherType.id);
        setSimulation(true);
      }}
    >
      <weatherType.Icon size={16} />
    </Button>
  ));

  return (
    <div className="rounded border-3 bg-white px-2 py-1 min-w-[140px]">
      <LoaderLayout size="xs" className="p-2" isLoading={pending}>
        <div className="flex items-center gap-x-2">{weatherButtons}</div>
      </LoaderLayout>
    </div>
  );
};

export default WeatherPanel;
