import { useEffect, useState } from 'react';
import WeatherService from '../services/WeatherService';
import NewsService from '../services/NewsService';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getNewsCategories } from '../utils/Storage';

interface IWeatherData {
  temperature: number;
  condition: string;
}

interface IForecastItem {
  date: string;
  temperature: number;
  condition: string;
}

interface INewsItem {
  title: string;
  description: string;
  url: string;
}

export default function useHomeViewModel() {
  const [weather, setWeather] = useState<IWeatherData | null>(null);
  const [forecast, setForecast] = useState<IForecastItem[]>([]);
  const [news, setNews] = useState<INewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.error('Location permission denied');
        }
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const weatherData = await WeatherService.getCurrentWeather(latitude, longitude);
          const forecastData = await WeatherService.getForecast(latitude, longitude);
          const selectedCategories = await getNewsCategories();
          const newsData = await NewsService.getTopHeadlines('india', selectedCategories);

          setWeather(weatherData);
          setForecast(forecastData);
          setNews(newsData);
          setError(null);
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setError('Failed to get location');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const filteredNews = (() => {
    if (!weather) return news;

    const condition = weather.condition.toLowerCase();
    const keywordsMatch = (item: INewsItem, keywords: string[]) => {
      const text = (item.title + ' ' + item.description).toLowerCase();
      return keywords.some((keyword) => text.includes(keyword));
    };

    if (condition.includes('cold')) {
      return news.filter((item) =>
        keywordsMatch(item, ['death', 'crisis', 'loss', 'war', 'depression', 'tragedy'])
      );
    } else if (condition.includes('hot')) {
      return news.filter((item) =>
        keywordsMatch(item, ['attack', 'fear', 'panic', 'threat', 'violence', 'fire'])
      );
    } else if (
      condition.includes('cool') ||
      condition.includes('clear') ||
      condition.includes('sunny')
    ) {
      return news.filter((item) =>
        keywordsMatch(item, ['win', 'success', 'award', 'happy', 'joy', 'celebrate'])
      );
    }

    return news;
  })();

  return {
    weather,
    forecast,
    news,
    filteredNews,
    loading,
    error,
  };
}
