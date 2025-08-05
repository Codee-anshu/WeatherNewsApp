import { useState } from 'react';
import { saveNewsCategories, saveTemperatureUnit } from '../utils/Storage';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export type NewsCategory =
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export default function useSettingsViewModel() {
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [selectedCategories, setSelectedCategories] = useState<NewsCategory[]>([]);

  const toggleCategory = (category: NewsCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const changeUnit = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
  };

  const savePreferences = async () => {
    await saveTemperatureUnit(unit);
    await saveNewsCategories(selectedCategories);
    console.log('Preferences saved.');
  };

  return {
    unit,
    selectedCategories,
    toggleCategory,
    changeUnit,
    savePreferences,
  };
}
