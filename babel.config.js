module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-flow', // 👈 Add this line
  ],
  plugins: [
    ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
    'react-native-reanimated/plugin', // 👈 must be last
  ],
};