import { WeatherProvider } from '@/features/weather/providers/weather-provider';
import { BuildingsCardsList } from './cards';
import { BuildingsContent } from './content';

const Builder: React.FC = () => {
  return (
    <WeatherProvider>
      <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <BuildingsCardsList />
        <BuildingsContent />
      </div>
    </WeatherProvider>
  );
};

export default Builder;
