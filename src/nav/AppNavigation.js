import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/tabs/home/HomeScreen';
import SplashScreen from '../screens/Landing';
import TabNav from './TabNav';
import VideoPlayer from '../screens/VideoPlayer';

const Stack = createNativeStackNavigator();

const AppNavigation = ({ initialRoute }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Landing" component={SplashScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="TabNav" component={TabNav} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Player" component={VideoPlayer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
