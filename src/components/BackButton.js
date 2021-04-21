import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 23,
    left: 18,
    zIndex: 1000,
  },
  image: {
    width: 28,
    height: 28,
  },
});
