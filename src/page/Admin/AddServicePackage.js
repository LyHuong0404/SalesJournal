import { Text, View, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Switch } from 'react-native-switch';

import { addServicePackage, lockServicePackage, unlockServicePackage, updateServicePackage } from "../../actions/admin/servicepackageActions";
import ButtonCustom from "../../components/ButtonCustom";
import TextInputPrice from "../../components/TextInputPrice";
import TextInputCustom from "../../components/TextInputCustom";
import LoadingSpinner from "../../components/LoadingSpinner";



function AddServicePackage() {
    const navigation = useNavigation();
    const route = useRoute();
    const [servicepackageUpdate, setServicepackageUpdate] = useState(route?.params?.data || '');
    const [price, setPrice] = useState(servicepackageUpdate?.price?.toString() || '');
    const [day, setDay] = useState(servicepackageUpdate?.day?.toString() || '');
    const [isEnabled, setIsEnabled] = useState(servicepackageUpdate?.activated || false);
    const [loading, setLoading] = useState(false);
    const [initialStatus, setInitialStatus] = useState(servicepackageUpdate?.activated || false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const onSubmit = () => {
        try{
            const fetchAPI = async() => {
                setLoading(true);
                let response;
                if (servicepackageUpdate) {
                    // update
                    if (initialStatus != isEnabled) {
                        if (isEnabled) {
                            response = await unlockServicePackage(servicepackageUpdate?.id);
                        } else {
                            response = await lockServicePackage(servicepackageUpdate?.id);
                        }
                        if (response?.code == 1) {
                            ToastAndroid.show('Thay đổi trạng thái gói không thành công', ToastAndroid.SHORT);
                        }
                    }
                    response = await updateServicePackage({ servicePackageId: servicepackageUpdate?.id, price: price.includes('.') ? price.replace(/\./g, "") : price, day});

                } else {
                    //add
                    response = await addServicePackage({price: price.includes('.') ? price.replace(/\./g, "") : price, day});
                }
                if (response?.code == 0) {
                    ToastAndroid.show('Lưu gói gia hạn thành công', ToastAndroid.SHORT);
                    navigation.navigate('ServicePackageManagement');
                } else {
                    ToastAndroid.show('Lưu gói gia hạn không thành công', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Lưu gói gia hạn không thành công', ToastAndroid.SHORT);
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
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#15803D' }}>{servicepackageUpdate ? 'Cập nhật' : 'Tạo'} </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>gói gia hạn</Text>
                    </View>
    
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 20 }}>
                            <TextInputPrice 
                                label='Giá gói' 
                                value={price} 
                                onChange={(text) => setPrice(text)} 
                                required={true} 
                            />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <TextInputCustom 
                                label="Số ngày gia hạn" 
                                required={true} 
                                placeholder="Nhập số ngày gia hạn" 
                                value={day} 
                                onChange={(text) => setDay(text)}
                                keyboardType='numeric'
                            />
                        </View>

                    {servicepackageUpdate && 
                        <View style={styles.display}>
                            <Text style={{ color: '#7a7a7a', fontWeight: '600' }}>Trạng thái</Text>
                            <Switch 
                                onValueChange={toggleSwitch} 
                                value={isEnabled} 
                                activeText={''}
                                inActiveText={''} 
                                switchLeftPx={4}  
                                circleSize={20}
                                barHeight={25} 
                                switchRightPx={4} 
                                backgroundInactive={'#e9e7e7'}
                            />
                        </View>
                    }
                    </View>                  
                </KeyboardAwareScrollView>
            </View>

            <ButtonCustom 
                disabled={!price || !day || parseInt(day) == 0} 
                onPress={onSubmit} 
                customStyle={{ marginHorizontal: 15 }}
                title="Hoàn tất">
            </ButtonCustom>
            {loading && <LoadingSpinner />}
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
        justifyContent: 'space-between',
        marginTop: 20
    }
})

export default AddServicePackage;