import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useHomeViewModel from '../viewModel/useHomeViewModel';
import type { RootTabParamList } from '../navigation/AppNavigator';
import styles from './styles/HomeScreenStyles';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList>>();
  const { weather, forecast, filteredNews, loading, error } = useHomeViewModel();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Weather</Text>
        <Text>Temperature: {weather?.temperature}°C</Text>
        <Text>Condition: {weather?.condition}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5-Day Forecast</Text>
        {forecast.map((item, index) => (
          <Text key={index}>
            {item.date.split(' ')[0]} - {item.temperature}°C - {item.condition}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>News Based on Weather</Text>
        {filteredNews.length > 0 ? (
          filteredNews.map((article, index) => (
            <TouchableOpacity key={index} onPress={() => Linking.openURL(article.url)}>
              <View style={styles.newsItem}>
                <Text style={styles.newsHeadline}>{article.title}</Text>
                <Text style={styles.newsDescription}>{article.description}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No relevant news articles found.</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsButtonText}>Go to Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;
