import React from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import useSettingsViewModel, { NewsCategory } from '../viewModel/useSettingViewModel';
import styles from './styles/SettingdsStyle';

const allCategories: NewsCategory[] = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

const SettingsScreen = () => {
  const {
    unit,
    selectedCategories,
    toggleCategory,
    changeUnit,
    savePreferences,
  } = useSettingsViewModel();

  const isCelsius = unit === 'celsius';

  return (
    <View style={styles.container}>
      {/* Temperature Unit Toggle */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Temperature Unit</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Celsius / Fahrenheit</Text>
          <Switch
            value={isCelsius}
            onValueChange={(value) =>
              changeUnit(value ? 'celsius' : 'fahrenheit')
            }
          />
        </View>
      </View>

      {/* News Categories Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>News Categories</Text>
        <FlatList
          data={allCategories}
          keyExtractor={(item) => item}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const isSelected = selectedCategories.includes(item);
            return (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  isSelected && styles.categoryItemSelected,
                ]}
                onPress={() => toggleCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={savePreferences}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
