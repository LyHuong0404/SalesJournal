import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import { Button, TextInput, DefaultTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { updateAvatar, updateProfile } from '../../actions/user/authActions';
import Loading from '../../components/Loading';
import RBSheet from 'react-native-raw-bottom-sheet';
import ModalConfirmCamera from '../../components/Modal/ModalConfirmCamera';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#c5c6c7', 
    },
};

function Profile() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [phone, setPhone] = useState(user?.phone);
    const [fullname, setFullname] = useState(user?.fullname);
    const [loading, setLoading] = useState(false);
    const refRBSheet = useRef();

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

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: "flex-start", backgroundColor: 'green', height: 'auto', paddingVertical: 12, paddingHorizontal: 15 }}>
                        <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain', tintColor: '#ffffff' }}/>
                        <Text style={{ flex: 1, color: '#ffffff', textAlign: 'center', fontWeight: 'bold', marginLeft: 10 }}>Chỉnh sửa thông tin cá nhân</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => refRBSheet?.current.open()}>
                    <Image source={user?.avatar ? { uri: user?.avatar } : require('../../assets/images/no_image.jpg')} style={styles.avatar}/>
                    <Image source={require('../../assets/images/camera.png')} style={styles.smallImage} />
                </TouchableOpacity>
                <View style={{ paddingHorizontal: 15, flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13 }}
                            mode="outlined"
                            label="Tên tài khoản"
                            value={user.username}
                            disabled
                        />
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 15 }}
                            mode="outlined"
                            label="Email"
                            value={user.email}
                            disabled
                        />
        
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 15 }}
                            mode="outlined"
                            label="Số điện thoại"
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                        />
    
                        <TextInput
                            theme={theme}
                            style={{ fontSize: 13, marginTop: 15 }}
                            mode="outlined"
                            label="Họ tên"
                            value={fullname}
                            onChangeText={(text) => setFullname(text)}
                        />
    
    
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Button 
                            mode="contained" 
                            buttonColor="#15803D" 
                            style={{ borderRadius: 7 }}
                            onPress={handleUpdateInfo}>
                            Cập nhật
                        </Button>
                    </View>
                </View>
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
                <ModalConfirmCamera actor='vendor' onUpdateAvatar={handleUpdateAvatar} onClose={() => refRBSheet?.current.close()}/>
            </RBSheet>
            {loading && <Loading />}
        </>
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
        width: '32%',
        height: 130,
        borderRadius: 100,
        marginVertical: 20,
        backgroundColor: '#dad6d6'
    },
    smallImage: {
        position: 'absolute',
        bottom: 22,
        right: 150,
        width: 35,
        height: 35,
    },
})

export default Profile;