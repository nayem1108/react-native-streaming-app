import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const useSession = (user) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        const saveSession = async () => {
            try {
                await AsyncStorage.setItem('isLoggedIn', 'true');
                if (user) {
                    await AsyncStorage.setItem('user', JSON.stringify(user));
                }
                // eslint-disable-next-line no-catch-shadow, no-shadow
            } catch (error) {
                console.log('Error saving login state', error);
                setError(error);
            }
        };

        if (user) {
            saveSession();
        }
    }, [user]);

    return { error };
};

export default useSession;
