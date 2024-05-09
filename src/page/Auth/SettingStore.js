import { View, StyleSheet, Text, TouchableOpacity, Image, ToastAndroid } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-native-switch";

import TextInputCustom from "../../components/TextInputCustom";
import ButtonCustom from "../../components/ButtonCustom";
import TextInputPrice from "../../components/TextInputPrice";
import Loading from "../../components/Loading";
import { updateStore } from "../../actions/authActions";


function SettingStore() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [profileId, setProfileId] = useState(user?.profile?.id || '');
    const [name, setName] = useState(user?.profile?.nameStore || '');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isEnabled, setIsEnabled] = useState(user?.profile?.allowCustomerAccumulate || false);
    const [exchangeMoneyToPoint, setExchangeMoneyToPoint] = useState(user?.profile?.exchangeMoneyToPoint || '1000');
    const [exchangePointToMoney, setExchangePointToMoney] = useState(user?.profile?.exchangePointToMoney || '1000');
    const [loading, setLoading] = useState(false);


    const handleUpdateStore = () => {
        try{
            const fetchAPI = async() => {
                setLoading(true);
                const response = await dispatch(updateStore({
                    profileId,
                    nameStore: name,
                    allowCustomerAccumulate: isEnabled,
                    exchangePointToMoney: isEnabled ? exchangePointToMoney.replace('.','') : null,
                    exchangeMoneyToPoint: isEnabled ? exchangeMoneyToPoint.replace('.','') : null
                }))
                if(response) {
                    ToastAndroid.show('Cập nhật cửa hàng thành công', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Cập nhật cửa hàng thất bại', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Cập nhật cửa hàng thất bại', ToastAndroid.SHORT);
        }
    }

    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.header}>
                        <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    <Text style={{ flex: 1, color: 'black', textAlign: 'center', fontWeight: 'bold', marginLeft: 10 }}>Cài đặt cửa hàng</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <View style={{ flex: 1, marginHorizontal: 15, marginTop: 10 }}>
                <TextInputCustom
                    label='Tên cửa hàng'
                    value={name}
                    onChange={(text) => setName(text)}
                    placeholder="Tên cửa hàng"
                    required={true}
                />
                <View style={styles.gap}></View>
                {/* <TextInputCustom
                    label='Số điện thoại'
                    value={phone}
                    onChange={(text) => setPhone(text)}
                    placeholder="Số điện thoại"
                /> */}
                <View style={styles.gap}></View>
                {/* <TextInputCustom
                    label='Địa chỉ'
                    value={address}
                    onChange={(text) => setAddress(text)}
                    placeholder="Địa chỉ"
                /> */}
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View style={{ flex: 0.8 }}>
                        <Text style={styles.label}>Tích điểm khách hàng</Text>             
                        <Text style={styles.text_light}>Tích điểm khi khách mua hàng và sử dụng điểm để giảm giá cho những đơn tiếp theo</Text> 
                    </View>
                    <Switch 
                        onValueChange={() => setIsEnabled(previousState => !previousState)} 
                        value={isEnabled} 
                        activeText={''}
                        inActiveText={''}  
                        circleSize={25}
                        barHeight={25} 
                        backgroundInactive={'#e9e7e7'}
                    />
                </View>
                <View style={styles.horizontalLine} />
                {isEnabled && 
                    <>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.label}>Tích điểm khi khách thanh toán đơn</Text>     
                            <View style={styles.display}>
                                <View style={{ flex: 1 }}>
                                    <TextInputPrice 
                                        value={exchangeMoneyToPoint} 
                                        onChange={(text) => setExchangeMoneyToPoint(text)} 
                                    />
                                </View>
                                <Text style={{ fontWeight: '500', color: '#15803D'}}>  VNĐ </Text>
                                <Text>  =  1</Text>
                                <Text style={{ fontWeight: '500', color: '#d02c0d'}}> điểm</Text>
                            </View>        
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <Text style={styles.label}>Đổi điểm để giảm giá đơn</Text>     
                            <View style={styles.display}>
                                <Text>1</Text>
                                <Text style={{ fontWeight: '500', color: '#d02c0d'}}> điểm</Text>
                                <Text>  =  </Text>
                                <View style={{ flex: 1 }}>
                                    <TextInputPrice 
                                        value={exchangePointToMoney} 
                                        onChange={(text) => setExchangePointToMoney(text)} 
                                    />
                                </View>
                                <Text style={{ fontWeight: '500', color: '#15803D'}}>  VNĐ</Text>
                            </View>        
                        </View>
                    </>
                }
                </View>
            <ButtonCustom 
                title='Cập nhật'
                onPress={handleUpdateStore}
                customStyle={{ marginHorizontal: 15 }}
                disabled={(isEnabled && (!exchangePointToMoney || !exchangeMoneyToPoint)) || (!name)}
            />
            {loading && <Loading />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {       
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 15, 
        justifyContent: "flex-start", 
        height: 'auto', 
        paddingVertical: 12
    },
    horizontalLine: {
        height: 10,
        backgroundColor: '#f6f7f8', 
        marginBottom: 5,
    },
    gap: {
        marginTop: 25
    },
    label: {
        marginBottom: 5
    },
    text_light: {
        fontSize: 10,
        color: '#6f6f6f'
    },
    display: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default SettingStore;