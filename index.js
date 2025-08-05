/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-reanimated'; // 👈 this MUST be before gesture-handler and navigation
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
