import { Weather } from '@/types/weather';

const getWeatherType = (code: number): Weather => {
  if (code >= 200 && code < 600) {
    return 'rain';
  } else if (code >= 600 && code < 700) {
    return 'snow';
  } else {
    return 'clear-sky';
  }
};

export { getWeatherType };
