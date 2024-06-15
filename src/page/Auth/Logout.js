import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Logout() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const logout = async()  => {
            await dispatch(logout());
            navigation.navigate('LoginNav');
        }   
        logout();        
    }, []);

    return null; 
};

export default Logout;