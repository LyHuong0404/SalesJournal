import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import ButtonCustom from "../components/ButtonCustom";
import TwoButtonBottom from "../components/TwoButtonBottom";
import { Button } from "react-native-paper";
import { RNCamera } from "react-native-camera";
import { useState } from "react";


const status = [
    {
      time: '09:00',
      title: 'Archery Training',
      description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
      lineColor:'#009688',
      icon: require('../assets/images/store.png'),
    },
    {
      time: '10:45',
      title: 'Play Badminton',
      description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
      icon: require('../assets/images/store.png'),
    },
    {
      time: '12:00',
      title: 'Lunch',
      icon: require('../assets/images/store.png'),
    }
]

function OrderDetail() {
    const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    // Xử lý sự kiện khi quét mã
    const handleBarCodeScanned = ({ data }) => {
      if (!scanned) {
        setScanned(true);
        setScannedData(data);
      }
    };

    // Khởi tạo đối tượng RNCamera
    const camera = RNCamera;
    
    // Đăng ký sự kiện quét mã
    camera.onBarCodeRead = handleBarCodeScanned;

    return () => {
      // Hủy đăng ký sự kiện khi component bị hủy
      camera.onBarCodeRead = null;
    };
  }, [scanned]);

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Chi tiết đơn</Text>
            </View>
            <View style={styles.horizontalLine} />
            <ScrollView>
                <View style={styles.content}>
                    <View style={[styles.display, styles.content_above, { justifyContent: 'space-between' }]}>
                        <View>
                            <Text style={styles.text_customer}>TCPKHB</Text>
                            <Text style={styles.text_info_order}>11:40 - 10/03 </Text>
                        </View>
                    {/* <Text style={styles.button_delivered}>Đã giao</Text> */}
                    <Text style={styles.button_processing}>Đang xử lý</Text>
                    </View>
                    <View style={styles.content_below}>
                        <View style={[styles.display, { alignItems: 'center', justifyContent: 'space-between' }]}>
                            <Text style={styles.total_price}>12.500</Text>
                            <View style={styles.button_send}>
                                <Text style={{ color: 'white', backgroundColor: '#15803D', padding: 10, borderRadius: 10, fontSize: 12 }} >Gửi hóa đơn</Text>
                            </View>
                        </View>
                        {/* <Text style={{ color: '#15803D', textAlign: 'right', fontSize: 12 }}>Đã thanh toán</Text> */}
                        {/* <Text style={{ color: '#eb9d0e', textAlign: 'right', fontSize: 12 }}>Thanh toán một phần</Text> */}
                        <Text style={{ color: '#d61212', fontSize: 12 }}>Chưa thanh toán</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={[styles.display, { marginVertical: 10, alignItems: 'center' }]}>
                        <View style={{ borderWidth: 1.5, borderColor: '#e2e5ea', borderRadius: 50, width: 50, height: 50, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                            <Image
                                source={require('../assets/images/user.png')}
                                style={{
                                width: 20,
                                height: 20,
                                objectFit: 'cover',
                                tintColor: '#15803D',
                                }}
                            />
                        </View>
                        <Text style={styles.text_customer}>Khách lẻ</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View>
                        <View style={[styles.display, styles.product_container ]}>
                            <Image source={require('../assets/images/haohao.jpg')} style={styles.image_product}/>
                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <Text style={styles.text_produt_name}>Bánh Slay tảo biển</Text>
                                <View style={[styles.display, { justifyContent: 'space-between' }]}>
                                    <Text style={{ color: '#9d9d9d', fontSize: 11 }}>SL: 
                                        <Text style={styles.text_number}> 1</Text>
                                    </Text>
                                    <Text style={styles.text_number}>8.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.price_container}>
                            <Text style={{ color: '#858585' }}>Tổng 2 sản phẩm</Text>
                            <Text style={{ color: '#565555'}}>10.000</Text>
                        </View>
                        <View style={styles.price_container}>
                            <Text style={{ color: '#858585' }}>Phí vận chuyển</Text>
                            <Text style={{ color: '#565555'}}>10.000</Text>
                        </View>
                        <View style={styles.price_container}>
                            <Text style={{ color: '#858585' }}>Chiết khấu</Text>
                            <Text style={{ color: '#565555'}}>-1.200</Text>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 5 }]}>
                            <Text style={{ fontWeight: '500' }}>Tổng cộng</Text>
                            <Text style={{ color: '#d81f1f', fontWeight: 'bold' }}>129.000</Text>
                        </View>
                        <View style={styles.price_container}>
                            <Text style={{ color: '#858585', fontSize: 12 }}>Khách còn nợ</Text>
                            <Text style={{ color: '#cb870b', fontSize: 12 }}>50.000</Text>
                        </View>
                        <Button icon="wallet-outline" mode="outlined" textColor="#22539e" buttonColor='transparent' onPress={() => console.log('Pressed')} style={styles.button_payment}>
                            Thanh toán trước
                        </Button>
                    </View>

                    <View style={styles.horizontalLine} />
                        
                    
                </View>
            </ScrollView>
            <TwoButtonBottom title1="Hủy" title2="Đã giao" />
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
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,  
        borderBottomColor: '#e5e5ea',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', 
        paddingHorizontal: 15,
    },
    price_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginVertical: 5
    },
    horizontalLine: { 
        height: 10, 
        backgroundColor: '#f2f2f5' 
    },
    button_payment: {
        borderWidth: 1,
        borderColor: '#22539e',
        borderRadius: 7,
        marginVertical: 10
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
    },
    product_container: {
        marginVertical: 10, 
        marginLeft: 10,
        borderBottomWidth: 0.7, 
        borderBottomColor: '#e5e5ea',
    },
    text_number: {
        fontSize: 11,
        fontWeight: '500', 
        color: '#3a3a3a'
    },
    text_produt_name: {
        fontWeight: '500', 
        marginBottom: 5, 
        color: '#3a3a3a'
    },
    image_product: {
        width: 100,
        height: 100,
        objectFit: 'contain',
        marginRight: 10
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
    },
    content_above: {
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdede'
    },
    content_below: {
        paddingVertical: 10,
    },
    button_delivered: {
        paddingHorizontal: 6, 
        fontSize: 12, 
        color: '#15803D', 
        backgroundColor: '#bbf0cf', 
        height: 24, 
        fontWeight: '500', 
        borderRadius: 10
    },
    total_price: {
        fontWeight: '500',
        fontSize: 30
    },
    text_customer: {
        fontWeight: '500', 
        color: '#3a3a3a', 
        marginBottom: 5
    },
    text_info_order: {
        color: '#565555', 
        fontSize: 12
    },
    button_processing: {
        paddingHorizontal: 6, 
        fontSize: 12, 
        color: '#cb870b', 
        backgroundColor: '#f8e9cc', 
        height: 24, 
        fontWeight: '500', 
        borderRadius: 10
    },
    button_action: {
        width: '49%',
        textAlign: 'center',
        paddingVertical: 5,
        borderRadius: 10,
        fontWeight: '500',
        fontSize: 11
    },
    button_send: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default OrderDetail;