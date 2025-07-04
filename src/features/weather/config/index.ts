import { CloudRain, CloudSnow, LucideProps, Sun } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { WeatherType, Weather, LocationCity } from '../types';

type WeatherTypeConfig = {
  id: WeatherType;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

type WeatherTemperatureRange = {
  resource: string;
  range: {
    min: number;
    max: number;
  };
};

type WeatherConfig = {
  types: WeatherTypeConfig[];
  defaultWeather: Weather;
  temperature: {
    frozen: WeatherTemperatureRange;
    low: WeatherTemperatureRange;
    normal: WeatherTemperatureRange;
    high: WeatherTemperatureRange;
    hot: WeatherTemperatureRange;
  };
  location: {
    default: LocationCity;
    items: WeatherLocation[];
  };
};

type WeatherLocation = {
  id: LocationCity;
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
  defaultWeather: {
    temperature: {
      value: 0,
      range: 'normal',
    },
    unit: 'metric',
    type: 'clear-sky',
  },
  temperature: {
    frozen: {
      resource: 'weather/temperature/thermometer-frozen.png',
      range: {
        min: -Infinity,
        max: 0,
      },
    },
    low: {
      resource: 'weather/temperature/thermometer-low.png',
      range: {
        min: 0,
        max: 10,
      },
    },
    normal: {
      resource: 'weather/temperature/thermometer-normal.png',
      range: {
        min: 10,
        max: 20,
      },
    },
    high: {
      resource: 'weather/temperature/thermometer-high.png',
      range: {
        min: 20,
        max: 30,
      },
    },
    hot: {
      resource: 'weather/temperature/thermometer-hot.png',
      range: {
        min: 30,
        max: Infinity,
      },
    },
  },
  location: {
    default: 'london',
    items: [
      {
        id: 'london',
      },
      {
        id: 'sofia',
      },
      {
        id: 'tokyo',
      },
      {
        id: 'newYork',
      },
      {
        id: 'sydney',
      },
      {
        id: 'capeTown',
      },
      {
        id: 'toronto',
      },
      {
        id: 'seattle',
      },
      {
        id: 'vancouver',
      },
      {
        id: 'oslo',
      },
      {
        id: 'reykjavik',
      },
      {
        id: 'melbourne',
      },
      {
        id: 'dublin',
      },
      {
        id: 'edinburgh',
      },
      {
        id: 'bagdad',
      },
      {
        id: 'dubai',
      },
    ],
  },
};

export { weatherConfig };
