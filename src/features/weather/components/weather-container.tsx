import { memo } from 'react';
import { WeatherLocation, WeatherPanel, WeatherTemperature } from '.';

const WeatherContainer: React.FC = () => {
  return (
    <div className="absolute w-full left-0 z-50 p-2">
      <div className="w-full flex gap-2 flex-col-reverse items-start sm:justify-between sm:flex-row">
        <WeatherTemperature />
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
          <WeatherLocation />
          <WeatherPanel />
        </div>
      </div>
    </div>
  );
};

export default memo(WeatherContainer);
