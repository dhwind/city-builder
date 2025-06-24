import axios from 'axios';

const weatherApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_API_URL,
});

export { weatherApiClient };
