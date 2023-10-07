import React from "react";
import { Button, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from '../redux/slices/UserSlice';
import { useNavigation } from "@react-navigation/native";


function Profile() {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const handleLogout = () => {
        dispatch(logout());
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    };

    return (
        <View>
            <Text>{user.name}</Text>
            <Button onPress={handleLogout} title="Logout" color="#841584" />
        </View>
    );
}

export default Profile;
