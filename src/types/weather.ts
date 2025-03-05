type Weather = 'rain' | 'snow' | 'clear-sky';

type TimeOfDay = 'day' | 'night';

type WeatherUnit = 'standard' | 'metric' | 'imperial';

type WeatherTemperatureRangeType = 'frozen' | 'low' | 'normal' | 'high' | 'hot';

type WeatherQueryParams = {
  q: string;
  lang?: string;
  unit?: WeatherUnit;
};

type WeatherQueryResponse = {
  temperature: number;
  unit: WeatherUnit;
  weather: Weather;
};

export type {
  Weather,
  WeatherUnit,
  TimeOfDay,
  WeatherTemperatureRangeType,
  WeatherQueryParams,
  WeatherQueryResponse,
};
