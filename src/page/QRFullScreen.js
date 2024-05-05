import { StyleSheet, View, TouchableOpacity, Image, Text, LogBox, ToastAndroid } from "react-native";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import TwoButtonBottom from "../components/TwoButtonBottom";
import { getImportProductByCode, getProductByCode } from "../actions/seller/productActions";
import Loading from "../components/Loading";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const containerStyle = {backgroundColor: 'white', margin: 20, height: 'auto', borderRadius: 7 };

function QRFullScreen({ ArrayQRAndAmount, onScanSuccess, action, close }) {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleCamera, setVisibleCamera] = useState(true);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

  
    const handleBarCodeScanned = ({ type, data }) => {
        if(data) {
            if (action == 'ProductDetail') {
                try {
                    const fetchData = async () => {
                        const response = await getProductByCode(data);
                        if (response) {
                            navigation.navigate('CreateCategory', { category: response });
                        } else {
                            ToastAndroid.show('Lỗi khi quét sản phẩm', ToastAndroid.SHORT);
                        }
                        onScanSuccess();
                    }
                    fetchData();
                } catch (err) {
                    ToastAndroid.show('Lỗi khi quét sản phẩm', ToastAndroid.SHORT);
                }
            } 
            else if (action == 'ImportProductDetail') {
                try {
                    const fetchData = async () => {
                        const response = await getImportProductByCode(data);
                        if (response?.data) {
                            navigation.navigate('ImportProductInfo', { product: response?.data });
                        } else {
                            ToastAndroid.show('Lỗi khi quét sản phẩm', ToastAndroid.SHORT);
                        }
                        onScanSuccess();
                    }
                    fetchData();
                } catch (err) {
                    ToastAndroid.show('Lỗi khi quét sản phẩm', ToastAndroid.SHORT);
                }
            } else {
                //check exist code 
                const index = Array.isArray(ArrayQRAndAmount) ? ArrayQRAndAmount.findIndex((item) => item?.product?.code == data) : -1;
                if (index == -1) {
                    try {
                        const fetchData = async() => {
                            setLoading(true);
                            const response = await getProductByCode(data);
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
    
                setVisibleCamera(!visibleCamera);
                setVisibleModal(!visibleModal);
            }
        } else {
            ToastAndroid.show('Lỗi khi quét sản phẩm', ToastAndroid.SHORT);
        }
    };

    const handleContinues = () => {
        setVisibleCamera(!visibleCamera);
        setVisibleModal(!visibleModal);
    }

    const handlePayment = () => {
        navigation.navigate('OrderConfirmation');
    }

    return ( 
      <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={close}>
                <Image source={require('../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Quét mã sản phẩm</Text>
        </View>
        {hasPermission === false && <Text>No access to camera</Text>}
        {hasPermission === null && <Text>Requesting for camera permission</Text>}
        {hasPermission === true && visibleCamera && (
            <Camera
                style={styles.preview}
                type={Camera.Constants.Type.back}
                onBarCodeScanned={handleBarCodeScanned}
                >
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, alignSelf: 'center', alignItems: 'center' }} >
                    <Image source={require('../assets/images/square.png')} style={{ width: 280, height: 280 }}/>
                    </TouchableOpacity>
                </View>
            </Camera>
        )}
        {loading && <Loading />}

            {/* <Modal visible={visibleModal} contentContainerStyle={containerStyle}>
                <View style={styles.container_modal}>
                    <Text style={{ fontWeight: '500', color: error ? '#c71313' : 'black', textAlign: 'center', marginBottom: 20 }}>{error ? 'Mã sản phẩm không tồn tại' : 'Quét mã thành công'}</Text>
                        
                    <TwoButtonBottom 
                        titleLeft="Tiếp tục" 
                        titleRight="Thanh toán" 
                        buttonColorLeft='transparent' 
                        textColorLeft='#15803D' 
                        buttonColorRight='#15803D' 
                        borderColorLeft='#15803D' 
                        onBack={handleContinues}
                        onPressRight={handlePayment}
                    />
                </View>
            </Modal> */}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  container_modal: {
    paddingVertical: 25,
    paddingHorizontal: 10
  }

})

export default QRFullScreen;