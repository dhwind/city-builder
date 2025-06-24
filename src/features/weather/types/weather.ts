type WeatherType = 'rain' | 'snow' | 'clear-sky';

type TimeOfDay = 'day' | 'night';

type WeatherUnit = 'standard' | 'metric' | 'imperial';

type WeatherTemperatureRangeType = 'frozen' | 'low' | 'normal' | 'high' | 'hot';

type WeatherQueryParams = {
  q: string;
  lang?: string;
  unit?: WeatherUnit;
};

type LocationCity =
  | 'london'
  | 'sofia'
  | 'tokyo'
  | 'newYork'
  | 'sydney'
  | 'capeTown'
  | 'toronto'
  | 'seattle'
  | 'vancouver'
  | 'oslo'
  | 'reykjavik'
  | 'melbourne'
  | 'dublin'
  | 'edinburgh'
  | 'bagdad'
  | 'dubai';

type Weather = {
  temperature: {
    value: number;
    range: WeatherTemperatureRangeType;
  };
  unit: WeatherUnit;
  type: WeatherType;
};

export type {
  Weather,
  WeatherUnit,
  TimeOfDay,
  WeatherTemperatureRangeType,
  WeatherQueryParams,
  WeatherType,
  LocationCity,
};
