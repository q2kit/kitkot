import React from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

export function SwitchSettingItem({ title, state, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#03a5fc' }}
          thumbColor={state ? '#03a5fc' : '#f4f3f4'}
          value={state}
          disabled={true}
        />
      </View>
    </Pressable >
  );
}

export function DetailSettingItem({ title, icon, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <IconButton
          icon={icon}
          iconColor="#fff"
          size={20}
        />
      </View>
    </Pressable >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#303030',
    backgroundColor: '#222222',
    height: 70,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 10,
  },
});