import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";


import { getImportProductByCode, getProductByCode } from '../actions/seller/productActions';
import { Audio } from 'expo-av';
import LoadingSpinner from '../components/LoadingSpinner';

export default function QRDemo({ ArrayQRAndAmount, onScanSuccess, action, close }) {
    const navigation = useNavigation();
    const [permission, requestPermission] = useCameraPermissions();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(true);

    let currentScanResult = null;
    if (!permission) {
        return <LoadingSpinner />
    }

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync( require('../../assets/sound/scanner-beep.mp3'));
        sound.playAsync();
      }
    
    if (!permission.granted) {
        const checkCameraPermission = async () => {
            try {
              const status = await requestPermission();
              if (status?.status === 'denied') {
                close();
              }
            } catch (error) {
              console.error('camera', error);
            }
        };        
        checkCameraPermission();
    }
    
    
    const handleBarCodeScanned = (scanningResult) => {
        if(scanningResult != currentScanResult) {
            currentScanResult = scanningResult;
            playSound();
        }
        else {
            return;
        }
        setCameraOpen(!cameraOpen);
        if(scanningResult) {            
            if (action == 'ProductDetail') {
                try {
                    const fetchData = async () => {
                        setLoading(true);
                        const response = await getProductByCode(scanningResult);
                        if (response) {
                            navigation.navigate('CreateCategory', { category: response });
                        } else {
                            ToastAndroid.show('Mã sản phẩm không tồn tại', ToastAndroid.SHORT);
                        }
                        onScanSuccess();
                        setLoading(false);
                    }
                    fetchData();
                } catch (err) {
                    ToastAndroid.show('Lỗi khi quét sản phẩm', ToastAndroid.SHORT);
                }
            } 
            else if (action == 'ImportProductDetail') {
                try {
                    const fetchData = async () => {
                        setLoading(true);
                        const response = await getImportProductByCode(scanningResult);
                        if (response?.data) {
                            navigation.navigate('ImportProductInfo', { product: response?.data });
                        } else {
                            ToastAndroid.show('Mã sản phẩm không tồn tại', ToastAndroid.SHORT);
                        }
                        onScanSuccess();
                        setLoading(false);
                    }
                    fetchData();
                } catch (err) {
                    ToastAndroid.show('Lỗi khi quét sản phẩm', ToastAndroid.SHORT);
                }
            } else if (action == 'ScanQR') {
                try {
                    setLoading(true);
                    onScanSuccess(scanningResult);
                    setLoading(false);
                } catch (err) {
                    ToastAndroid.show('Thử lại', ToastAndroid.SHORT);
                }
            } else if (action == 'ScanCustomerInfo') {
                onScanSuccess(scanningResult);
            } else {
                //check exist code 
                const index = Array.isArray(ArrayQRAndAmount) ? ArrayQRAndAmount.findIndex((item) => item?.product?.code == scanningResult) : -1;
                if (index == -1) {
                    try {
                        const fetchData = async() => {
                            setLoading(true);
                            const response = await getProductByCode(scanningResult);
                            if (response) {
                                const newFormatProductDisplay = { product: response, amount: 1 }
                                if (ArrayQRAndAmount == undefined) {
                                    onScanSuccess();
                                    navigation.navigate('OrderConfirmation', { firstProduct: [newFormatProductDisplay] })
                                } else {
                                    onScanSuccess(newFormatProductDisplay)
                                }
                            } else {
                                onScanSuccess('');
                                ToastAndroid.show('Mã sản phẩm không tồn tại', ToastAndroid.SHORT);
                            }
                            setLoading(false);
                        }
                        fetchData();
                    } catch (err) {
                        setLoading(false);
                        setError(true);
                    }
                } else {
                    setLoading(false);
                    onScanSuccess(index);
                }
            }
        } else {
            ToastAndroid.show('Lỗi khi quét sản phẩm', ToastAndroid.SHORT);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={close}>
                    <Image source={require('../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>{action == 'ScanCustomerInfo' ? 'Quét mã khách hàng' : 'Quét mã sản phẩm'}</Text>
            </View>
            {cameraOpen && 
                <CameraView 
                    style={styles.camera} 
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "aztec", "ean13", "ean8", "pdf417", "upc_e", "datamatrix", "code39", "code93", "itf14", "codabar", "code128", "upc_a"],
                    }}
                    onBarcodeScanned={(scanningResult) => handleBarCodeScanned(scanningResult?.data)}
                >
                    <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flex: 1, alignSelf: 'center', alignItems: 'center' }} >
                        <Image source={require('../assets/images/square.png')} style={{ width: 280, height: 280 }}/>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            }
            {loading && <LoadingSpinner />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', 
        paddingHorizontal: 15,
        backgroundColor: 'transparent',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});