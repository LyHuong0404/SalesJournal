import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useState, useRef } from "react";
import ButtonCustom from "../components/ButtonCustom";
import TextInputCustom from "../components/TextInputCustom";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import RBSheet from "react-native-raw-bottom-sheet";
import ModalCreateCategory from "../components/ModalCreateCategory";
import ModalSelectCategory from "../components/ModalSelectCategory";
import { RNCamera } from 'react-native-camera';
import { useNavigation } from "@react-navigation/native";


function CreateProduct() {
    const navigation = useNavigation();
    const refRBSheet = useRef();
    const [createCategory, setCreateCategory] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [capitalPrice, setCapitalPrice] = useState('');
    const [category, setCategory] = useState('');
    const [inputDay, setInputDay] = useState(format(new Date(Date.now()), 'dd/MM/yyyy'));
    const [expirationDate, setExpirationDate] = useState('');
    const [QR, setQR] = useState('');
    const [isDatePickerInputVisible, setDatePickerInputVisibility] = useState(false);
    const [isDatePickerExpirationDateVisible, setIsDatePickerExpirationDateVisible] = useState(false);

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

    const handleConfirm = (date) => {
        if (isDatePickerInputVisible) {
            setInputDay(format(new Date(date), 'dd/MM/yyyy'));
        } else {
            setExpirationDate(format(new Date(date), 'dd/MM/yyyy'));
        }
        hideDatePicker();
    };

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
                    
                    <View style={[styles.display, { justifyContent: 'space-between' }]}>
                        <View style={{ width: '45%' }}>
                            <TextInputCustom 
                                label='Giá bán' 
                                placeholder="0.000" 
                                value={price} 
                                onChange={(text) => setPrice(text)} 
                                customStyle={{ marginBottom: 20 }}
                                required={true}
                                keyboardType='numeric' />
                        </View>
                        <View style={{ width: '45%' }}>
                            <TextInputCustom 
                                label='Giá vốn' 
                                placeholder="0.000" 
                                value={capitalPrice} 
                                onChange={(text) => setCapitalPrice(text)} 
                                customStyle={{ marginBottom: 20 }}
                                required={true}
                                keyboardType='numeric' />
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
                            <ModalSelectCategory />}
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
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
    
                        <View style={{ width: '45%' }}>
                            <TextInputCustom
                                label='Ngày hết hạn'
                                required={true}
                                placeholder="Select a date"
                                value={expirationDate} 
                                onPressIn={() => setIsDatePickerExpirationDateVisible(true)}
                            />
                            <DateTimePicker
                                isVisible={isDatePickerExpirationDateVisible}
                                mode="date"
                                onConfirm={handleConfirm}
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
                        <TouchableOpacity>
                            <Image source={require('../assets/images/pen.png')} style={styles.image_qr} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleScanQRCode}>
                            <Image source={require('../assets/images/qr_code.png')} style={styles.image_qr} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{ paddingHorizontal: 15 }}>
                <ButtonCustom title="Hoàn tất" />
            </View>
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
    }
})

export default CreateProduct;