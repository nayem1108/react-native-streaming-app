import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigation from './src/nav/AppNavigation';
import SplashScreen from './src/screens/Landing'; // Adjust path if necessary

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState('Landing');

    useEffect(() => {
        // SystemNavigationBar.fullScreen(false); // Exit fullscreen mode
        const checkLoginStatus = async () => {
            try {
                const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
                if (isLoggedIn === 'true') {
                    setInitialRoute('TabNav');
                } else {
                    setInitialRoute('Login');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <View style={styles.container}>
            <AppNavigation initialRoute={initialRoute} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
