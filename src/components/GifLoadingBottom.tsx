import React from 'react';
import { Image, StyleSheet, View } from "react-native";

export default function GifLoadingBottom({ visible, style }) {
  return (
    <View style={[styles.loading, { display: visible ? 'flex' : 'none' }, style]}>
      <Image
        source={require('../assets/loading-line.gif')}
        style={{ width: 35, height: 8 }}
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