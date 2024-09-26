import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const SettingsScreen = () => {
    const [loading, setloading] = useState(false);
    const navigation = useNavigation();
    const handleLogout = async () => {
        setloading(true);
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            await AsyncStorage.removeItem('user');
            setTimeout(() => {
                setloading(false);
                navigation.navigate('Login');
            }, 2000);
        } catch (error) {
            Alert.alert('Logout failed', error);
        }

    };
    return (
        <View>
            <TouchableOpacity onPress={handleLogout} activeOpacity={0.8} style={styles.button}>
                <Text style={styles.buttonText}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text>Logout</Text>
                    )}
                </Text>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#0b7def', // Tomato color button
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
export default SettingsScreen; 
