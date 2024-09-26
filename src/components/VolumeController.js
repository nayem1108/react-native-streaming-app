import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import VerticalSlider from 'rn-vertical-slider-matyno';
import icons from '../constrants/icons'; // Ensure the correct path to your icons

const VolumeController = ({ volume, onVolumeChange }) => {


    const handleVolumeChange = (value) => {
        onVolumeChange(value * 100); // Update parent state with volume in 0-100 range
    };

    return (
        <View style={styles.container}>
            <Image
                source={volume === 0 ? icons.mute : icons.volume}
                style={styles.icon}
            />
            <VerticalSlider
                value={volume / 100} // Set to 0 if muted, otherwise scale volume to 0.0-1.0
                min={0}
                max={1}
                step={0.01}
                onChange={handleVolumeChange}
                width={10} // Slightly wider for better usability
                height={100} // Keep your original height
                containerStyle={styles.sliderContainer}
                sliderStyle={styles.slider}
                disabled={false}
                minimumTrackTintColor="#bed2e6"
                maximumTrackTintColor="#b6b6b8"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '15%',
        height: '40%', // Ensure this is a valid percentage
        flexDirection: 'column',
        gap: 10,
        position: 'absolute',
        bottom: 120,
        right: 40,
        alignItems: 'center', // Center content horizontally
    },
    icon: {
        width: 15,
        height: 15,
        tintColor: '#bed2e6',
    },
    sliderContainer: {
        height: 100, // Explicitly set a height to avoid NaN
        justifyContent: 'center', // Center the slider vertically
    },
    slider: {
        height: '100%', // Ensure this is valid
        backgroundColor: '#bed2e6',
    },
});

export default VolumeController;
