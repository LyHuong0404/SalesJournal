import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, ToastAndroid} from "react-native";

import { checkCodeForgotPassword, getCodeForgotPassword, getCodeSignUp } from "../../actions/authActions";
import VerificationCodeInput from "../../components/VerificationCodeInput";
import { checkCodeSignUp, signUp } from "../../actions/authActions";


function OTP() {
    const navigation = useNavigation();
    const route = useRoute();
    const [username, setUsername] = useState(route.params?.username || '');
    const [email, setEmail] = useState(route.params?.email || '');
    const [password, setPassword] = useState(route.params?.password || '');
    const [isForgotPw, setIsForgotPw] = useState(route.params?.isForgotPw || false);
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
            if (isForgotPw) {
                if (username) {
                    const response = await getCodeForgotPassword({ username });
                    if (response?.code == 0) {
                        resetTimer();
                        ToastAndroid.show('Đã gửi mã xác thực', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Lỗi khi gửi mã xác thực', ToastAndroid.SHORT);
                    }
                }
            } else {
                const response = await getCodeSignUp({ username, email });
                if (response?.code == 0) {
                    resetTimer();
                    ToastAndroid.show('Đã gửi mã xác thực', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Lỗi khi gửi mã xác thực', ToastAndroid.SHORT);
                }
            }
        } catch(err) {
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
                    ToastAndroid.show('Mã OTP không hợp lệ', ToastAndroid.SHORT);
                }
            } 
            else if (code.length === 6 && !isForgotPw){
                const response = await checkCodeSignUp({username, code});
                if (response?.code == 0) {
                    const response = await signUp({ username, password, email });
                    if (response?.code == 0) {
                        ToastAndroid.show('Đăng ký thành công, vui lòng đăng nhập lại', ToastAndroid.SHORT);
                        navigation.navigate("UsernameInput");
                    } else {
                        ToastAndroid.show('Mã OTP không hợp lệ', ToastAndroid.SHORT);
                    }
                } else {
                    ToastAndroid.show('Mã OTP không hợp lệ', ToastAndroid.SHORT);
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
        flex: 1,
        paddingHorizontal: 15, 
        backgroundColor: '#f6f7f8',
    },
})

export default OTP;