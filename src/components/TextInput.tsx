import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input, IconButton } from 'react-native-paper'
import { theme } from '../core/theme'


export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      {props.label === 'Password' && (
        <IconButton
          icon={props.secureTextEntry ? require('../assets/eye-off.png') : require('../assets/eye.png')}
          style={styles.icon}
          size={20}
          onPress={props.onIconPress}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    width: '100%',
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  icon: {
    position: 'absolute',
    right: -45,
    top: 8,
  },
})
