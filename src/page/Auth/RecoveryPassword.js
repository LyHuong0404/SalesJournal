import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import { recoverPassword } from "../../actions/authActions";
import ButtonCustom from "../../components/ButtonCustom";
import PasswordInput from "../../components/PasswordInput";
import { HelperText } from "react-native-paper";


function RecoveryPassword() {
    const navigation = useNavigation();
    const route = useRoute();
    const username = route.params?.username;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const passwordRef = useRef(null); 

    const handleRecoverPassword = async() =>{
        try {
            const fetchApi = await recoverPassword({username, newPassword});
            if (fetchApi?.code == 0) {
                ToastAndroid.show('Đổi mật khẩu thành công, vui lòng đăng nhập lại', ToastAndroid.SHORT);
                navigation.navigate("UsernameInput");
            } else {
                ToastAndroid.show('Đổi mật khẩu thất bại', ToastAndroid.SHORT);
            }
        } catch(err) {
            ToastAndroid.show('Thất bại!', ToastAndroid.SHORT);
        }
     }
    
    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
            </TouchableOpacity>
            <ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#15803D' }}>Tạo lại</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}> mật khẩu</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ fontSize: 12, color: '#7a7a7a' }}>Tên tài khoản </Text>
                    <Text style={{ fontSize: 12, color: '#7a7a7a', fontWeight: 'bold' }}>lyhuong</Text>
                </View>
    
                <View style={{ flex: 1, marginTop: 60 }}>            
                    <PasswordInput 
                        label="Mật khẩu" 
                        checkInput={true} 
                        ref={passwordRef}
                        value={password}
                        isHide={hidePassword} 
                        onPress={() => setHidePassword(!hidePassword)}
                        onChange={(text) => setPassword(text)} />
      
                    <PasswordInput 
                        label="Nhập lại mật khẩu" 
                        value={confirmPassword}
                        isHide={hideConfirmPassword} 
                        onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                        onChange={(text) => setConfirmPassword(text)} />    
    
                    {password != confirmPassword && confirmPassword.trim() != '' ? 
                        <HelperText type="error" visible={true} style={{ marginLeft: -10 }}>
                            Mật khẩu không khớp.
                        </HelperText> : null}           
                </View>
            </ScrollView> 
            <ButtonCustom 
                disabled={passwordRef.current?.hasErrors() || confirmPassword == '' || password != confirmPassword} 
                onPress={handleRecoverPassword} 
                title="Hoàn tất">
            </ButtonCustom>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        paddingHorizontal: 15, 
        backgroundColor: '#fbfdff',
    },
})

export default RecoveryPassword;