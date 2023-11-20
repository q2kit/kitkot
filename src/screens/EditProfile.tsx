import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { EDIT_PROFILE_URL } from "../config";
import DocumentPicker from 'react-native-document-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setUser } from '../redux/slices/UserSlice';
import axios from "axios";

export default function Profile({ navigation }) {
  const user = useAppSelector(state => state.user);
  const [avatar, setAvatar] = useState({
    uri: '',
    type: '',
    name: '',
    size: '',
  });
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const dispatch = useAppDispatch();

  const changeAvatar = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setAvatar(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const saveChanges = () => {
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    const fd = new FormData();
    if (avatar.uri) {
      fd.append('avatar', avatar);
    }
    fd.append('name', name);
    fd.append('username', username);
    fd.append('email', email);
    fd.append('password', password);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.accessToken}`,
      },
    };
    axios.post(EDIT_PROFILE_URL, fd, config)
      .then((res) => {
        dispatch(setUser({
          name: res.data.user.name,
          username: res.data.user.username,
          email: res.data.user.email,
          avatar: res.data.user.avatar,
        }));
        navigation.goBack();
      })
      .catch((err) => {
        if (err.response.data.name) {
          setNameError(err.response.data.name);
        } else if (err.response.data.username) {
          setUsernameError(err.response.data.username);
        } else if (err.response.data.email) {
          setEmailError(err.response.data.email);
        } else if (err.response.data.password) {
          setPasswordError(err.response.data.password);
        }
      });
  };

  return (
    <View style={styles.background}>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Pressable
            onPress={changeAvatar}
          >
            <Image
              source={{ uri: avatar.uri || user.avatar }}
              style={styles.avatar}
            />
          </Pressable>
          <View style={styles.stats}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              value={name}
              style={styles.input}
              placeholder={user.name}
              autoCapitalize="words"
              onChangeText={(text) => {
                setName(text)
                setNameError(null)
              }}
            />
            <Text style={[styles.error, { opacity: nameError ? 1 : 0 }]}>
              {nameError}
            </Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={username}
              style={styles.input}
              placeholder={user.username}
              autoCapitalize="none"
              onChangeText={(text) => {
                setUsername(text)
                setUsernameError(null)
              }}
            />
            <Text style={[styles.error, { opacity: usernameError ? 1 : 0 }]}>
              {usernameError}
            </Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              style={styles.input}
              placeholder={user.email}
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text)
                setEmailError(null)
              }}
            />
            <Text style={[styles.error, { opacity: emailError ? 1 : 0 }]}>
              {emailError}
            </Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter your password to save"
              autoCapitalize="none"
              onChangeText={(text) => {
                setPassword(text)
                setPasswordError(null)
              }}
            />
            <Text style={[styles.error, { opacity: passwordError ? 1 : 0 }]}>
              {passwordError}
            </Text>
          </View>
          <Pressable
            style={styles.saveButton}
            onPress={saveChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    color: '#000',
  },
  avatar: {
    marginTop: 50,
    width: 150,
    height: 150,
    marginLeft: '50%',
    transform: [{ translateX: -75 }],
    borderRadius: 100,
    marginBottom: 20,
  },
  stats: {
    marginLeft: '10%',
    width: '80%',
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    paddingBottom: 5,
    color: '#fff',
  },
  input: {
    color: '#fff',
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
  },
  error: {
    color: 'red',
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: 150,
    marginLeft: '50%',
    transform: [{ translateX: -75 }],
    padding: 10,
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
