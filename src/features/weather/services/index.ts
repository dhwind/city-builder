import weatherApiClient from '@/lib/api/weather-api-client';
import {
  WeatherQueryParams,
  WeatherQueryResponse,
  WeatherUnit,
} from '@/types/weather';
import { generateQueryString } from '@/utils/api';
import { getWeatherType } from '@/utils/weather';

type OpenWeatherForecastParams = {
  q: string;
  appid: string;
  lang?: string;
  units?: WeatherUnit;
};

type OpenWeatherForecastListItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

type OpenWeatherForecastCity = {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type OpenWeatherForecastResponse = {
  cod: 'string';
  message: number;
  cnt: number;
  list: OpenWeatherForecastListItem[];
  city: OpenWeatherForecastCity;
};

const fetchLocationWeather = async (
  params: WeatherQueryParams,
): Promise<WeatherQueryResponse> => {
  try {
    const unit = params.unit || 'standard';
    const openWeatherForecastParams: OpenWeatherForecastParams = {
      q: params.q,
      appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY || '',
      units: unit,
      lang: params.lang,
    };

    const queryString = generateQueryString(openWeatherForecastParams);

    const response = await weatherApiClient.get<OpenWeatherForecastResponse>(
      `/data/2.5/forecast?${queryString}`,
    );

    const responseData = response.data;

    const result: WeatherQueryResponse = {
      temperature: Math.round(responseData.list[0].main.temp),
      weather: getWeatherType(responseData.list[0].weather[0].id),
      unit,
    };

    return result;
  } catch (error) {
    throw new Error(String(error));
  }
};

export { fetchLocationWeather };
