import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput as TextInputR, ToastAndroid } from "react-native";
import { Button, DefaultTheme, TextInput } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RBSheet from "react-native-raw-bottom-sheet";
import { Switch } from "react-native-switch";
import { useSelector } from "react-redux";

import ButtonCustom from "../../components/ButtonCustom";
import { createReceipt } from "../../actions/seller/receiptActions";
import ModalInputProductCode from "../../components/Modal/ModalInputProductCode";
import QRDemo from "../QRDemo";
import LoadingSpinner from "../../components/LoadingSpinner";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#888888', 
    },
};

function OrderConfirmation({ onBack }) {
    const refRBSheetCamera = useRef();
    const { user } = useSelector((state) => state.auth);
    const navigation = useNavigation();
    const route = useRoute();
    const refRBSheet = useRef();
    const refRBSheetInputCode = useRef();
    const [ArrayQRAndAmount, setArrayQRAndAmount] = useState(route.params?.firstProduct || []);
    const [products, setProducts] = useState([]);
    const [createDay, setCreateDay] = useState(format(new Date(Date.now()), 'dd/MM/yyyy'));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [buyerEmail, setBuyerEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isInitialInputCode, setIsInitialInputCode] = useState(route.params?.open || false);

    useEffect(() => {
        if (isInitialInputCode) {
          refRBSheetInputCode.current?.open();
          setIsInitialInputCode(false);
        }
    }, []);

    useEffect(() => {
        let newArray = [];
        ArrayQRAndAmount.forEach(item => {
            let existingProductIndex = newArray?.findIndex(newItem => newItem.code === item.product.code);
            
            if (existingProductIndex !== -1) {
                newArray[existingProductIndex].amount += item.amount;
            } else {
                newArray.push({ product: item.product, amount: item.amount });
            }
        });
        setProducts(newArray);
    }, [ArrayQRAndAmount])
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setCreateDay(format(new Date(date), 'dd/MM/yyyy'));
        hideDatePicker();
    };
    
    const submitForm = () => {
        try{        
            const newArray = ArrayQRAndAmount.map(item => 
                {
                    let totalAmountProduct = 0;
                    for(const p of products) {
                        if(p.product.product.id === item.product.product.id) {
                            totalAmountProduct = p.amount;
                        }
                    }
                    return ({
                        productCode: item.product.code,
                        amount: item.amount,
                        totalAmountProduct: totalAmountProduct
                    });
                }
            );
            const fetchAPI = async() => {
                setLoading(true);
                const response = await createReceipt({ paymentMethod: "DIRECT", buyerEmail, useBonusPoint: isEnabled, receiptDetailExportModels: newArray });
                if (response?.code == 0) {
                    navigation.navigate("PaymentDetail", { data: response?.data, buyerEmail, useBonus: isEnabled });
                } else {
                    ToastAndroid.show('Lỗi khi xác nhận đơn', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi xác nhận đơn', ToastAndroid.SHORT);
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
        const updatedProducts = products.filter(item => item.product.code !== productDelete.product.code);      
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
                <QRDemo ArrayQRAndAmount={ArrayQRAndAmount} onScanSuccess={onScanSuccess} close={handleClose}/>
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
                        <Image source={{ uri: item?.product?.product?.avatar }} style={{ width: 50, height: 50, marginRight: 10, objectFit: 'cover', borderRadius: 10 }} />
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Text style={{ color: '#252424' }}>{item?.product?.name}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{ color: '#1d7ebf', fontSize: 14, fontWeight: '500' }}>{`${item?.product?.product?.salePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
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
            <View style={{ paddingHorizontal: 8, marginVertical: 10 }}>
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
            <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: '#ffffff' }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ flex: 0.9 }}>
                        <Text style={{ fontWeight: '500', color: '#3a3a3a'}}>Mail khách hàng</Text>
                        <TextInput
                            theme={theme}
                            value={buyerEmail} 
                            onChangeText={(text) => setBuyerEmail(text)}
                            style={styles.input_style}
                            underlineColor='#e2e5ea'
                            placeholder="Ví dụ: nguyena@gmail.com"
                            placeholderTextColor='#888888'
                        />
                    </View>
                    <TouchableOpacity onPress={() => refRBSheetCamera?.current.open()} style={{ justifyContent: 'flex-end'}}>
                        <Image source={require('../../assets/images/qr_code.png')} style={styles.image_qr} />
                    </TouchableOpacity>
                </View>
                {buyerEmail && user?.profile?.allowCustomerAccumulate && 
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                        <Text style={{ fontWeight: '600', marginRight: 15 }}>Dùng điểm tích lũy</Text>
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
                }
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
            <RBSheet
                ref={refRBSheetCamera}
                customStyles={{               
                    container: {
                    height: '100%'
                    }
                }}
            >
                <QRDemo 
                    action='ScanCustomerInfo' 
                    onScanSuccess={(data) => {
                        setBuyerEmail(data);
                        refRBSheetCamera.current?.close();
                    }} 
                    close={() => refRBSheetCamera.current?.close()}
                />
            </RBSheet>
            {loading && <LoadingSpinner />}
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
    },
    input_style:{
        height: 40, 
        backgroundColor: 'transparent', 
        fontSize: 14, 
        paddingHorizontal: 0, 
        paddingBottom: 5
    },
    image_qr: {
        width: 30,
        height: 30,
        objectFit: 'contain',
    },
});

export default OrderConfirmation;