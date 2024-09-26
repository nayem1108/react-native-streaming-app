import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/tabs/home/HomeScreen';
import SearchScreen from '../screens/tabs/search/SearchScreen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FSIcons from 'react-native-vector-icons/FontAwesome5';
import MovieScreen from '../screens/tabs/movies/MovieScreen';
import VideoScreen from '../screens/tabs/videos/VideoScreen';
import AccountScreen from '../screens/tabs/account/AccountScreen';

const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#0b7def',
                tabBarInactiveTintColor: '#b1b1b3',
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBar,
                headerShown: false,
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSize = size - 5;
                    size = size - 3;
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                        return <FSIcons name={iconName} color={color} size={focused ? size : iconSize} style={focused ? styles.iconFocused : {}} />;
                    }
                    else if (route.name === 'Movies') {
                        iconName = focused ? 'film' : 'film';
                        return <FSIcons name={iconName} color={color} size={focused ? size : iconSize} style={focused ? styles.iconFocused : {}} />;
                    }
                    else if (route.name === 'Videos') {
                        iconName = focused ? 'play-circle' : 'play-circle'; // Correct FontAwesome5 icon name
                        return <FSIcons name={iconName} color={color} size={focused ? size : iconSize} style={focused ? styles.iconFocused : {}} />;
                    }
                    else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search';
                        return <IonIcons name={iconName} color={color} size={focused ? size : iconSize} style={focused ? styles.iconFocused : {}} />;
                    }
                    else if (route.name === 'Account') {
                        iconName = focused ? 'user-circle' : 'user-circle';
                        iconName = focused ? 'person-outline' : 'person-outline';
                        return <IonIcons name={iconName} color={color} size={focused ? size : iconSize} style={focused ? styles.iconFocused : {}} />;
                        // return <FSIcons name={iconName} color={color} size={focused ? size : iconSize} style={focused ? styles.iconFocused : {}} />;
                    }
                },
            })}
            initialRouteName="Home"
        >
            <Tab.Screen name="Movies" component={MovieScreen} />
            <Tab.Screen name="Videos" component={VideoScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        backgroundColor: '#191C33',
        // backgroundColor: 'blue',
        borderRadius: 1,
        borderColor: '#00031c',
        // height: 100,
        // shadowColor: '#',
        // shadowOffset: { width: 0, height: 10 },
        // shadowOpacity: 0.1,
        // shadowRadius: 10,
        // elevation: 5,
    },
    iconFocused: {
        transform: [{ scale: 1 }],
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
});

export default TabNav;
