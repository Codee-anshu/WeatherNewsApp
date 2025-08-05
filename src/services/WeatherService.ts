import axios from 'axios';
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from '../constants';

const WeatherService = {
  async getCurrentWeather(lat: number, lon: number) {
    const response = await axios.get(`${OPEN_WEATHER_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: OPEN_WEATHER_API_KEY,
        units: 'metric', // Use 'imperial' for Fahrenheit
      },
    });

    const data = response.data;

    return {
      temperature: data.main.temp,
      condition: data.weather[0].main,
    };
  },

  async getForecast(lat: number, lon: number) {
    const response = await axios.get(`${OPEN_WEATHER_BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: OPEN_WEATHER_API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;

    const dailyForecast = data.list
      .filter((_: any, index: number) => index % 8 === 0) // roughly one per day
      .map((item: any) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        condition: item.weather[0].main,
      }));

    return dailyForecast;
  },
};

export default WeatherService;
