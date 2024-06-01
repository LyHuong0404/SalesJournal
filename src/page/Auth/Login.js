import { Text, View, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { TextInput, Button, DefaultTheme } from "react-native-paper";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { getCodeForgotPassword } from "../../actions/authActions";
import { login } from "../../actions/authActions";
import LoadingSpinner from "../../components/LoadingSpinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addNotifyToken } from "../../actions/otherActions";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#888888', 
    },
};

function Login() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const username = route.params?.username || '';
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);


    const onChangePassword = text => setPassword(text);
    const onToggleHidePassword = () => setHidePassword(!hidePassword);

    const handleGetCodeForgotPassword = async() => {
        try {
            if (username) {
                const response = await getCodeForgotPassword({username});
                if (response?.code == 0) {
                    const isForgotPw = true;
                    navigation.navigate("OTP", { username, isForgotPw });
                }
            }
        } catch(err) {
            console.log(err)
        }
    }

    const handleLogin = async() => {
        setLoading(true);
        try {
            const notifyToken = await AsyncStorage.getItem('notifyToken')
            const response = await dispatch(login({ username, password, notifyToken, provider: 'LOCAL' }));
            if (response) {      
                if (response?.payload?.user?.profile) {
                    if (response?.payload?.roles?.some((item) => item == 'ROLE_ADMIN')) {
                        navigation.navigate('AdminNav');
                    } else navigation.navigate('VendorNav');              
                } else {
                    navigation.navigate('ProfileUser');              
                }
            } else {
                ToastAndroid.show('Mật khẩu không đúng, vui lòng nhập lại!', ToastAndroid.SHORT);
            }
            setLoading(false);
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Mật khẩu không đúng, vui lòng nhập lại!', ToastAndroid.SHORT);
        }
    };

    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nhập</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#15803D' }}> mật khẩu</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                <Text style={{ fontSize: 12, color: '#7a7a7a', fontWeight: '500' }}>Đăng nhập tài khoản </Text>
                <Text style={{ fontSize: 12, color: '#7a7a7a', fontWeight: 'bold' }}>{username}</Text>
            </View>

            <View style={{ flex: 1 }}>            
                <View style={{ marginTop: 60}}>
                    <TextInput
                        theme={theme}
                        autoFocus
                        secureTextEntry={hidePassword}
                        style={{ height: 40, backgroundColor: 'transparent', paddingHorizontal: 0, fontSize: 14 }}
                        placeholderTextColor='#abaaaa'
                        right={<TextInput.Icon icon={hidePassword ? "eye-off" : "eye"} onPress={onToggleHidePassword}/>}
                        value={password}
                        onChangeText={onChangePassword}
                    />
                    <TouchableOpacity>
                        <Text style={{ color: '#2083c5', fontSize: 12, marginVertical: 10 }} onPress={handleGetCodeForgotPassword}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View> 
            </View>

            <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#f2f2f5', backgroundColor: '#ffffff'}}>
                <Button disabled={password == ''} mode="contained" onPress={handleLogin} buttonColor="#15803D" style={{ borderRadius: 7, paddingHorizontal: 20 }}>
                    Đăng nhập
                </Button>
            </View>
            {loading && <LoadingSpinner />}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15, 
        backgroundColor: '#fbfdff',
    },
})

export default Login;