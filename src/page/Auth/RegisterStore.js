import { Text, View, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from "react-redux";

import ButtonCustom from "../../components/ButtonCustom";
import TextInputCustom from "../../components/TextInputCustom";
import { registerStore } from "../../actions/user/authActions";
import Loading from "../../components/Loading";


function RegisterStore() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [nameStore, setNameStore] = useState('');
    const [loading, setLoading] = useState(false);


    const handleRegisterStore = () => {
        try{
            const fetchAPI = async() => {
                setLoading(true);
                const response = await dispatch(registerStore({ nameStore }));
                if (response) {
                    navigation.navigate('VendorNav');
                    ToastAndroid.show('Đăng ký cửa hàng thành công', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Đăng ký cửa hàng thất bại', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
        } catch(err){
            setLoading(false);
            ToastAndroid.show('Đăng ký cửa hàng thất bại', ToastAndroid.SHORT);
        }
    }
      
    return ( 
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 15, flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <KeyboardAwareScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#15803D' }}>Đăng ký </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>cửa hàng</Text>
                    </View>
                    <TextInputCustom 
                        label="Tên cửa hàng" 
                        required={true} 
                        placeholder="Ví dụ: Cửa hàng bách hóa" 
                        value={nameStore} 
                        onChange={(text) => setNameStore(text)}
                    />
                    
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2d86bc', marginTop: 40  }}>Điều khoản</Text>
                    <View style={[styles.display, { marginTop: 20 }]}>
                        <Image source={require('../../assets/images/firework.png')} style={{ width: 17, height: 17, objectFit: 'contain', marginRight: 15 }} />
                        <Text>Chào mừng đến với <Text style={{ fontWeight: '500' }}>SoBanHang</Text></Text>
                    </View>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/free.png')} style={{ width: 20, height: 20, objectFit: 'contain', marginRight: 15 }} />
                        <Text>Khi đăng ký bán hàng, tài khoản của bạn sẽ được miễn phí trong <Text style={{ fontWeight: '500' }}>30 ngày</Text></Text>
                    </View>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Không giới hạn tạo đơn</Text>
                    </View>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Quản lý hóa đơn</Text>
                    </View>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Quản lý sản phẩm</Text>
                    </View>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Báo cáo bán hàng và lãi lỗ</Text>
                    </View>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Quản lý khách hàng</Text>
                    </View>
                    <Text style={{ fontWeight: '500'}}>Bán hàng nhanh, hiệu quả</Text>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Tạo đơn dễ dàng</Text>
                    </View>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Quét mã vạch nhanh chóng</Text>
                    </View>
                    <Text style={{ fontWeight: '500'}}>Kiểm soát chặt chẽ</Text>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Quản lý tồn kho</Text>
                    </View>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Quản lý kho hàng</Text>
                    </View>
                    <Text style={{ fontWeight: '500'}}>Chăm sóc khách quen</Text>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Lưu lịch sử mua hàng và tích điểm</Text>
                    </View>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Quản lý khách hàng</Text>
                    </View>
                    <Text style={{ fontWeight: '500'}}>Giảm chi phí, tăng lợi nhuận</Text>
                    <View style={styles.display}>
                        <Image source={require('../../assets/images/tick_circle.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginHorizontal: 15 }} />
                        <Text>Tự động cộng doanh thu, lãi lỗ mỗi ngày</Text>
                    </View>
                </KeyboardAwareScrollView>
            </View>

            <ButtonCustom 
                disabled={!nameStore} 
                onPress={handleRegisterStore} 
                customStyle={{ marginHorizontal: 15 }}
                title="Đăng ký">
            </ButtonCustom>
            {loading && <Loading />}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fbfdff',
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    }
})

export default RegisterStore;