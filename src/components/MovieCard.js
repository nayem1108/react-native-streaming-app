import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import React from 'react';
import icons from '../constrants/icons'; // Ensure the path is correct
import { useNavigation } from '@react-navigation/native';
const MovieCard = ({ item }) => {
    const navigation = useNavigation();
    const play = () => {
        navigation.navigate('Player', { item });
    };
    return (
        <View style={styles.card}>
            {/* Movie Image */}
            <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                onError={() => console.log('Error loading image')}
            />

            {/* Play Button Overlay */}
            <TouchableOpacity style={styles.overlay} activeOpacity={0.7} onPress={() => play()}>
                <Image style={styles.playButton} source={icons.play} />
            </TouchableOpacity>

            {/* Movie Title */}
            <Text style={styles.cardTitle}>{item.title}</Text>

            {/* Movie Year and Duration */}
            <View style={styles.metaData}>
                <Text style={styles.metaText}>{item.year} &middot; {item.duration} mins</Text>
            </View>

            {/* Categories */}
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryText}>
                    {item.categories.join(' • ')}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1C1C2d',
        borderRadius: 10,
        marginRight: 10,
        overflow: 'hidden',
        width: 200,
    },
    cardImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    playButton: {
        width: 40, // Adjust size
        height: 40, // Adjust size
        tintColor: '#b0b6c5', // Optional: colorize the image
    },
    cardTitle: {
        color: 'white',
        textAlign: 'center',
        paddingVertical: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    metaData: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
    },
    metaText: {
        color: '#ddd',
        fontSize: 12,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
    },
    categoryText: {
        color: '#bbb',
        fontSize: 12,
    },
});

export default MovieCard;
