import { useTranslations } from 'next-intl';
import DynamicImage from '@/components/dynamic-image';
import { weatherConfig } from '@/features/weather/config';
import { useWeather } from '../hooks';

const WeatherTemperature: React.FC = () => {
  const t = useTranslations('weather');

  const { currentWeather } = useWeather();

  if (!currentWeather || !currentWeather.temperature) {
    return null;
  }

  return (
    <div className="flex gap-x-1">
      <div>
        <DynamicImage
          src={
            weatherConfig.temperature[currentWeather?.temperature?.range]
              ?.resource
          }
          alt="thermometer"
          width={20}
          height={40}
        />
      </div>
      <span
        className="text-xl font-bold text-white"
        style={{ fontFamily: 'var(--font-silkscreen)' }}
      >
        {t('metrics.celsius', {
          temperature: currentWeather?.temperature?.value,
        })}
      </span>
    </div>
  );
};

export default WeatherTemperature;
