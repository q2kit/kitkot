import React from 'react';
import { Image, StyleSheet, View } from "react-native";

export default function GifLoadingBottom({ visible, size, style }) {
  return (
    <View style={[styles.loading, { display: visible ? 'flex' : 'none' }, style]}>
      <Image
        source={require('../assets/loading.gif')}
        style={{ width: size, height: size }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});