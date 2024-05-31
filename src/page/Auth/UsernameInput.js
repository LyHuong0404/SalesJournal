import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, StyleSheet, Text, Image, ToastAndroid, Pressable } from "react-native";
import { Button, TextInput, DefaultTheme  } from "react-native-paper";
import { getCodeSignUp, login } from "../../actions/authActions";
import LoadingSpinner from "../../components/LoadingSpinner";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
GoogleSignin.configure({
    androidClientId: "189009872460-nscokuhej0rl0r7bmp88uvepju447b7k.apps.googleusercontent.com",
    iosClientId: "189009872460-ku6g1br9kvg4jv1hvl8hvfugk9goub9r.apps.googleusercontent.com",
    webClientId: "189009872460-90ubh2bch0p3i3cd0m94r9noep0hc6jt.apps.googleusercontent.com",
	scopes: ['profile', 'email'],
});

const loginGG = async () => {
	await GoogleSignin.hasPlayServices();
	const userInfo = await GoogleSignin.signIn();
	return userInfo;
};

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#888888', 
    },
};

function UsernameInput() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    /* <Google login> */
    const dispatch = useDispatch();
	const apiLogin = async(idToken) => {
        try {
            const notifyToken = await AsyncStorage.getItem('notifyToken')
            const response = await dispatch(login({ notifyToken, idToken, provider: 'GOOGLE' }));
            if (response) {  
                if (response?.payload?.user?.profile) {
                    if (response?.payload?.roles?.some((item) => item == 'ROLE_ADMIN')) {
                        navigation.navigate('AdminNav');
                    } else navigation.navigate('VendorNav');              
                } else {
                    navigation.navigate('ProfileUser');              
                }
                return response.payload;
            } else {
                ToastAndroid.show('Đăng nhập không thành công, vui lòng nhập lại!', ToastAndroid.SHORT);
            }
        } catch(err) {
            ToastAndroid.show('Đăng nhập không thành công, vui lòng nhập lại!', ToastAndroid.SHORT);
        }
    };

	const handleGoogleLogin = async () => {
		try {
			const response = await loginGG();
			const { idToken } = response;
			await apiLogin(idToken);
		} catch (apiError) {
		}
	};
    /* </Google login> */

    const handleNavigation = async() => {
        setLoading(true);
        try{
            const response = await getCodeSignUp({ username });
            if (response?.message == "OTP Sent") {
                navigation.navigate("Register", { username });
            } else {
                navigation.navigate("Login", { username });
            }
            setLoading(false);
        } catch(e){
            setLoading(false);
            ToastAndroid.show('Thất bại!', ToastAndroid.SHORT);
        }
    }

    return ( 
        <View style={styles.container}>
            <View style={{ flex: 1, marginTop: 100}}>
                <Text style={{ color: '#15803D' }}>Nhập tên tài khoản</Text>
                <TextInput
                    style={{ height: 40, backgroundColor: 'transparent', paddingHorizontal: 0, fontSize: 14, marginBottom: 20, paddingVertical: 5, underlineColor: "red" }}
                    placeholder="Ví dụ: nguyena"
                    placeholderTextColor="#abaaaa"
                    right={username ? <TextInput.Icon icon="close-circle-outline" onPress={() => setUsername('') }/> : null} 
                    rippleColor='#15803D'
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    theme={theme}
                />  
       
                <Button disabled={username == ''} mode="contained" 
                        onPress={handleNavigation} 
                        buttonColor="#15803D" style={{ borderRadius: 7, paddingHorizontal: 22 }}>
                    Tiếp tục
                </Button>
                <Pressable onPress={handleGoogleLogin}><Text>Continue with Google</Text></Pressable>
            </View>
            <View style={{ flex: 0.3, alignItems: 'center', marginVertical: 10 }}>
                <Image source={require('../../assets/images/guarantee.png')} style={{ width: 40, height: 40, objectFit: 'contain', marginBottom: 10 }} />
                <Text style={{ marginBottom: 20, fontSize: 11 }}>An toàn & bảo mật 100%</Text>
                <Text style={{ color: '#888888' }}>Bằng việc ấn vào Tiếp tục, bạn đã đồng ý với <Text style={{ color: '#15803D'}}>Điều khoản và Điều kiện sử dụng </Text>của ứng dụng</Text>
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


export default UsernameInput;