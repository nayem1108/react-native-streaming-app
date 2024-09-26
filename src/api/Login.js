import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


// Sample users data
const users = [
    {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
    },
    {
        firstname: 'Mr.',
        lastname: 'Admin',
        email: 'admin@lm.com',
        password: 'adminlm',
    },
    {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
    },
];

const Login = async (email, password) => {
    try {
        const user = users.find(
            (item) => item.email === email && item.password === password
        );

        if (user) {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('user', JSON.stringify(user));
            Alert.alert('Login Success', `Welcome ${user.firstname} ${user.lastname}`);
            return true;
        } else {
            Alert.alert('Login Failed', 'Invalid email or password');
            return false;
        }
    } catch (err) {
        console.error('Error during login', err);
        Alert.alert('Login Error', 'An error occurred during login.');
        return false;
    }
};

export default Login;
