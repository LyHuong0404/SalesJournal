import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, ToastAndroid } from "react-native";
import { useState, useRef } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";

import TextInputPrice from "../../components/TextInputPrice";
import ButtonCustom from "../../components/ButtonCustom";
import TextInputCustom from "../../components/TextInputCustom";
import { addProduct } from "../../actions/seller/productActions";
import Loading from "../../components/Loading";
import QRDemo from "../QRDemo";


function ImportProductInfo() {
    const route = useRoute();
    const navigation = useNavigation();
    const product = route.params?.product;
    const refRBSheet = useRef();
    const [name, setName] = useState(product?.name || '');
    const [inputDay, setInputDay] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));   
    const [capitalPrice, setCapitalPrice] = useState(product?.importPrice || '');
    const [bonusPrice, setBonusPrice] = useState('');
    const [salePrice, setSalePrice] = useState(product?.product?.salePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '') || '')
    const [importAmount, setImportAmount] = useState('');
    const [stockAmount, setStockAmount] = useState(product?.stockAmount.toString() || '');
    const [category, setCategory] = useState({label: product?.product?.name, value: product?.product?.id});
    const [expirationDate, setExpirationDate] = useState('');
    const [QR, setQR] = useState(product?.code || '');
    const [isDatePickerInputVisible, setDatePickerInputVisibility] = useState(false);
    const [isDatePickerExpirationDateVisible, setIsDatePickerExpirationDateVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    const hideDatePicker = () => {
        setIsDatePickerExpirationDateVisible(false);
    };

    const handleConfirmDatePicker = (date) => {
        setExpirationDate(format(new Date(date), 'yyyy-MM-dd'));
        hideDatePicker();
    };
    
    const handleRandomBarCode = () => {
        const randomNumberArray = Array.from({ length: 10 }, () => 
            Math.floor(Math.random() * 10)
        );
        setQR(randomNumberArray.join(""));
    }

    const submitForm = () => {
        try {
            const fetchAPI = async() => {
                setLoading(true);
                const response = await addProduct({
                    code: QR, 
                    name, 
                    expireAt: expirationDate, 
                    importPrice: capitalPrice.toString().replace('.', ''), 
                    importAmount,
                    productId: category.value
                });
                
                if (response?.code == 0) {
                    ToastAndroid.show('Nhập sản phẩm thành công', ToastAndroid.SHORT);
                    navigation.navigate('ImportProduct');
                } else {
                    ToastAndroid.show('Nhập sản phẩm không thành công', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
        }catch (e) {
            setLoading(false);
            ToastAndroid.show('Nhập sản phẩm thất bại', ToastAndroid.SHORT);
        }
    }

    
    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.header}>
                        <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    <Text style={styles.title_header}>Nhập sản phẩm</Text>
                </View>
            </TouchableOpacity>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                    <TextInputCustom 
                        label='Tên sản phẩm' 
                        placeholder="Ví dụ: Mì Hảo Hảo" 
                        value={name} 
                        onChange={(text) => setName(text)} 
                        customStyle={{ marginBottom: 20 }}
                        required={true}
                    />   
                    <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 20 }]}>
                        <View style={{ width: '45%' }}>
                            <TextInputPrice 
                                label='Giá vốn' 
                                value={capitalPrice} 
                                onChange={(text) => setCapitalPrice(text)} 
                                required={true}
                            />
                        </View>
                        <View style={{ width: '45%' }}>
                            <TextInputCustom 
                                label='Giá bán'
                                placeholder='0'
                                keyboardType='numeric'
                                value={salePrice} 
                                disabled={true}
                            />
                        </View>
                    </View>                
                    <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 20 }]}>
                        <View style={{ width: '45%' }}>
                        <TextInputCustom 
                                label='Số lượng tồn kho'
                                keyboardType='numeric'
                                value={stockAmount} 
                                disabled={true}
                            />
                        </View>
                        <View style={{ width: '45%' }}>
                            <TextInputCustom 
                                label='Số lượng nhập'
                                placeholder='0'
                                keyboardType='numeric'
                                value={importAmount} 
                                onChange={(text) => setImportAmount(text)} 
                                required={true}
                            />
                        </View>
                    </View>
                    <View style={[styles.display, { alignItems: 'center', paddingVertical: 10 }]}>
                        <Text style={{ color: '#7a7a7a', fontWeight: '600' }}>Danh mục <Text style={{color: 'red' }}> * </Text></Text>
                        {Object.keys(category).length > 0 && 
                            <View style={styles.category}>
                                <Text style={{ color: '#8e8e93'}}>{category.label}</Text>
                            </View>
                        }
                    </View>
                </View>
                <View style={{ backgroundColor: '#f2f2f5', height: 12 }}></View>

                <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
                    <Text style={{ fontWeight: '600', marginBottom: 15 }}>Quản lý tồn kho</Text>
                    <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 15 }]}>
                        <View style={{ width: '45%' }}>
                            <TextInputCustom
                                label='Ngày nhập hàng'
                                required={true}
                                value={inputDay} 
                                disabled
                            />
                            <DateTimePicker
                                isVisible={isDatePickerInputVisible}
                                mode="date"
                                onConfirm={handleConfirmDatePicker}
                                onCancel={hideDatePicker}
                            />
                        </View>
    
                        <View style={{ width: '45%' }}>
                            <TextInputCustom
                                label='Ngày hết hạn'
                                required={false}
                                placeholder="Chọn ngày"
                                value={expirationDate} 
                                onPressIn={() => setIsDatePickerExpirationDateVisible(true)}
                            />
                            <DateTimePicker
                                isVisible={isDatePickerExpirationDateVisible}
                                mode="date"
                                onConfirm={handleConfirmDatePicker}
                                onCancel={hideDatePicker}
                            />
                        </View>
                    </View>
                    <View style={[styles.display, { marginBottom: 15, justifyContent: 'space-between', alignItems: 'flex-end' }]}>
                        <View style={{flex: 0.9}}>
                            <TextInputCustom 
                                label='Mã sản phẩm' 
                                required={true} 
                                value={QR}
                                onChange={(text) => setQR(text)} 
                                keyboardType='default' />
                        </View>
                        <TouchableOpacity onPress={handleRandomBarCode}>
                            <Image source={require('../../assets/images/pen.png')} style={styles.image_qr} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => refRBSheet.current?.open()}>
                            <Image source={require('../../assets/images/qr_code.png')} style={styles.image_qr} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{ paddingHorizontal: 15 }}>
                <ButtonCustom 
                    disabled={!name || !capitalPrice || !importAmount || !category || !inputDay || !QR}
                    title="Hoàn tất" 
                    onPress={submitForm}
                />               
            </View>
            <RBSheet
                ref={refRBSheet}
                customStyles={{               
                    container: {
                    height: '100%'
                    }
                }}
            >
                <QRDemo 
                    action='ScanQR' 
                    onScanSuccess={(data) => {
                        setQR(data);
                        refRBSheet.current?.close();
                    }} 
                    close={() => refRBSheet.current?.close()}
                />
            </RBSheet>
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
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea'
    },
    title_header: {
        fontWeight: 'bold', 
        flex: 1,
        textAlign: 'center',
    },
    display: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    input_day: {
        height: 40,
        backgroundColor: 'transparent',
        paddingHorizontal: 0, 
        fontSize: 14, 
        paddingBottom: 5
    },
    image_product: {
        width: '100%',
        height: '85%',
        objectFit: 'contain',
        flex: 0.6
    },
    image_qr: {
        width: 30,
        height: 30,
        objectFit: 'contain',
    },
    category: {
        width: 'auto',
        height: '100%',
        backgroundColor: '#f7f7fa',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        minWidth: 50
    }
})

export default ImportProductInfo;