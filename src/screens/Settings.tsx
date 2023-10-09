import React from "react";
import { Button, Text, View, In } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from '../redux/slices/UserSlice';
import TextInput from "../components/TextInput";


export default function Settings({ navigation }) {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View>
            <Button onPress={handleLogout} title="Logout" color="#841584" />
        </View>
    );
}
