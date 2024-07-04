import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

function Logout() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const handleLogout = async()  => {
            await dispatch(logout());
            navigation.navigate('UsernameInput');
        }   
        handleLogout();        
    }, []);

    return null; 
};

export default Logout;