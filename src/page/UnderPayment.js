import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from "react";
import { Button, Chip, TextInput } from "react-native-paper";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from 'date-fns';

import TextInputPrice from "../components/TextInputPrice";
import TextInputCustom from "../components/TextInputCustom";
import ButtonCustom from "../components/ButtonCustom";

const windowWidth = Dimensions.get('window').width;

const paymentMethods = [
    { id: 1, label: 'Ngân hàng'},
    { id: 2, label: 'Ví điện tử'},
    { id: 3, label: 'Tiền mặt'},
]

function UnderPayment() {
    const navigation = useNavigation();
    const [price, setPrice] = useState('');
    const [focus, setFocus] = useState(2);
    const [note, setNote] = useState('Thanh toán');
    const [selectedMethod, setSelectedMethod] = useState(3);
    const [date, setDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDatePicker = (date) => {
        setDate(format(new Date(date), 'yyyy-MM-dd'));
        hideDatePicker();
    };

    return (  
        <View style={styles.container}>   
            <View style={[styles.header, { marginBottom: 10, paddingTop: 30 }]}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>     
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/images/right_arrow.png')} style={styles.image_back} />
                        </TouchableOpacity>
                        <Image source={require('../assets/images/user_circle.png')} style={styles.image}/>
                        <View style={{ marginLeft: 10}}>
                            <Text style={{ color: '#3a3a3a', fontSize: 14, fontWeight: 'bold' }}>Khách lẻ</Text>
                                <Text style={{ color: '#3a3a3a', fontSize: 11 }}>0123456789 
                            </Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity> 
                            <Image source={require('../assets/images/phone.png')} style={{ width: 24, height: 24, objectFit: 'contain', marginRight: 15, tintColor: 'black' }}/>
                        </TouchableOpacity>
                        <Image source={require('../assets/images/guide.png')} style={{ width: 25, height: 25, objectFit: 'contain', tintColor: 'black' }}/>
                    </View>
                </View>   
            </View>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >   
                <View style={styles.button_action_container}>
                    <Button 
                        icon="minus-circle-outline"  
                        textColor={focus == 1 ? "#b21414" : "#9a9a9a"} 
                        buttonColor={focus == 1 ? '#faeae7' : 'transparent'}  
                        style={[styles.button, { borderColor: focus == 1 ? '#b21414' : 'transparent'}]}
                        onPress={() => setFocus(1)}
                        >
                        Tôi đã đưa
                    </Button>
                    <Button 
                        icon="plus-circle-outline"  
                        textColor={focus == 2 ? "#15803D" : "#9a9a9a"} 
                        buttonColor={focus == 2 ? '#f9fcf4' : 'transparent'}  
                        style={[styles.button, { borderColor: focus == 2 ? '#15803D' : 'transparent'}]}
                        onPress={() => setFocus(2)}
                        >
                        Tôi đã nhận
                    </Button>
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <TextInputPrice 
                        label='Nhập số tiền' 
                        value={price} 
                        onChange={(text) => setPrice(text)} 
                    />
                    <View style={styles.text_money_container}>
                        <Text style={{ color: '#858585'}}>Còn phải thu</Text>
                        <Text style={{ color: '#858585'}}>95.000</Text>
                    </View>
                    <View style={styles.funds_container}>
                        <Text style={{ fontWeight: '500', color: '#7a7a7a' }}>Nguồn tiền</Text>
                        <View style={[styles.display, { justifyContent: 'space-between', marginTop: 10 }]}>
                            {paymentMethods.map((method, index) => 
                                <Chip 
                                    key={index}
                                    onPress={() => setSelectedMethod(method.id)} 
                                    selected={selectedMethod == method.id ? true : false} 
                                    selectedColor={selectedMethod == method.id ? '#2083c5' : '#8e8e93'} 
                                    style={{ backgroundColor: selectedMethod == method.id ? '#e3f0f8' : '#f7f7fa', fontWeight: '400'}}
                                >
                                    {method.label}
                                </Chip>
                            )}
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TextInputCustom
                            label='Ngày nhận tiền'
                            value={date} 
                            rightIcon={<TextInput.Icon icon="calendar-month-outline" />}
                            onPressIn={() => setDatePickerVisibility(true)}
                        />
                        <DateTimePicker
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirmDatePicker}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TextInputCustom 
                            label="Ghi chú"
                            value={note}
                            onChange={(text) => setNote(text)}
                            keyboardType='default'
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: '#7a7a7a', fontWeight: '600' }}>Giao dịch thanh toán</Text>
                        <View style={styles.payment_container}>
                            <View style={styles.display}>
                                <Image source={require('../assets/images/close_circle_outline.png')} style={styles.icon_delete} />
                                <View>
                                    <Text style={{ color: '#6f6f6f', fontSize: 10 }}>17/03/24</Text>
                                    <Text style={{ color: '#3a3a3a', marginTop: 5 }}>Trả nợ đơn RGHKJE</Text>
                                </View>
                            </View>
                            <Text style={{ color: '#b21414', fontWeight: '500', fontSize: 12 }}>25.000</Text>
                        </View>

                        <View style={styles.payment_container}>
                            <View style={styles.display}>
                                <Image source={require('../assets/images/close_circle_outline.png')} style={styles.icon_delete} />
                                <View>
                                    <Text style={{ color: '#6f6f6f', fontSize: 10 }}>17/03/24</Text>
                                    <Text style={{ color: '#3a3a3a', marginTop: 5 }}>Trả nợ đơn RGHKJE</Text>
                                </View>
                            </View>
                            <Text style={{ color: '#b21414', fontWeight: '500', fontSize: 12 }}>25.000</Text>
                        </View>

                        <View style={styles.payment_container}>
                            <View style={styles.display}>
                                <Image source={require('../assets/images/close_circle_outline.png')} style={styles.icon_delete} />
                                <View>
                                    <Text style={{ color: '#6f6f6f', fontSize: 10 }}>17/03/24</Text>
                                    <Text style={{ color: '#3a3a3a', marginTop: 5 }}>Trả nợ đơn RGHKJE</Text>
                                </View>
                            </View>
                            <Text style={{ color: '#b21414', fontWeight: '500', fontSize: 12 }}>25.000</Text>
                        </View>

                        <View style={styles.payment_container}>
                            <View style={styles.display}>
                                <Image source={require('../assets/images/close_circle_outline.png')} style={styles.icon_delete} />
                                <View>
                                    <Text style={{ color: '#6f6f6f', fontSize: 10 }}>17/03/24</Text>
                                    <Text style={{ color: '#3a3a3a', marginTop: 5 }}>Trả nợ đơn RGHKJE</Text>
                                </View>
                            </View>
                            <Text style={{ color: '#b21414', fontWeight: '500', fontSize: 12 }}>25.000</Text>
                        </View>

                        <View style={styles.payment_container}>
                            <View style={styles.display}>
                                <Image source={require('../assets/images/close_circle_outline.png')} style={styles.icon_delete} />
                                <View>
                                    <Text style={{ color: '#6f6f6f', fontSize: 10 }}>17/03/24</Text>
                                    <Text style={{ color: '#3a3a3a', marginTop: 5 }}>Trả nợ đơn RGHKJE</Text>
                                </View>
                            </View>
                            <Text style={{ color: '#b21414', fontWeight: '500', fontSize: 12 }}>25.000</Text>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <ButtonCustom 
                title="Tạo" 
                customStyle={{ backgroundColor: focus == 1 ? '#b21414' : '#15803D', marginHorizontal: 15 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    display: {
        display: 'flex',
        flexDirection: 'row'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e5ea',
        elevation: 1
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 100, 
        objectFit: 'contain',
        tintColor: '#15803D',
    },
    image_back: {
        width: 17, 
        height: 17, 
        objectFit: 'contain', 
        marginRight: 10, 
        tintColor: 'black'
    },
    button_action_container: {
        backgroundColor: '#e2e5ea',
        borderRadius: 8,
        alignSelf: 'center',
        width: windowWidth - 30,
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        padding: 3,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    button: {
        borderRadius: 8,
        width: '49%',
        borderWidth: 1,
    },
    text_money_container: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    funds_container: {
        marginTop: 20,
    },
    icon_delete: {
        width: 27,
        height: 27,
        tintColor: '#3a3a3a',
        marginRight: 10,
        alignSelf: 'center'  
    },
    payment_container: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})



export default UnderPayment;