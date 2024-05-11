import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Image, TouchableOpacity, Text, ToastAndroid, ScrollView } from 'react-native';
import { Button, TextInput, DefaultTheme, HelperText } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";


import { changePw, updateAvatar, updateProfile } from '../../actions/user/authActions';
import Loading from '../../components/Loading';
import { logout } from '../../actions/authActions';
import ModalConfirmCamera from '../../components/Modal/ModalConfirmCamera';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#c5c6c7', 
    },
};

function ProfileUser() {
    const route = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { user } = useSelector((state) => state.auth);
    const [phone, setPhone] = useState(user?.phone);
    const [fullname, setFullname] = useState(user?.fullname);
    const [loading, setLoading] = useState(false);
    const [dropdownInfo, setDropdownInfo] = useState(false);
    const [dropdownPoint, setDropdownPoint] = useState(false);
    const [dropdownPw, setDropdownPw] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
    const [hideNewPassword, setHideNewPassword] = useState(true);
    const refRBSheet = useRef();

    const handleLogout = () => {
        logout();
        navigation.navigate('UsernameInput');
    }

    const handleUpdateInfo = () => {
        try {
            const fetchAPI = async() => {
                setLoading(true);
                const response = await dispatch(updateProfile({ phone, fullname }));
                if (response?.payload) {
                    ToastAndroid.show('Cập nhật thông tin thành công', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Cập nhật thông tin thất bại', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Cập nhật thông tin thất bại', ToastAndroid.SHORT);
        }
    }
    
    const handleUpdateAvatar = (url) => {
        let imageType = '';
        const lastDotIndex = url.lastIndexOf(".");
        if (lastDotIndex !== -1) {
            imageType = url.substring(lastDotIndex + 1); 
        } else {
            console.log("Không tìm thấy dấu chấm trong chuỗi.");
        }
        const formData = new FormData();
        formData.append('avatarFile', {
            uri: url,
            name: 'image.' + imageType,
            type: 'image/' + imageType,
        });
        try{ 
            const fetchApi = async() => {
                setLoading(true);
                const response = await dispatch(updateAvatar(formData));
                if (response?.payload) {
                    ToastAndroid.show('Lưu ảnh đại diện thành công', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Lưu ảnh đại diện thất bại', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchApi();
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Exp: Lưu ảnh đại diện thất bại', ToastAndroid.SHORT);
        }
        refRBSheet?.current.close();
    }

    const handleChangePw = () => {
        try{
            const fetchAPI = async() => {
                setLoading(true);
                const response = await changePw({ currentPassword, newPassword});
                if (response?.code == 0) {
                    setNewPassword('');
                    setCurrentPassword('');
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


    const hasErrors = () => {
        let errors = [];
    
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            errors.push('Mật khẩu phải có ít nhất một kí tự đặc biệt.');
            return errors;
        }
    
        if (!/\d/.test(newPassword)) {
            errors.push('Mật khẩu phải có ít nhất một chữ số.');
            return errors;
        }
    
        if (!/[A-Z]/.test(newPassword)) {
            errors.push('Mật khẩu phải có ít nhất một kí tự viết hoa.');
            return errors;
        }
    
        if (!/[a-z]/.test(newPassword)) {
            errors.push('Mật khẩu phải có ít nhất một kí tự thường.');
            return errors;
        }

        if (newPassword.length < 8) {
            errors.push('Mật khẩu phải có ít nhất 8 kí tự.');
            return errors;
        }
    };


    return (
        <View style={styles.container}>
            <View onPress={() => navigation.goBack()}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: "flex-start", backgroundColor: 'green', height: 'auto', paddingVertical: 12, paddingHorizontal: 15 }}>
                    <Text style={{ flex: 1, color: '#ffffff', textAlign: 'center', fontWeight: 'bold', marginLeft: 10 }}>Tài khoản</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Image source={require('../../assets/images/logout.png')} style={{ width: 20, height: 20, marginRight: 10, tintColor: 'white' }}/>
                    </TouchableOpacity>
                   
                </View>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 15 }}>
                <TouchableOpacity onPress={() => refRBSheet?.current.open()}>
                    <Image source={user?.avatar ? { uri: user?.avatar } : require('../../assets/images/no_image.jpg')} style={styles.avatar}/>
                    <Image source={require('../../assets/images/camera.png')} style={styles.smallImage} />
                </TouchableOpacity>
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 20, marginLeft: 15 }} onPress={() => setDropdownInfo(!dropdownInfo)}>
                    <Text style={{ fontWeight: '600', marginRight: 15 }}>Thông tin cá nhân</Text>
                    {dropdownInfo ? 
                        <Image source={require('../../assets/images/down_arrow.png')} style={{ width: 15, height: 15, objectFit: 'contain', tintColor: '#2083c5' }}/>
                        : <Image source={require('../../assets/images/up_arrow.png')} style={{ width: 15, height: 15, objectFit: 'contain', tintColor: '#2083c5' }}/>
                    }
                </TouchableOpacity>
                
                {dropdownInfo &&
                    <View style={{ flex: 1, paddingHorizontal: 15 }}>
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13 }}
                            mode="outlined"
                            label="Tên tài khoản"
                            placeholder="Tên tài khoản"
                            value={user?.username}
                            disabled
                        />
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 15 }}
                            mode="outlined"
                            label="Email"
                            placeholder="Email"
                            value={user?.email}
                            disabled
                        />
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 15 }}
                            mode="outlined"
                            label="Số điện thoại"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                        />
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 15 }}
                            mode="outlined"
                            label="Họ tên"
                            placeholder="Họ tên"
                            value={fullname}
                            onChangeText={(text) => setFullname(text)}
                        />
                        <View style={{ alignSelf: 'flex-end', marginTop: 15 }}>
                            <Button 
                                mode="contained" 
                                buttonColor="#15803D" 
                                style={{ borderRadius: 7 }}
                                onPress={handleUpdateInfo}>
                                Cập nhật
                            </Button>
                        </View>
        
                    </View>
                }

                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 20, marginLeft: 15 }} onPress={() => setDropdownPoint(!dropdownPoint)}>
                    <Text style={{ fontWeight: '600', marginRight: 55 }}>Điểm tích lũy</Text>
                    {dropdownPoint ? 
                        <Image source={require('../../assets/images/down_arrow.png')} style={{ width: 15, height: 15, objectFit: 'contain', tintColor: '#2083c5' }}/>
                        : <Image source={require('../../assets/images/up_arrow.png')} style={{ width: 15, height: 15, objectFit: 'contain', tintColor: '#2083c5' }}/>
                    }
                </TouchableOpacity>
                
                {dropdownPoint &&
                    <View style={{ flex: 1, paddingHorizontal: 15 }}>
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13 }}
                            mode="outlined"
                            label="Tên tài khoản"
                            placeholder="Tên tài khoản"
                            value={user?.username}
                            disabled
                        />
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 15 }}
                            mode="outlined"
                            label="Email"
                            placeholder="Email"
                            value={user?.email}
                            disabled
                        />
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 15 }}
                            mode="outlined"
                            label="Số điện thoại"
                            placeholder="Số điện thoại"
                            value={user?.phone}
                            onChangeText={(text) => setPhone(text)}
                        />
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 15 }}
                            mode="outlined"
                            label="Họ tên"
                            placeholder="Họ tên"
                            value={user?.fullname}
                            onChangeText={(text) => setFullname(text)}
                        />
                        <View style={{ alignSelf: 'flex-end', marginTop: 15 }}>
                            <Button 
                                mode="contained" 
                                buttonColor="#15803D" 
                                style={{ borderRadius: 7 }}
                                >
                                Cập nhật
                            </Button>
                        </View>
        
                    </View>
                }

                <View style={{ paddingHorizontal: 15 }}>
                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20 }} onPress={() => setDropdownPw(!dropdownPw)}>
                        <Text style={{ fontWeight: '600', marginRight: 55 }}>Đổi mật khẩu</Text>
                        {dropdownPw ? 
                            <Image source={require('../../assets/images/down_arrow.png')} style={{ width: 15, height: 15, objectFit: 'contain', tintColor: '#2083c5' }}/>
                            : <Image source={require('../../assets/images/up_arrow.png')} style={{ width: 15, height: 15, objectFit: 'contain', tintColor: '#2083c5' }}/>
                        }
                    </TouchableOpacity>
                    {dropdownPw && <>
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 10 }}
                            mode="outlined"
                            label="Mật khẩu hiện tại"
                            value={currentPassword}
                            onChangeText={(text) => setCurrentPassword(text)}
                            secureTextEntry={hideCurrentPassword}
                            right={<TextInput.Icon icon={hideCurrentPassword ? "eye-off" : "eye"} onPress={() => setHideCurrentPassword(!hideCurrentPassword)}/>}
                        />
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 10 }}
                            mode="outlined"
                            label="Mật khẩu mới"
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                            secureTextEntry={hideNewPassword}
                            right={<TextInput.Icon icon={hideNewPassword ? "eye-off" : "eye"} onPress={() => setHideNewPassword(!hideNewPassword)}/>}
                        />
                        {newPassword?.trim() != '' ? 
                            hasErrors()?.map((error, index) => (
                                <HelperText type="error" key={index} visible={true} style={{ marginLeft: -10 }}>
                                    {error}
                                </HelperText>
                            )) : null 
                        }

                    <View style={{ alignSelf: 'flex-end', marginTop: 15 }}>
                        <Button 
                            disabled={!newPassword || !currentPassword || hasErrors()}
                            mode="contained" 
                            buttonColor="#15803D" 
                            style={{ borderRadius: 7 }}
                            onPress={handleChangePw}>
                            Cập nhật
                        </Button>
                    </View>
                </>}
                </View>
            </ScrollView>
            <View style={{ margin: 15 }}>
                <Button 
                    mode="outlined" 
                    textColor='#15803D' 
                    buttonColor="transparent" 
                    style={{ borderRadius: 7, borderColor: '#15803D' }}
                    onPress={() => navigation.navigate('RegisterStore')}>
                    Đăng ký cửa hàng
                </Button>
            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: 
                    {
                        backgroundColor: "rgba(100, 100, 100, 0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: "grey"
                    },
                    container: {
                        height: 140,
                        backgroundColor: '#3a3a3a',
                    }
                }}
            >
                <ModalConfirmCamera onUpdateAvatar={handleUpdateAvatar} onClose={() => refRBSheet?.current.close()}/>
            </RBSheet>
            {loading && <Loading />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
    avatar: {
        alignSelf: 'center',
        width: '33%',
        height: 130,
        borderRadius: 100,
        marginVertical: 20,
        objectFit: 'contain',
        backgroundColor: '#dad6d6'
    },
    smallImage: {
        position: 'absolute',
        bottom: 20,
        right: 140,
        width: 35,
        height: 35,
    },
})

export default ProfileUser;