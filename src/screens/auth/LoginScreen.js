import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import images from '../../constrants/images';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Login from '../../api/Login';


const LoginScreen = () => {
    const navigation = useNavigation();


    const [loading, setLoading] = useState(false);

    // Validation schema for Formik using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    });

    const handleRegister = () => {
        navigation.replace('Register');
    };
    // const handleLogin = async (values) => {
    //     setLoading(true);
    //     try {
    //         const data = await Login(values.email, values.password);
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    //     // setTimeout(() => {
    //     //     setLoading(false);
    //     //     Alert.alert('Login Success', `email: ${values.email}`);
    //     //     // router.replace('/home');
    //     //     navigation.replace('Home');
    //     // }, 2000); // Simulate a 2-second API call
    // };

    const handleLogin = async (values) => {
        setLoading(true);
        // try {
        //     const success = await Login(values.email, values.password);
        //     if (success) {
        //         navigation.replace('Home'); // Navigate on success
        //     }
        // } catch (error) {
        //     console.error(error);
        // } finally {
        //     setLoading(false);
        // }
        setTimeout(async () => {
            try {
                const success = await Login(values.email, values.password);
                if (success) {
                    navigation.navigate('TabNav', {
                        screen: 'Home',
                        params: [],
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 2000);
    };
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => { handleLogin(values); }}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Image source={images.LoadedMediaIcon} style={styles.logo} />
                    <Text style={styles.title}>Sign In</Text>

                    {/* Email Address */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email address"
                                placeholderTextColor="gray"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {touched.email && errors.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}
                        </View>
                    </View>

                    {/* Password field */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry
                                placeholderTextColor="gray"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            {touched.password && errors.password && (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            )}
                        </View>
                    </View>

                    {/* Sign in button */}
                    <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} style={styles.button} disabled={loading}>
                        {
                            loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Sign In</Text>
                            )
                        }
                    </TouchableOpacity>

                    <Text style={styles.socialText}>Or Sign In with</Text>

                    <View style={styles.socialContainer}>
                        <TouchableOpacity onPress={() => { }} style={styles.socialButton}>
                            <View style={styles.flex}>
                                <Image source={images.GoogleIcon} style={styles.socialIcon} />
                                <Text style={styles.socialButtonText}>
                                    Sign in with Google
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={styles.socialButton}>
                            <View style={styles.flex}>
                                <Image source={images.AppleIcon} style={[styles.socialIcon, styles.marginEnd5]} />
                                <Text style={styles.socialButtonText}>Sign in with Apple</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>
                            Not registered yet?
                        </Text>
                        <TouchableOpacity onPress={() => { handleRegister(); }} style={styles.signupButton}>
                            <Text style={styles.signupButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00031c', // Dark background
        paddingHorizontal: 20,
    },
    logo: {
        width: 65, // Adjust width as needed
        height: 65, // Adjust height as needed
        // marginBottom: 20,
    },
    title: {
        color: '#0b7def', // White text
        fontSize: 20,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    inputGroup: {
        width: '100%',
        flexDirection: 'row',
        gap: 5,
        marginBottom: 5,
    },
    inputWrapper: {
        flex: 1,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#1C1C1C',
        borderRadius: 10,
        paddingHorizontal: 15,
        color: 'white',
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 5,
    },
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
    socialText: {
        color: 'white', // White text for the social sign-in text
        marginVertical: 20,
        fontSize: 15,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    socialButton: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#101329',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 5, // Adjust padding if needed
        flexDirection: 'row', // Ensure horizontal alignment of icon and text
        justifyContent: 'center',
    },
    socialButtonText: {
        color: 'white',
        fontSize: 15,
        marginLeft: 10, // Adds space between icon and text
    },
    socialIcon: {
        width: 25, // Adjust width as needed
        height: 25, // Adjust height as needed
    },
    marginEnd5: {
        marginRight: 5, // Add margin to the end of the icon
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    signupText: {
        color: 'white',
        fontSize: 15,
    },
    signupButton: {
        marginLeft: 5,
    },
    signupButtonText: {
        color: '#0b7def',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default LoginScreen;
