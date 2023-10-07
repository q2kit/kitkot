import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./BottomTab";
import LoginScreen from "./Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "../redux/hooks";

const Stack = createNativeStackNavigator();


function Main() {
  const user = useAppSelector(state => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user.accessToken ? "BottomTab" : "LoginScreen"}>
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
