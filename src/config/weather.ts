import { Weather } from '@/types/weather';
import { Sun, CloudRain, CloudSnow, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type WeatherTypeConfig = {
  id: Weather;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

type WeatherConfig = {
  types: WeatherTypeConfig[];
};

const weatherConfig: WeatherConfig = {
  types: [
    {
      id: 'clear-sky',
      Icon: Sun,
    },
    {
      id: 'rain',
      Icon: CloudRain,
    },
    {
      id: 'snow',
      Icon: CloudSnow,
    },
  ],
};

export { weatherConfig };
