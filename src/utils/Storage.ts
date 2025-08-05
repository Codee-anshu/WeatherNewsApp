import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsCategory, TemperatureUnit } from '../viewModel/useSettingViewModel';

const UNIT_KEY = 'user_temperature_unit';
const CATEGORY_KEY = 'user_news_categories';

export const saveTemperatureUnit = async (unit: TemperatureUnit) => {
  await AsyncStorage.setItem(UNIT_KEY, unit);
};

export const getTemperatureUnit = async (): Promise<TemperatureUnit> => {
  const stored = await AsyncStorage.getItem(UNIT_KEY);
  return stored === 'fahrenheit' ? 'fahrenheit' : 'celsius';
};

export const saveNewsCategories = async (categories: NewsCategory[]) => {
  await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
};

export const getNewsCategories = async (): Promise<NewsCategory[]> => {
  const stored = await AsyncStorage.getItem(CATEGORY_KEY);
  return stored ? JSON.parse(stored) : [];
};
