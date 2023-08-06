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
  const colors = ['#ff0000', '#00ff00', '#000000ff'];
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
      // Stop the animation when the component is not focused
      rotation.setValue(0);
    }
  }, [isFocused, rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const opacity = rotation.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
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
            opacity,
            borderColor: circleColor,
          },
        ]}
      />
      <InfinityIcon color={COLORS.PRIMARY} />
    </LoaderContainer>
  );
};

export default Loader;

const circleStyles = StyleSheet.create({
  circle: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 20,
    padding: 20,
    borderStyle: 'dotted',
    borderColor: COLORS.WHITE,
    position: 'absolute',
  },
});
