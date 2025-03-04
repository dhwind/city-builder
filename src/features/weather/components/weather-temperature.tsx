import { useShallow } from 'zustand/react/shallow';
import { useTranslations } from 'next-intl';
import { useWeatherStore } from '@/store/weather';
import DynamicImage from '@/components/dynamic-image';
import { weatherConfig } from '@/config/weather';

const WeatherTemperature: React.FC = () => {
  const t = useTranslations('weather');

  const { currentTemperature } = useWeatherStore(
    useShallow(state => ({
      currentTemperature: state.currentTemperature,
    })),
  );

  if (!currentTemperature || !currentTemperature.value) {
    return null;
  }

  return (
    <div className="flex gap-x-1">
      <div>
        <DynamicImage
          src={weatherConfig.temperature[currentTemperature?.range]?.resource}
          alt="thermometer"
          width={20}
          height={60}
        />
      </div>
      <span
        className="text-xl font-bold text-white"
        style={{ fontFamily: 'var(--font-silkscreen)' }}
      >
        {t('metrics.celsius', {
          temperature: currentTemperature?.value,
        })}
      </span>
    </div>
  );
};

export default WeatherTemperature;
