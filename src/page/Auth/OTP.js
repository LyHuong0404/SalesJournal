import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid} from "react-native";
import { HelperText, TextInput, DefaultTheme } from "react-native-paper";

import { checkCodeForgotPassword, getCodeForgotPassword } from "../../actions/authActions";
import VerificationCodeInput from "../../components/VerificationCodeInput";
import { checkCodeSignUp, signUp } from "../../actions/authActions";


function OTP() {
    const navigation = useNavigation();
    const route = useRoute();
    const [username, setUsername] = useState(route.params?.username || '');
    const email = route.params?.email || '';
    const password = route.params?.password || '';
    const isForgotPw = route.params?.isForgotPw || false;
    const [OTP, setOTP] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const code = OTP.join('');
        if (code.length == 6) {
            fetchApi(code);
        }
    }, [OTP]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const resetTimer = () => {
        setTimer(60);
    };
    
    const handleSendCodeAgain = async() => {
        try {
            if (username) {
                const response = await getCodeForgotPassword({username});
                if (response?.code == 0) {
                    resetTimer();
                    ToastAndroid.show('Đã gửi mã xác thực', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Lỗi khi gửi mã xác thực', ToastAndroid.SHORT);
                }
            }
        } catch(err) {
            console.log(err)
            ToastAndroid.show('Lỗi khi gửi mã xác thực', ToastAndroid.SHORT);
        }
    }

    const fetchApi = async(code) => {
        try {
            if (isForgotPw) {
                const response = await checkCodeForgotPassword({ username, code})
                if (response?.code === 0) {
                    navigation.navigate("RecoveryPassword", { username});
                } else {
                    ToastAndroid.show('Sai mã OTP', ToastAndroid.SHORT);
                }
            } 
            else if (code.length === 6 && !isForgotPw){
                const response = await checkCodeSignUp({username, code});
                if (response?.code == 0) {
                    await signUp({ username, password, email });
                    ToastAndroid.show('Đăng ký thành công, vui lòng đăng nhập lại', ToastAndroid.SHORT);
                    navigation.navigate("Pro");
                } else {
                    ToastAndroid.show('Sai mã OTP', ToastAndroid.SHORT);
                }
            }
        }catch (err) {
            ToastAndroid.show('Thất bại!', ToastAndroid.SHORT);
        }
    }
    

    return ( 
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
        </TouchableOpacity>
        <View style={{ marginTop: 60 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nhập mã xác thực</Text>
            <Text style={{ fontSize: 12, color: '#575757' }}>Mã xác thực đã được gửi đến Email </Text>
            <Text style={{ fontSize: 12, color: '#575757', fontWeight: 'bold' }}>{email}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', alignItems: 'flex-start', width: '70%' }}>
            <VerificationCodeInput length={6} onCodeChange={(index, value) => setOTP((prevCode) => { prevCode[index] = value; return [...prevCode]; })} />
        </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                {timer > 0 ? <Text style={{ color: '#7a7a7a', fontSize: 10 }}>Gửi lại mã sau <Text style={{ color: '#2083c5', fontSize: 10 }}>{timer > 0 && timer + 's'}</Text></Text> :  <Text style={{ color: '#15803D', fontSize: 10 }} onPress={handleSendCodeAgain}>Gửi lại mã xác thực</Text>}  
                <TouchableOpacity>
                    <Text style={{ color: '#2083c5', fontSize: 10 }} onPress={() => navigation.navigate('UsernameInput')}>Nhập lại tên tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        paddingHorizontal: 15, 
        backgroundColor: '#f6f7f8',
    },
})

export default OTP;