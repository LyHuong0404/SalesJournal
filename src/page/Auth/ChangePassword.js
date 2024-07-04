import { useState, useRef } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView, ToastAndroid } from 'react-native';
import { HelperText, TextInput, DefaultTheme } from 'react-native-paper';

import ButtonCustom from '../../components/ButtonCustom';
import PasswordInput from '../../components/PasswordInput';
import { changePw } from '../../actions/user/authActions';
import LoadingSpinner from '../../components/LoadingSpinner';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#888888', 
    },
};


function ChangePassword() {
    const navigation = useNavigation();
    const [focus, setFocus] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
    const [hideNewPassword, setHideNewPassword] = useState(true);
    const [hideConfirmNewPassword, setHideConfirmNewPassword] = useState(true);
    const newPwRef = useRef(null);
    const confirmPwRef = useRef(null);
    const [loading, setLoading] = useState(false);
 
    const handleChangePassword = () => {
        try{
            const fetchAPI = async() => {
                setLoading(true);
                const response = await changePw({ currentPassword, newPassword});
                if (response?.code == 0) {
                    ToastAndroid.show('Thay đổi mật khẩu thành công', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Thay đổi mật khẩu thất bại', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Thay đổi mật khẩu thất bại', ToastAndroid.SHORT);
        }
    }

    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#15803D'  }}>Đổi</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}> mật khẩu</Text>
            </View>

            <ScrollView>
                <View style={{ flex: 1 }}>            
                    <View style={{ marginTop: 40}}>
                        <Text style={{ color: focus ? '#15803D' : '#7a7a7a', fontWeight: '600' }}>Mật khẩu hiện tại<Text style={{color: 'red'}}> *</Text></Text>
                        <TextInput
                            secureTextEntry={hideCurrentPassword}
                            theme={theme}
                            style={styles.input_style}
                            placeholderTextColor='#abaaaa'
                            right={<TextInput.Icon icon={hideCurrentPassword ? "eye-off" : "eye"} onPress={() => setHideCurrentPassword(!hideCurrentPassword)}/>}
                            value={currentPassword}
                            onChangeText={(text) => setCurrentPassword(text)}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                        />

                        <PasswordInput 
                            label="Mật khẩu mới" 
                            checkInput={true} 
                            ref={newPwRef}
                            value={newPassword}
                            isHide={hideNewPassword} 
                            onPress={() => setHideNewPassword(!hideNewPassword)}
                            onChange={(text) => setNewPassword(text)} />

                        <PasswordInput 
                            label="Nhập lại mật khẩu mới" 
                            checkInput={false}
                            ref={confirmPwRef}
                            value={confirmNewPassword}
                            isHide={hideConfirmNewPassword} 
                            onPress={() => setHideConfirmNewPassword(!hideConfirmNewPassword)} 
                            onChange={(text) => setConfirmNewPassword(text)} />

                        {newPassword != confirmNewPassword && confirmNewPassword.trim() != '' ? 
                            <HelperText type="error" visible={true} style={{ marginLeft: -10 }}>
                                Mật khẩu không khớp.
                            </HelperText> : null}
                    </View> 
                </View>
            </ScrollView>

            <ButtonCustom 
                disabled={
                    newPwRef.current?.hasErrors()?.length > 0 ||
                    confirmPwRef.current?.hasErrors()?.length > 0 ||
                    newPassword != confirmNewPassword || 
                    newPassword == ''}
                    onPress={handleChangePassword} 
                    title="Hoàn tất">
            </ButtonCustom>
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
    input_style:{
        height: 40, 
        backgroundColor: 'transparent', 
        paddingHorizontal: 0, 
        fontSize: 14, 
        paddingVertical: 5,
        marginBottom: 20
    },
})

export default ChangePassword;