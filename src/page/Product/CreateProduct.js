import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, ToastAndroid } from "react-native";
import { Button } from "react-native-paper";
import { useState, useRef } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";


import TextInputPrice from "../../components/TextInputPrice";
import ModalSelectCategory from "../../components/Modal/ModalSelectCategory";
import ButtonCustom from "../../components/ButtonCustom";
import TextInputCustom from "../../components/TextInputCustom";
import { addProduct, deleteProduct, updateProduct } from "../../actions/seller/productActions";
import TwoButtonBottom from "../../components/TwoButtonBottom";
import ModalConfirmation from "../../components/Modal/ModalConfirmation";
import { convertTimeStamp, copyToClipboard } from "../../utils/helper";
import QRDemo from "../QRDemo";
import LoadingSpinner from "../../components/LoadingSpinner";


function CreateProduct() {
    const route = useRoute();
    const navigation = useNavigation();
    const product = route.params?.product;
    const refRBSheet = useRef();
    const refRBSheetCamera = useRef();
    const [name, setName] = useState(product?.name || '');
    const [inputDay, setInputDay] = useState(convertTimeStamp(product?.importedAt, 'yyyy-MM-dd') || format(new Date(Date.now()), 'yyyy-MM-dd'));   
    const [capitalPrice, setCapitalPrice] = useState(product?.importPrice || '');
    const [importAmount, setImportAmount] = useState(product?.importAmount?.toString() ||'');
    const [category, setCategory] = useState(product ? { label: product?.product?.name, value: product?.product?.id, price: product?.product?.salePrice } : {});
    const [expirationDate, setExpirationDate] = useState(convertTimeStamp(product?.expireAt, 'yyyy-MM-dd') || '');
    const [QR, setQR] = useState(product?.code || '');
    const [isDatePickerInputVisible, setDatePickerInputVisibility] = useState(false);
    const [isDatePickerExpirationDateVisible, setIsDatePickerExpirationDateVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stockAmount, setStockAmount] = useState(product?.stockAmount?.toString() || '');


    const hideDatePicker = () => {
        if (isDatePickerInputVisible) {
            setDatePickerInputVisibility(false);
        } else setIsDatePickerExpirationDateVisible(false);
    };

    const handleConfirmDatePicker = (date) => {
        if (isDatePickerInputVisible) {
            setInputDay(format(new Date(date), 'yyyy-MM-dd'));
        } else {
            setExpirationDate(format(new Date(date), 'yyyy-MM-dd'));
        }
        hideDatePicker();
    };
    
    const handleCategory = (category) => {
        setCategory(category);
        refRBSheet.current.close();
    }
    
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
                let response;
                if (product?.name) {
                    response = await updateProduct({
                        code: QR, 
                        name, 
                        expireAt: expirationDate, 
                        stockAmount,
                        importPrice: capitalPrice.toString().includes('.') ? capitalPrice.toString().replace(/\./g, ""): capitalPrice, 
                        importAmount,
                        productId: category.value,
                        importProductId: product.id,
                    });
                } else {
                    response = await addProduct({
                        code: QR, 
                        name, 
                        expireAt: expirationDate, 
                        importPrice: capitalPrice.toString().includes('.') ? capitalPrice.toString().replace(/\./g, ""): capitalPrice, 
                        importAmount,
                        productId: category.value
                    });
                }
                if (response?.code == 0) {
                    ToastAndroid.show('Lưu sản phẩm thành công', ToastAndroid.SHORT);
                    navigation.navigate('ProductManagement');
                } else if (response?.code == 400) {
                    ToastAndroid.show('Mã sản phẩm đã tồn tại', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Lưu sản phẩm không thành công', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
        }catch (e) {
            setLoading(false);
            ToastAndroid.show('Lưu sản phẩm thất bại', ToastAndroid.SHORT);
        }
    }

    const handleDeleteProduct = () => {
        try{
            const fetchAPI = async() => {
                setLoading(true);
                const response = await deleteProduct(product.id);
                if (response?.code == 0) {
                    ToastAndroid.show('Xóa sản phẩm thành công', ToastAndroid.SHORT);
                    navigation.goBack();
                } else {
                    ToastAndroid.show('Xóa sản phẩm thất bại', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
            setShowModal(false);
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Xóa sản phẩm thành công', ToastAndroid.SHORT);
        }
    }


    return ( 
        <View style={styles.container}>
            <View style={{ height: 20, width: '100%', backgroundColor: 'transparent'}}></View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.header}>
                        <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    <Text style={styles.title_header}>{product ? 'Cập nhật sản phẩm nhập' : 'Tạo sản phẩm nhập'}</Text>
                </View>
            </TouchableOpacity>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                    <TextInputCustom 
                        label='Tên hàng' 
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
                                label='Số lượng'
                                placeholder='0'
                                keyboardType='numeric'
                                value={importAmount} 
                                onChange={(text) => setImportAmount(text)} 
                                required={true}
                            />
                        </View>
                    </View>
                    <Text style={{ color: '#7a7a7a', fontWeight: '600' }}>Sản phẩm <Text style={{color: 'red' }}> *</Text></Text>
                    <View style={[styles.display, { alignItems: 'center', paddingVertical: 10 }]}>
                        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                            <Image source={require('../../assets/images/category.png')} style={{ width: 25, height: 25, marginRight: 15 }}/>
                        </TouchableOpacity>

                        {Object.keys(category).length > 0 && 
                            <View style={styles.category}>
                                <Text style={{ color: '#8e8e93'}}>{category.label}</Text>
                            </View>
                        }
                       
                        <Button 
                            icon="plus" 
                            buttonColor='#ffffff' 
                            textColor='#22539e' 
                            style={[styles.button_upload, { marginRight: 15, width: 170 }]} 
                            mode="contained"
                            onPress={() => navigation.navigate('CreateCategory', { action: 'CreatingProduct'})} 
                        >
                            Tạo sản phẩm
                        </Button>

                    </View>
                    {Object.keys(category).length > 0 && 
                        <Text style={{ color: '#8e8e93'}}>{`Giá bán: ${category.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                    }
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
                                height: 400
                            }
                        }}
                    >
                        <ModalSelectCategory onSetCategory={handleCategory}/>
                    </RBSheet>
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
                                onPressIn={() => setDatePickerInputVisibility(true)}
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
                                required={true}
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
                        <TouchableOpacity onPress={() => copyToClipboard(QR)}>
                            <Image source={require('../../assets/images/copy.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleRandomBarCode}>
                            <Image source={require('../../assets/images/pen.png')} style={styles.image_qr} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => refRBSheetCamera?.current.open()}>
                            <Image source={require('../../assets/images/qr_code.png')} style={styles.image_qr} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{ paddingHorizontal: 15 }}>
                {product?.name ? 
                    <TwoButtonBottom
                        titleLeft="Xóa" 
                        titleRight="Cập nhật" 
                        buttonColorLeft='transparent' 
                        buttonColorRight='#15803D' 
                        borderColorLeft='#c71313' 
                        textColorLeft='#c71313'
                        onBack={() => setShowModal(true)}
                        onPressRight={submitForm}
                    /> :
                    <ButtonCustom 
                        disabled={!name || !capitalPrice || !importAmount || !category || !inputDay || !QR || !expirationDate}
                        title="Hoàn tất" 
                        onPress={submitForm}
                    /> 
                }      
            </View>
            {loading && <LoadingSpinner />}
            {showModal && 
                <ModalConfirmation 
                    title="Xóa sản phẩm?" 
                    question="Bạn có chắc rằng muốn xóa sản phẩm?"
                    textYes="Xóa"
                    textNo="Quay lại"
                    onPressCancel={() => setShowModal(false)}
                    onPressConfirm={handleDeleteProduct}
                />
            }
            <RBSheet
                ref={refRBSheetCamera}
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
                        refRBSheetCamera.current?.close();
                    }} 
                    close={() => refRBSheetCamera.current?.close()}
                />
            </RBSheet>
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
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea'
    },
    title_header: {
        fontWeight: 'bold', 
        flex: 1,
        textAlign: 'center',
    },
    image_product_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center space-between',
        alignItems: 'center',
        height: 120,
        backgroundColor: '#f2f2f5',
        marginHorizontal: 15,
    },
    input_style:{
        height: 40, 
        backgroundColor: 'transparent', 
        paddingHorizontal: 0, 
        fontSize: 14, 
        paddingBottom: 5
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
    button_upload: {
        borderRadius: 10,
        padding: 0,
        borderWidth: 1,
        borderColor: '#22539e',
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
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        minWidth: 50
    }
})

export default CreateProduct;