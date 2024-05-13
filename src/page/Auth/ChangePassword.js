import { useState, useRef } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView, ToastAndroid } from 'react-native';
import { HelperText } from 'react-native-paper';

import ButtonCustom from '../../components/ButtonCustom';
import PasswordInput from '../../components/PasswordInput';
import { changePw } from '../../actions/user/authActions';
import Loading from '../../components/Loading';


function ChangePassword() {
    const navigation = useNavigation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
    const [hideNewPassword, setHideNewPassword] = useState(true);
    const [hideConfirmNewPassword, setHideConfirmNewPassword] = useState(true);
    const currentPwRef = useRef(null);
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
                        <PasswordInput 
                            label="Mật khẩu hiện tại"
                            checkInput={true} 
                            ref={currentPwRef}
                            value={currentPassword}
                            isHide={hideCurrentPassword} 
                            onPress={() => setHideCurrentPassword(!hideCurrentPassword)} 
                            onChange={(text) => setCurrentPassword(text)} />

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
                disabled={currentPwRef.current?.hasErrors() || 
                    newPwRef.current?.hasErrors() ||
                    confirmPwRef.current?.hasErrors() ||
                    newPassword != confirmNewPassword || 
                    newPassword == ''}
                    onPress={handleChangePassword} 
                    title="Hoàn tất">
            </ButtonCustom>
            {loading && <Loading />}
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

export default ChangePassword;