import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import images from '../../constrants/images';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    // Validation schema for Formik using Yup
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
        confirmation_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        dateOfBirth: Yup.string(),
        gender: Yup.string(),
    });

    const handleLogin = () => {
        navigation.replace('Login');
    };

    const handleRegister = (values) => {
        setLoading(true);
        // Simulate an API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert('', `email: ${values.email}`);
            navigation.replace('Home');
        }, 2000); // Simulate a 2-second API call
    };

    return (
        <Formik
            initialValues={{ email: '', password: '', firstname: '', lastname: '', confirmation_password: '', dateOfBirth: '', gender: '' }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Image source={images.LoadedMediaIcon} style={styles.logo} />
                    <Text style={styles.title}>Sign Up</Text>

                    {/* Name field */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                placeholderTextColor="gray"
                                onChangeText={handleChange('firstname')}
                                onBlur={handleBlur('firstname')}
                                value={values.firstname}
                            />
                            {touched.firstname && errors.firstname && (
                                <Text style={styles.errorText}>{errors.firstname}</Text>
                            )}
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                placeholderTextColor="gray"
                                onChangeText={handleChange('lastname')}
                                onBlur={handleBlur('lastname')}
                                value={values.lastname}
                            />
                            {touched.lastname && errors.lastname && (
                                <Text style={styles.errorText}>{errors.lastname}</Text>
                            )}
                        </View>
                    </View>

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

                    {/* Confirm Password */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                placeholderTextColor="gray"
                                secureTextEntry
                                onChangeText={handleChange('confirmation_password')}
                                onBlur={handleBlur('confirmation_password')}
                                value={values.confirmation_password}
                            />
                            {touched.confirmation_password && errors.confirmation_password && (
                                <Text style={styles.errorText}>{errors.confirmation_password}</Text>
                            )}
                        </View>
                    </View>

                    {/* Sign up button */}
                    <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#0b7def" />
                        ) : (
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.socialText}>Or Sign Up with</Text>

                    <View style={styles.socialContainer}>
                        <TouchableOpacity onPress={() => { }} style={styles.socialButton}>
                            <View style={styles.flex}>
                                <Image source={images.GoogleIcon} style={styles.socialIcon} />
                                <Text style={styles.socialButtonText}>Sign in with Google</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={styles.socialButton}>
                            <View style={styles.flex}>
                                <Image source={images.AppleIcon} style={styles.socialIcon} />
                                <Text style={styles.socialButtonText}>Sign in with Apple</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Already have an account?</Text>
                        <TouchableOpacity onPress={handleLogin} style={styles.signupButton}>
                            <Text style={styles.signupButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
        </Formik >
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
        width: 65,
        height: 65,
    },
    title: {
        color: '#0b7def',
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
        backgroundColor: '#0b7def',
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
        color: '#fff',
        marginVertical: 20,
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
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    socialIcon: {
        width: 25,
        height: 25,
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

export default RegisterScreen;
