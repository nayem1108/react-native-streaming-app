import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import VerticalSlider from 'rn-vertical-slider-matyno';
import { setBrightnessLevel, getBrightnessLevel } from '@reeq/react-native-device-brightness';
import icons from '../constrants/icons'; // Ensure the correct path to your icons

const BrightnessControl = () => {
    const [brightness, setBrightness] = useState(50); // Default brightness level

    const handleBrightnessChange = (value) => {
        const brightnessValue = value * 100; // Convert from 0.0-1.0 to 0-100
        setBrightness(brightnessValue);
        setBrightnessLevel(value); // Use the value directly
    };

    useEffect(() => {
        const fetchBrightness = async () => {
            try {
                const currentBrightness = await getBrightnessLevel();
                if (currentBrightness !== null && currentBrightness !== undefined) {
                    // Clamp brightness between 0 and 100
                    setBrightness(Math.min(Math.max(currentBrightness * 100, 0), 100));
                }
            } catch (error) {
                console.error('Error fetching brightness:', error);
            }
        };

        fetchBrightness();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={icons.brightness} style={styles.icon} />
            <VerticalSlider
                value={brightness / 100} // Divide by 100 to convert to 0.0-1.0
                min={0}
                max={1}
                step={0.01} // Adjust step to match the slider's range
                onChange={handleBrightnessChange}
                width={10}
                height={100}
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
        left: 40,
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

export default BrightnessControl;
