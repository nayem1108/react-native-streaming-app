/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native';
import MovieCard from '../../../components/MovieCard';
import FeaturedMovies from '../../../components/FeatureMovies';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const HomeScreen = () => {


    const navigation = useNavigation();
    // Sample data (replace with real data from an API)
    const movies = [
        { id: 1, title: 'Wheels', image: 'https://www.loadedmedia.com/wp-content/uploads/2024/06/7FQkRsZaF5LYRaRlpiGEbhwOgJ4-288x400.jpg', year: '2012', duration: 107, categories: ['Comedy', 'Horror', 'Drama'] },
        { id: 2, title: 'Bad Boys: Ride or Die', image: 'https://www.loadedmedia.com/wp-content/uploads/2024/06/nP6RliHjxsz4irTKsxe8FRhKZYl-scaled-288x400.jpg', year: '2012', duration: 115, categories: ['Action', 'Comedy', 'Drama'] },
        { id: 3, title: 'The Avengers', image: 'https://www.loadedmedia.com/wp-content/uploads/2024/09/RYMX2wcKCBAr24UyPD7xwmjaTn-scaled-288x400.jpg', year: '2012', duration: 143, categories: ['Action', 'Adventure', 'Sci-Fi'] },
        { id: 4, title: 'Avengers: Infinity War', image: 'https://www.loadedmedia.com/wp-content/uploads/2024/08/7WsyChQLEftFiDOVTGkv3hFpyyt-scaled-288x400.jpg', year: '2012', duration: 149, categories: ['Action', 'Adventure', 'Sci-Fi'] },
        { id: 5, title: 'Jenifer\'s Body', image: 'https://www.loadedmedia.com/wp-content/uploads/2024/06/wrkjsGcFJxcQqR56kJUYAEKKg2T-scaled-288x400.jpg', year: '2009', duration: 107, categories: ['Comedy', 'Horror'] },
        { id: 6, title: 'Inside Out 2', image: 'https://www.loadedmedia.com/wp-content/uploads/2024/06/vpnVM9B6NMmQpWeZvzLvDESb2QY-scaled-288x400.jpg', year: '2024', duration: 97, categories: ['Adventure', 'Animation', 'Comedy', 'Drama', 'Family'] },
    ];

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const user = await AsyncStorage.getItem('user');
        if (!isLoggedIn || !user) {
            navigation.navigate('Login');
        } else {
            setTimeout(() => {
                setRefreshing(false);
            }, 2000);
        }
    };



    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={[styles.section, { marginTop: 50 }]}>
                <Text style={styles.sectionTitle}>Features</Text>
                <FeaturedMovies movies={movies} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>New Movies</Text>
                <FlatList
                    data={movies}
                    horizontal
                    renderItem={({ item }) => <MovieCard item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trending Movies</Text>
                <FlatList
                    data={movies}
                    horizontal
                    renderItem={({ item }) => <MovieCard item={item} />}

                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Latest Movies</Text>
                <FlatList
                    data={movies}
                    horizontal
                    renderItem={({ item }) => <MovieCard item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Episodes</Text>
                <FlatList
                    data={movies}
                    horizontal
                    renderItem={({ item }) => <MovieCard item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Dark background
        // backgroundColor: '#fff', // Dark background
        paddingHorizontal: 10,
        borderColor: 'red',
    },
    section: {
        marginVertical: 20,
    },
    sectionTitle: {
        color: '#fff', // White text
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    marginBottom: {
        marginBottom: 30,
    },
});

export default HomeScreen;
