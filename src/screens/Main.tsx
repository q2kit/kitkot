import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './BottomTab';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import Settings from './Settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/hooks';
import ChatDetailModal from '../components/ChatDetailModal';
import SearchResponse from './SearchResponse';

const Stack = createNativeStackNavigator();

export default function Main() {
  const user = useAppSelector(state => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user.accessToken ? 'BottomTab' : 'Login'}>
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatDetailModal"
          component={ChatDetailModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchResponse"
          component={SearchResponse}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
