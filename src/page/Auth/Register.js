import { Text, View, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { HelperText, TextInput, DefaultTheme } from "react-native-paper";
import { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getCodeSignUp } from "../../actions/authActions";
import PasswordInput from "../../components/PasswordInput";
import ButtonCustom from "../../components/ButtonCustom";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#888888', 
    },
};

function Register() {
    const navigation = useNavigation();
    const route = useRoute();
    const username = route.params?.username;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [nameStore, setNameStore] = useState('');
    const [email, setEmail] = useState('');
    const passwordRef = useRef(null);

    const onChangePassword = text => setPassword(text);
    const onChangeConfirmPassword = text => setConfirmPassword(text);
    const onChangeNameStore = text => setNameStore(text);
    const onChangeEmail = text => setEmail(text);


    const handleGetCodeSignUp = async() => {
        try{
            const response = await getCodeSignUp({ username, email });
            if (response?.code == 0) {
                navigation.navigate("OTP", { username, email, password });
            } else {
                ToastAndroid.show('Thất bại!', ToastAndroid.SHORT);
            }
        } catch(e){
            ToastAndroid.show('Thất bại!', ToastAndroid.SHORT);
        }
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
      
    return ( 
        <View style={styles.container}>
            {/* <ImageBackground source={require('../assets/images/bg-top-1.png')} style={{ flex: 1 , resizeMode: 'contain' }}> */}
                <View style={{ paddingHorizontal: 15, flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                    </TouchableOpacity>
                    <KeyboardAwareScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        >
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#15803D' }}>Đăng ký </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>tài khoản</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 12, color: '#7a7a7a', fontWeight: '600' }}>Tên tài khoản </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#272c36' }}>{username}</Text>
                        </View>
        
                        <View style={{ flex: 0.7, justifyContent: 'center' }}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ color: '#7a7a7a', fontWeight: '600'}}>Email <Text style={{color: 'red'}}>*</Text></Text>
                                <TextInput
                                    theme={theme}
                                    style={{ paddingVertical: 5, height: 40, backgroundColor: 'transparent', paddingHorizontal: 0, fontSize: 14 }}
                                    placeholder="Ví dụ: vana@gmail.com"
                                    placeholderTextColor='#abaaaa'
                                    value={email}
                                    onChangeText={onChangeEmail}
                                />
                                {email.trim() !== "" && !isValidEmail(email) && (
                                    <HelperText type="error" visible={true} style={{ marginLeft: -10 }}>
                                        Email không hợp lệ.
                                    </HelperText>
                                    )}
                            </View>

                            <PasswordInput 
                                label="Mật khẩu"
                                checkInput={true} 
                                ref={passwordRef}
                                value={password}
                                isHide={hidePassword} 
                                onPress={() => setHidePassword(!hidePassword)} 
                                onChange={onChangePassword} />

                            <PasswordInput 
                                label="Nhập lại mật khẩu"
                                value={confirmPassword}
                                isHide={hideConfirmPassword} 
                                onPress={() => setHideConfirmPassword(!hideConfirmPassword)} 
                                onChange={onChangeConfirmPassword} />

                            {confirmPassword.trim() !== "" && password != confirmPassword && (
                                <HelperText type="error" visible={true} style={{ marginLeft: -10 }}>
                                    Mật khẩu không khớp.
                                </HelperText>
                            )}

                            {/* <Text style={{ fontWeight: '600', marginTop: 20 }}>Thông tin thêm</Text>
        
                            <View style={{ marginVertical: 20}}>
                                <TextInputCustom 
                                    label="Tên cửa hàng"
                                    placeholder="Ví dụ: Cửa hàng tạp hóa"
                                    value={nameStore}
                                    onChange={onChangeNameStore}
                                />
                            </View> */}
                        </View>                  
                    </KeyboardAwareScrollView>
                </View>

                <ButtonCustom 
                    disabled={confirmPassword == '' || passwordRef.current?.hasErrors() || password != confirmPassword} 
                    onPress={handleGetCodeSignUp} 
                    customStyle={{ marginHorizontal: 15 }}
                    title="Đăng ký">
                </ButtonCustom>

            {/* </ImageBackground> */}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fbfdff',
    },
})

export default Register;