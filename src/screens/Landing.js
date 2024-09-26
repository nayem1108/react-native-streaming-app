// SplashScreen.js
import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import images from '../constrants/images';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={images.LoadedMediaIcon} // Replace with your logo path
                style={styles.logo}
            />
            <ActivityIndicator size="small" color="#0b7def" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Dark background color
    },
    logo: {
        width: 65, // Adjust width and height as needed
        height: 65,
    },
    loadingText: {
        color: '#fff', // White text color
        marginTop: 20,
        fontSize: 16,
    },
});

export default SplashScreen;
