'use client';

import { WeatherProvider } from '@/features/weather/providers';
import { BuildingsCardsList } from './cards';
import { BuildingsContent } from './content';
import { useDeviceDetection } from '@/hooks';

const Builder: React.FC = () => {
  const { isMobile } = useDeviceDetection();

  return (
    <WeatherProvider>
      <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {!isMobile ? <BuildingsCardsList /> : null}
        <BuildingsContent />
      </div>
    </WeatherProvider>
  );
};

export default Builder;
