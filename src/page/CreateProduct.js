import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, ToastAndroid } from "react-native";
import { Button } from "react-native-paper";
import { useState, useRef } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";

import TextInputPrice from "../components/TextInputPrice";
import ModalCreateCategory from "../components/ModalCreateCategory";
import ModalSelectCategory from "../components/ModalSelectCategory";
import ButtonCustom from "../components/ButtonCustom";
import TextInputCustom from "../components/TextInputCustom";
import { addProduct } from "../actions/seller/productActions";
import TwoButtonBottom from "../components/TwoButtonBottom";
import ModalConfirmation from "../components/ModalConfirmation";


function CreateProduct() {
    const route = useRoute();
    const navigation = useNavigation();
    const refRBSheet = useRef();
    const [createCategory, setCreateCategory] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [capitalPrice, setCapitalPrice] = useState('');
    const [bonusPrice, setBonusPrice] = useState('');
    const [category, setCategory] = useState({});
    const [inputDay, setInputDay] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));
    const [expirationDate, setExpirationDate] = useState('');
    const [QR, setQR] = useState('');
    const [isDatePickerInputVisible, setDatePickerInputVisibility] = useState(false);
    const [isDatePickerExpirationDateVisible, setIsDatePickerExpirationDateVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleScanQRCode = () => {
        navigation.navigate('QRScanner', {
          onScanSuccess: (data) => {
            setQR(data);
          },
        });
    };

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
        setQR(randomNumberArray.join(' '));
    }

    const submitForm = () => {
        const formData = new FormData();
        formData.append("code", QR);
        formData.append("name", name);
        formData.append("expireAt", expirationDate);
        formData.append("importPrice", capitalPrice);
        formData.append("salePrice", price);
        formData.append("importAmount", 10);
        formData.append("abbreviation", "VT");
        formData.append("description", "Description");
        formData.append("categoryId", category.id);

        try {
            const fetchData = async() => {
                const response = await addProduct(formData);
                if (response?.code == 0) {
                    ToastAndroid.show('Tạo sản phẩm thành công', ToastAndroid.SHORT);
                }
            }
            fetchData();
        }catch (e) {
            ToastAndroid.show('Tạo sản phẩm thất bại', ToastAndroid.SHORT);
        }
    }

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                </TouchableOpacity>
                <Text style={styles.title_header}>Tạo sản phẩm</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.image_product_container}>
                    <View style={{ width: '37%' }}>
                        <Button icon="cloud-upload" buttonColor='#ffffff' textColor='#22539e' style={[styles.button_upload, { marginBottom: 5 }]} mode="contained" onPress={() => console.log('Pressed')}>
                            Tải ảnh lên
                        </Button>
                        <Button icon="camera-image" buttonColor='#ffffff' textColor='#22539e' style={styles.button_upload} mode="contained" onPress={() => console.log('Pressed')}> Chụp ảnh
                        </Button>
                    </View>
                    <Image source={require('../assets/images/haohao.jpg')} style={styles.image_product} />
                </View>
                <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                    <TextInputCustom 
                        label='Tên sản phẩm' 
                        placeholder="Ví dụ: Mì Hảo Hảo" 
                        value={name} 
                        onChange={(text) => setName(text)} 
                        customStyle={{ marginBottom: 20 }}
                        required={true}
                        keyboardType='default' />
                    
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
                            <TextInputPrice 
                                label='Giá bán' 
                                value={price} 
                                onChange={(text) => setPrice(text)} 
                                required={true}
                            />
                        </View>
                    </View>
                    <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 20 }]}>
                        <View style={{ width: '45%' }}>
                            <TextInputPrice 
                                label='Giá khuyến mãi' 
                                value={bonusPrice} 
                                onChange={(text) => setBonusPrice(text)} 
                                required={false}
                            />
                        </View>
                    </View>
                    <Text style={{ color: '#7a7a7a', fontWeight: '600' }}>Danh mục</Text>
                    

                    <View style={[styles.display, { alignItems: 'center', paddingVertical: 10 }]}>
                        <TouchableOpacity 
                            onPress={() => {
                                refRBSheet.current.open();
                                setCreateCategory('select')}}>
                            <Image source={require('../assets/images/category.png')} style={{ width: 25, height: 25, marginRight: 15 }}/>
                        </TouchableOpacity>

                        {Object.keys(category).length > 0 && <View style={styles.category}>
                            <Text style={{ color: '#8e8e93'}}>{category.label}</Text>
                        </View>}
                       
                        <Button 
                            icon="plus" buttonColor='#ffffff' textColor='#22539e' 
                            style={[styles.button_upload, { marginRight: 15, width: 170 }]} mode="contained" 
                            onPress={() => {
                                refRBSheet.current.open();
                                setCreateCategory('create')}}>
                            Tạo danh mục
                        </Button>
                    </View>
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
                                height: createCategory == 'create' ? 200 : 400
                            }
                        }}
                    >
                        {createCategory == 'create' ? 
                            <ModalCreateCategory /> :
                            <ModalSelectCategory onSetCategory={handleCategory}/>}
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
                                onPressIn={() => setIsDatePickerExpirationDateVisible(true)}
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
                                label='Mã vạch' 
                                required={true} 
                                value={QR}
                                onChange={(text) => setQR(text)} 
                                keyboardType='default' />
                        </View>
                        <TouchableOpacity onPress={handleRandomBarCode}>
                            <Image source={require('../assets/images/pen.png')} style={styles.image_qr} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleScanQRCode}>
                            <Image source={require('../assets/images/qr_code.png')} style={styles.image_qr} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{ paddingHorizontal: 15 }}>
                {/* <ButtonCustom title="Hoàn tất" onPress={submitForm}/> */}
                <TwoButtonBottom 
                    titleLeft="Xóa" 
                    titleRight="Cập nhật" 
                    buttonColorLeft='transparent' 
                    buttonColorRight='#15803D' 
                    borderColorLeft='#c71313' 
                    textColorLeft='#c71313'
                    onBack={() => setShowModal(true)}
                />
            </View>
            {showModal && 
                <ModalConfirmation 
                    title="Xóa sản phẩm?" 
                    question="Bạn có chắc rằng muốn xóa sản phẩm?"
                    textYes="Xóa"
                    textNo="Quay lại"
                    onPressCancel={() => setShowModal(false)}
                />
            }
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