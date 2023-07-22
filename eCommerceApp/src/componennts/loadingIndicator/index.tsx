import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
// import infinity from 'icons/infinity.gif';
const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('icons/infinity.gif')}
        style={styles.gifImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifImage: {
    width: 200,
    height: 200,
  },
});

export default LoadingIndicator;
