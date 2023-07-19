module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: false,
        ssr: false,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
