import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity, Image, Linking, ToastAndroid } from "react-native";
import { useState } from "react";

import ButtonCustom from "../components/ButtonCustom";
import { createURLPaymentMomo, createURLPaymentVNP } from "../actions/otherActions";
import LoadingSpinner from "../components/LoadingSpinner";

const paymentMethods = [
    { id: 1, label: 'VNPAY' },
    { id: 2, label: 'Momo' }
]

function Payment() {
    const navigation = useNavigation();
    const route = useRoute();
    const [data, setData] = useState(route.params?.servicePackage || {});
    const [selectedMethod, setSelectedMethod] = useState(0);
    const [loading, setLoading] = useState(false);

    const handlePress = (methodId) => {
        setSelectedMethod(methodId);
    };

    const handlePayment = () =>{
        try {
            const fetchAPI = async() => {
                setLoading(true);
                let response;
                if (selectedMethod == 1){
                    response = await createURLPaymentVNP({ servicePackageId: data.id, bankCode: "NCB" });
                } else response = await createURLPaymentMomo({ servicePackageId: data.id, bankCode: "NCB" });
                if (response?.code == 0) {
                    const url = response.data.urlPayment;
                    Linking.openURL(url);
                }
                setLoading(false);
            }
            fetchAPI();
        } catch (err) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi chuyển trang thanh toán', ToastAndroid.SHORT);
        }
    }

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Thanh toán</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#565555', fontWeight: '500', fontSize: 16 }}>Giá gói</Text>
                <View style={{ marginVertical: 10, borderBottomWidth: 1, borderStyle: 'dashed', borderBottomColor: '#22539e'}}>
                    <Text style={{ fontSize: 36, color: '#2f64b4', fontWeight: 500 }}>{` ${data?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                </View>
            </View>
            <View style={{ flex: 0.4 }}>
                <View style={[styles.display, { paddingHorizontal: 15, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }]}>
                    {paymentMethods.map((method, index) => 
                        (<TouchableOpacity 
                            onPress={() => handlePress(method.id)}
                            key={method.id} 
                            style={{ 
                                borderWidth: 1, 
                                borderRadius: 10, 
                                borderColor: selectedMethod == method.id ? '#7398d2' : '#e2e5ea', 
                                width: '30%', 
                                height: 100, 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                marginRight: 10, 
                                marginBottom: 10, 
                                backgroundColor: selectedMethod == method.id ? '#dbe1e9' : 'transparent',}}
                            >
                            <Image source={method.id == 1 ? require('../assets/images/VNPAY.jpg') : require('../assets/images/momo.png')} style={{ width: 60, height: 60, objectFit: 'contain' }}/>
                        </TouchableOpacity>)
                    )}
                </View>
            </View>
            <ButtonCustom disabled={selectedMethod == 0} title="Xác nhận" onPress={handlePayment}/>
            {loading && <LoadingSpinner />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
    },
    display: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        borderWidth: 1,
        borderColor: '#22539e',
        borderRadius: 7,
        marginVertical: 10,
    },
})

export default Payment;