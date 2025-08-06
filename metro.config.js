// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(defaultConfig, {
  transformer: {
    babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
  },
  resolver: {
    blockList: [
      /.*\/node_modules\/.*\/node_modules\/react-native\/.*/, // Block nested RN copies
    ],
    sourceExts: [...defaultConfig.resolver.sourceExts],
  },
});
