import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import { Switch } from 'react-native-switch';

import ButtonCustom from "../components/ButtonCustom";

const paymentMethods = [
    { id: 1, label: 'Mã QR'},
    { id: 2, label: 'Tiền mặt'},
    { id: 3, label: 'Ví điện tử'},
    { id: 4, label: 'Ngân hàng'},
]
function Payment() {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedMethod, setSelectedMothod] = useState(0);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const handlePress = (methodId) => {
        setSelectedMothod(methodId);
    };

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Thanh toán: 14.000</Text>
                </View>
                <View style={{ flex: 0.4 }}>
                    <Button icon="account-outline" mode="outlined" textColor="#22539e" buttonColor='transparent' onPress={() => console.log('Pressed')} style={styles.button}>
                        Hương
                    </Button>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#565555', fontWeight: '500', fontSize: 16 }}>Khách trả</Text>
                <View style={{ marginVertical: 10, borderBottomWidth: 1, borderStyle: 'dashed', borderBottomColor: '#22539e'}}>
                    <Text style={{ fontSize: 36, color: '#2f64b4', fontWeight: 500 }}>27.800</Text>
                </View>
                <View style={[styles.display, { alignItems: 'center'}]}>
                    <Text style={{ color: '#565555', marginRight: 5 }}>Ghi nợ</Text>
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
            </View>
            <View style={[styles.display, { paddingHorizontal: 15, flexWrap: 'wrap', justifyContent: 'space-between' }]}>
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
                        <Text style={{ color: selectedMethod == method.id ? '#4572b6' : '#95979a'}}>{method.label}</Text>
                    </TouchableOpacity>)
                )}
            </View>
            <ButtonCustom title="Xác nhận" customStyle={{ marginHorizontal: 15}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
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