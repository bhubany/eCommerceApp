import {useIsFocused} from '@react-navigation/native';
import {COLORS} from 'common/enums';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {LoaderContainer} from './loaderStyle';

const InfinityIcon = ({color = COLORS.PRIMARY, size = 100}) => (
  <MaterialIcons name="all-inclusive" size={size} color={color} />
);

const Loader = () => {
  const colors = [COLORS.BLUE, '#ffffff', COLORS.PRIMARY];
  const rotation = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotation.setValue(0);
    }
  }, [isFocused, rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const circleColor = rotation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: colors,
  });

  return (
    <LoaderContainer>
      <Animated.View
        style={[
          circleStyles.circle,
          {
            transform: [{rotate: spin}],
            borderColor: circleColor,
          },
        ]}
      />
      <InfinityIcon />
    </LoaderContainer>
  );
};

export default Loader;

const circleStyles = StyleSheet.create({
  circle: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 10,
    padding: 30,
    borderStyle: 'dotted',
    borderColor: COLORS.WHITE,
    position: 'absolute',
  },
});
