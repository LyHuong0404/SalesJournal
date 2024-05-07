import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import Loading from '../components/Loading';

function Logout() {

    const navigation = useNavigation();

    useEffect(() => {
        const logout = async () => {
            await AsyncStorage.removeItem('user');
            navigation.navigate('LoginNav'); 
        }     
        logout();        
    }, []);

    return null; 
};

export default Logout;