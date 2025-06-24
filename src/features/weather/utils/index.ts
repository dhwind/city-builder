import { weatherConfig } from '../config';
import { WeatherType, WeatherTemperatureRangeType } from '../types';

const getWeatherType = (code: number): WeatherType => {
  if (code >= 200 && code < 600) {
    return 'rain';
  } else if (code >= 600 && code < 700) {
    return 'snow';
  } else {
    return 'clear-sky';
  }
};

const temperatureRanges = weatherConfig.temperature;

const getTemperatureRange = (
  temperature: number,
): WeatherTemperatureRangeType => {
  if (temperature <= temperatureRanges.frozen.range.max) {
    return 'frozen';
  } else if (temperature <= temperatureRanges.low.range.max) {
    return 'low';
  } else if (temperature <= temperatureRanges.normal.range.max) {
    return 'normal';
  } else if (temperature <= temperatureRanges.high.range.max) {
    return 'high';
  } else {
    return 'hot';
  }
};

export { getWeatherType, getTemperatureRange };
