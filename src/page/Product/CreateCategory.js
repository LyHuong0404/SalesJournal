import { StyleSheet, View, TouchableOpacity, Image, Text, ToastAndroid } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";

import { addCategory, updateCategory } from "../../actions/seller/categoryActions";
import TextInputCustom from "../../components/TextInputCustom";
import TextInputPrice from "../../components/TextInputPrice";
import ButtonCustom from "../../components/ButtonCustom";
import ModalCameraScreen from "../../components/Modal/ModalCameraScreen";
import LoadingSpinner from "../../components/LoadingSpinner";


function CreateCategory() {
    const navigation = useNavigation();
    const refRBSheet = useRef();
    const route = useRoute();
    const paramUrl = route.params?.url;
    const [category, setCategory] = useState(route.params?.category || '')
    const [salePrice, setSalePrice] = useState(category?.salePrice?.toString() || '');
    const [name, setName] = useState(category?.name || '');
    const [url, setUrl] = useState(category?.avatar || paramUrl);
    const [categoryId, setCategoryId] = useState(category?.id || '');
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState(route?.params?.action || '');

    useEffect(() => {
        if (paramUrl) {
            setUrl(paramUrl);
        }
    }, [paramUrl])

    const handleChooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if (result.canceled === false) {
            setUrl(result.assets[0].uri);
        } else {}
    };

    
    const submitForm = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('salePrice', salePrice.toString().includes('.') ? salePrice.toString().replace(/\./g, ""): salePrice);
        if (url) {
            let imageType = '';
            const lastDotIndex = url.lastIndexOf(".");
            if (lastDotIndex !== -1) {
                imageType = url.substring(lastDotIndex + 1); 
            } else {
                console.log("Không tìm thấy dấu chấm trong chuỗi.");
            }
            formData.append('avatarFile', {
                uri: url,
                name: 'image.' + imageType,
                type: 'image/' + imageType,
            });
        }
     
        try{ 
            const fetchApi = async() => {
                setLoading(true);
                let response;
                if (category) {
                    formData.append('productId', categoryId);
                    response = await updateCategory(formData);
                } else {
                    response = await addCategory(formData);
                }
                if (response?.code == 0) {
                    ToastAndroid.show('Lưu sản phẩm thành công', ToastAndroid.SHORT);
                    if (action == 'CreatingProduct') {
                        navigation.navigate('CreateProduct');
                    } else navigation.navigate('ProductManagement', { index: 1 });
                } else {
                    ToastAndroid.show('Lưu sản phẩm không thành công', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchApi();
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Lưu sản phẩm không thành công', ToastAndroid.SHORT);
        }
    }
    
    return (  
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                </TouchableOpacity>
                <Text style={styles.title_header}>{category ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}</Text>
            </View>
            <View style={styles.image_container}>
                <View style={{ width: '37%' }}>
                    <Button 
                        icon="cloud-upload" 
                        buttonColor='#ffffff' 
                        textColor='#22539e' 
                        style={[styles.button_upload, { marginBottom: 5 }]} 
                        mode="contained" 
                        onPress={handleChooseImage}>
                        Tải ảnh lên
                    </Button>
                    <Button 
                        icon="camera-image" 
                        buttonColor='#ffffff' 
                        textColor='#22539e' 
                        style={styles.button_upload} 
                        mode="contained" 
                        onPress={() => refRBSheet?.current.open()}> Chụp ảnh
                    </Button>
                </View>
                <Image source={{ uri: url }} style={styles.image_category} />
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
            </View>
            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                <TextInputPrice 
                    label='Giá bán' 
                    value={salePrice} 
                    onChange={(text) => setSalePrice(text)} 
                    required={true}
                />
            </View>
            <View style={styles.bottomButtonContainer}>
                <ButtonCustom 
                    title='Hoàn tất' 
                    disabled={!url || !name || !salePrice}
                    onPress={submitForm}
                    style={styles.bottomButton}
                    labelStyle={{ color: '#ffffff' }}>
                </ButtonCustom>
            </View>
            <RBSheet
                ref={refRBSheet}
                customStyles={{               
                    container: {
                      height: '100%'
                    }
                }}
            >
                <ModalCameraScreen actor='CreateCategory' close={() => refRBSheet?.current.close()} />
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
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea'
    },
    title_header: {
        fontWeight: 'bold', 
        flex: 1,
        textAlign: 'center',
    },
    image_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center space-between',
        alignItems: 'center',
        height: 120,
        backgroundColor: '#f2f2f5',
        marginHorizontal: 15,
    },
    button_upload: {
        borderRadius: 10,
        padding: 0,
        borderWidth: 1,
        borderColor: '#22539e',
    },
    image_category: {
        width: '100%',
        height: '85%',
        objectFit: 'contain',
        flex: 0.6,
        marginLeft: 25
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
    }
})

export default CreateCategory;