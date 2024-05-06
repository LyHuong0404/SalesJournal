import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput as TextInputR, ToastAndroid } from "react-native";
import { Button, DefaultTheme, ToggleButton, TextInput } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RBSheet from "react-native-raw-bottom-sheet";

import TextInputCustom from "../../components/TextInputCustom";
import ButtonCustom from "../../components/ButtonCustom";
import { getProductByCode } from "../../actions/seller/productActions";
import { createReceipt } from "../../actions/seller/receiptActions";
import QRFullScreen from "../QRFullScreen";
import ModalInputProductCode from "../../components/Modal/ModalInputProductCode";
import { Switch } from "react-native-switch";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#888888', 
    },
};

function OrderConfirmation({ onBack }) {
    const navigation = useNavigation();
    const route = useRoute();
    const refRBSheet = useRef();
    const refRBSheetInputCode = useRef();
    const [ArrayQRAndAmount, setArrayQRAndAmount] = useState(route.params?.firstProduct || []);
    const [value, setValue] = useState('left');
    const [discount, setDiscount] = useState("0");
    const [transport, setTransport] = useState("0");
    const [note, setNote] = useState("");
    const [products, setProducts] = useState([1,2]);
    const [createDay, setCreateDay] = useState(format(new Date(Date.now()), 'dd/MM/yyyy'));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [buyerEmail, setBuyerEmail] = useState('');

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setCreateDay(format(new Date(date), 'dd/MM/yyyy'));
        hideDatePicker();
    };

    useEffect(() => {
        let newArray = [];
        ArrayQRAndAmount.forEach(item => {
            let existingProductIndex = newArray?.findIndex(newItem => newItem.product.productId === item.product.productId);
        
            if (existingProductIndex !== -1) {
                newArray[existingProductIndex].amount += item.amount;
            } else {
                newArray.push({ product: item.product, amount: item.amount });
            }
        });
        setProducts(newArray);
    }, [ArrayQRAndAmount])

    const submitForm = () => {
        try{           
            const newArray = ArrayQRAndAmount.map(item => ({
                productCode: item.product.code,
                amount: item.amount
            }));
            const fetchAPI = async() => {
                const response = await createReceipt({ paymentMethod: "DIRECT" , buyerEmail, useBonusPoint: isEnabled, receiptDetailExportModels: newArray });
                if (response?.code == 0) {
                    navigation.navigate("PaymentDetail", { data: response?.data });
                } else {
                    ToastAndroid.show('Lỗi khi thanh toán', ToastAndroid.SHORT);
                }
            }
            fetchAPI();
        } catch(err) {
            ToastAndroid.show('Lỗi khi thanh toán', ToastAndroid.SHORT);
        }
    }

    const onScanSuccess = (data) => {     
        if (typeof(data) == 'object') {
            setArrayQRAndAmount(prev => [...prev, data]);
        } else if (typeof(data) == 'number'){
            setArrayQRAndAmount(prev => {
                const newArray = [...prev];
                newArray[data] = {...newArray[data], amount: newArray[data].amount + 1};
                return newArray;               
            });
        }
        refRBSheet.current?.close();
        refRBSheetInputCode.current?.close();
    }

    const handleIncrease = (index) => {
        setArrayQRAndAmount(prev => {
            const newArray = [...prev];
            newArray[index] = {...newArray[index], amount: newArray[index].amount + 1};
            return newArray;               
        });
    }

    const handleDecrease = (index) => {
        setArrayQRAndAmount(prev => {
            const newArray = [...prev];
            if (newArray[index].amount !== 0) {
                newArray[index] = {...newArray[index], amount: newArray[index].amount - 1};
                if (newArray[index].amount == 0) {
                    newArray.splice(index, 1);
                }
            } 
            return newArray;               
        });
    }
    

    const handleClose = () => {
        refRBSheet.current?.close();
    }

    const handleDeleteProductFromCart = (productDelete) => {
        const updatedProducts = products.filter(item => item.product.productId !== productDelete.product.productId);      
        setArrayQRAndAmount(updatedProducts);
    }

    return ( 
        <View style={styles.container}>          
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
                <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Xác nhận</Text>
            </TouchableOpacity>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
            <View style={[styles.display, { marginHorizontal: 15 }]}>
                <Button 
                    icon="plus" 
                    mode="outlined" 
                    textColor="#22539e" 
                    buttonColor='transparent' 
                    onPress={() => refRBSheetInputCode.current?.open()} 
                    style={[styles.button, { width: '48%'} ]}>
                    Nhập mã
                </Button>
                <Button 
                    icon="plus" 
                    mode="outlined" 
                    textColor="#22539e" 
                    buttonColor='transparent' 
                    onPress={() => refRBSheet.current?.open()} 
                    style={[styles.button, { width: '48%'} ]}>
                    Quét mã
                </Button>
            </View>
            <RBSheet
                ref={refRBSheet}
                customStyles={{
                    container: {
                        height: '100%'
                    }
                }}
            >
                <QRFullScreen ArrayQRAndAmount={ArrayQRAndAmount} onScanSuccess={onScanSuccess} close={handleClose}/>
            </RBSheet>

            <RBSheet
                ref={refRBSheetInputCode}
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
                        height: 200
                    }
                }}
            >
                <ModalInputProductCode ArrayQRAndAmount={ArrayQRAndAmount} onScanSuccess={onScanSuccess}/>
            </RBSheet>

            <View style={{ paddingHorizontal: 15, backgroundColor: '#ffffff' }}>
                {products?.map((item, index) => 
                    <View key={index} style={{ display: 'flex', flexDirection: 'row', paddingVertical: 10, backgroundColor: '#ffffff', height: 90, borderBottomWidth: 0.6, borderColor: '#e5e5ea' }}>
                        <TouchableOpacity onPress={() => handleDeleteProductFromCart(item)}><Image source={require('../../assets/images/close_circle.png')} style={{ width: 20, height: 20, objectFit: 'contain' }} /></TouchableOpacity>
                        <Image source={{ uri: item?.product?.avatar }} style={{ width: 50, height: 50, marginRight: 10, objectFit: 'cover', borderRadius: 10 }} />
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Text style={{ color: '#252424' }}>{item?.product?.name}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{ color: '#1d7ebf', fontSize: 14, fontWeight: '500' }}>{`${item?.product?.salePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                <View style={{ display: 'flex', width: '40%', flexDirection: 'row', paddingVertical: 4, alignItems: 'center', justifyContent: 'space-around', borderColor: '#e5e5e2', borderWidth: 1, borderRadius: 5 }}>
                                    <TouchableOpacity onPress={() => handleDecrease(index)}>
                                        <Image source={require('../../assets/images/minus.png')} style={{ width: 12, height: 15, objectFit: 'contain', tintColor: '#7a7a7a' }}/>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: '500' }}>{item?.amount}</Text>
                                    <TouchableOpacity onPress={() => handleIncrease(index)}>
                                        <Image source={require('../../assets/images/plus.png')} style={{ width: 15, height: 15, objectFit: 'contain', tintColor: '#15803D' }}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
            <View style={styles.horizontalLine}></View>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Customers")}> */}
                    <View>
                        <Text style={{ fontWeight: '600', margin: 15, marginBottom: 10 }}>Thông tin khách hàng</Text>
                        <View style={{ paddingHorizontal: 15, backgroundColor: '#ffffff' }}>
                            {/* <TextInput
                                theme={theme}
                                placeholder='Nhập mail khách hàng'
                                placeholderTextColor='#abaaaa'
                                style={styles.input_style}
                                underlineColor="#abaaaa"
                                value={buyerEmail}
                                onChangeText={(text) => setBuyerEmail(text)}
                                // right={<TextInput.Icon icon="account-circle-outline" color='#888888' onPress={() => refRBSheet.current?.open()} />}
                            /> */}
                            <TextInputCustom 
                                label="Mail khách hàng" 
                                placeholder="Ví dụ: nguyena@gmail.com" 
                                value={buyerEmail} 
                                onChange={(text) => setBuyerEmail(text)}
                            />
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: '#7a7a7a', fontWeight: '600' }}>Dùng điểm tích lũy</Text>
                                <Switch 
                                    onValueChange={toggleSwitch} 
                                    value={isEnabled} 
                                    activeText={''}
                                    inActiveText={''}  
                                    circleSize={20}
                                    barHeight={20} 
                                    backgroundInactive={'#e9e7e7'}
                                />
                            </View>
                        </View>
                    </View>
            {/* </TouchableOpacity> */}

            
           

            {/* <View style={styles.total}>
                <View style={[styles.display, { marginVertical: 12 }]}>
                    <Text style={{ fontWeight: '500' }}>Tổng cộng</Text>
                    <Text style={{ color: '#d81f1f', fontWeight: 'bold' }}>129.000</Text>
                </View>
                <Button icon="wallet-outline" mode="outlined" textColor="#22539e" buttonColor='transparent' onPress={() => console.log('Pressed')} style={styles.button}>
                    Thanh toán trước
                </Button>
            </View> */}

            
            <View style={{ flex: 1, paddingHorizontal: 15, marginVertical: 5, backgroundColor: '#f6f7f8' }}>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                    <View style={[styles.display_center,]} >
                        <Image source={require('../../assets/images/calendar.png')} style={{ width: 20, height: 20, tintColor: '#4f86da', marginHorizontal: 10 }}/>
                        <Text style={{ color: '#3d73c7' }}>Ngày tạo: </Text>                   
                        <TextInputR
                            disabled
                            style={{ height: 40, color: '#3d73c7' }}
                            defaultValue={createDay}
                        />
                        <Image source={require('../../assets/images/dropdown.png')} style={{ width: 20, height: 20, tintColor: '#4f86da', marginLeft: 2 }}/>
                    </View>
                </TouchableOpacity>    
            </View>
            </KeyboardAwareScrollView>
            <View style={styles.button_group}>
                <ButtonCustom 
                    onPress={submitForm} 
                    disabled={products.length == 0}
                    title="Hoàn tất">
                </ButtonCustom>
            </View>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
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
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        alignItems: 'center',
        borderBottomColor: '#e2e5ea'
    },
    button: {
        borderWidth: 1,
        borderColor: '#22539e',
        borderRadius: 7,
        marginVertical: 10
    },
    input_style:{
        height: 40, 
        backgroundColor: 'transparent', 
        paddingHorizontal: 0, 
        fontSize: 14, 
        paddingBottom: 5
    },
    horizontalLine: { 
        height: 10, 
        backgroundColor: '#f2f2f5' 
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    display_center: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    close_icon: {
        width: 20, 
        height: 20, 
        objectFit: 'contain', 
        marginRight: 8
    },
    total: {
        marginTop: 10,
        borderTopWidth: 0.6, 
        borderTopColor: '#e5e5ea',
        borderBottomWidth: 0.6, 
        borderBottomColor: '#e5e5ea',
    },
    button_group: {
        padding: 10, 
        borderTopWidth: 1, 
        borderTopColor: '#f2f2f5', 
        backgroundColor: '#ffffff'
    },
    button_bottom: {
        width: '48%',
        borderWidth: 2,
        borderColor: '#15803D',
        borderRadius: 7,
        // margin: 10, 
    }
});

export default OrderConfirmation;