import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const VideoScreen = () => {
    return (
        <View style={styles.dark}>
            <Text style={styles.light}>VideoScreen</Text>
        </View>
    );
};

export default VideoScreen;

const styles = StyleSheet.create({
    dark: {
        backgroundColor: '#00031c',
    },
    light: {
        color: '#fff',
    },
})
    ;
