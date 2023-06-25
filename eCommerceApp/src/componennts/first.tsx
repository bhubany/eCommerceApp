import React from 'react';
import {Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';

export const First = () => {
  const tailwind = useTailwind();

  return <Text style={tailwind('text-blue-600')}>Hello world</Text>;
};
