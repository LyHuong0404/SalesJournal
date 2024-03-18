import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import ButtonCustom from "../components/ButtonCustom";


function PaymentDetail() {


    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Chi tiết hóa đơn</Text>
            </View>
            <View style={styles.horizontalLine} />
            <ScrollView>
                <View style={styles.content}>
                    <View style={[styles.display, { borderBottomWidth: 1.5 }]}>
                        <Image source={require('../assets/images/fakeQR.jpg')}  style={{ width: 140, height: 140, objectFit: 'contain' }} />
                        <View style={{ alignSelf: 'center'}}>
                            <Text style={{ fontWeight: 'bold', color: '#3a3a3a' }}>Cửa Hàng Tạp Hóa</Text>
                            <View style={[styles.display, {alignItems: 'center'}]}>
                                <Image source={require('../assets/images/earth.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginRight: 5 }} />
                                <Text style={{ fontStyle: 'italic', color: '#565555' }}>0123456789.taphoa.so</Text>
                            </View>
                            <Text style={{ color: '#565555' }}>0123456789</Text>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: '500', color: '#3a3a3a' }}>HÓA ĐƠN TẠM TÍNH</Text>
                            <Text style={{color: '#565555', fontSize: 12 }}>EUNAAB - 10/03/24 11:44</Text>  
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <View style={[styles.display, { marginBottom: 5 }]}>
                                <Text style={{ flex: 0.4, color: '#565555'}}>Khách:</Text>
                                <Text style={[styles.text, { flex: 1 }]}>Thu</Text>
                            </View>
                            <View style={styles.display}>
                                <Text style={{ flex: 0.4, color: '#565555'}}>SĐT:</Text>
                                <Text style={[styles.text, { flex: 1 }]}>0888484545</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderStyle: 'dashed' }}>
                        <View style={[styles.display, { justifyContent: 'space-between' }]}>
                            <Text style={styles.text}>Đơn giá</Text>
                            <Text style={styles.text}>SL</Text>
                            <Text style={styles.text}>T.Tiền</Text>
                        </View>
                        <View>
                            <View style={{ marginVertical: 6 }}>
                                <Text style={styles.text}>1. 
                                    <Text style={styles.text_light}> Kem socola vani nhân dâu Iberri cây 68g sầu riêng</Text>
                                </Text>
                            </View>
                            <View style={[styles.display, { justifyContent: 'space-between' }]}>
                                <Text style={styles.text_light}>14.000</Text>
                                <Text style={styles.text_light}>x1</Text>
                                <Text style={styles.text_light}>14.000</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ marginVertical: 6 }}>
                                <Text style={styles.text}>2. 
                                    <Text style={[styles.text_light, { fontWeight: '400', fontSize: 14 }]}> Kem socola vani nhân dâu Iberri cây 100g sầu riêng</Text>
                                </Text>
                            </View>
                            <View style={[styles.display, { justifyContent: 'space-between' }]}>
                                <Text style={styles.text_light}>25.000</Text>
                                <Text style={styles.text_light}>x2</Text>
                                <Text style={styles.text_light}>50.000</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderStyle: 'dashed' }}>
                        <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 2 }]}>
                            <Text style={[styles.text_light, { color: '#565555'}]}>Tạm tính</Text>
                            <Text style={styles.text}>26.000 ₫</Text>
                        </View>
                        <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 2 }]}>
                            <Text style={[styles.text_light, { color: '#565555'}]}>Phí vận chuyển</Text>
                            <Text style={styles.text}>10.000 ₫</Text>
                        </View>
                        <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 2 }]}>
                            <Text style={[styles.text_light, { color: '#565555'}]}>Chiết khấu</Text>
                            <Text style={styles.text}>-1.200 ₫</Text>
                        </View>
                        <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 2 }]}>
                            <Text style={styles.text}>Tổng cộng</Text>
                            <Text style={styles.text}>26.000 ₫</Text>
                        </View>
                        <View style={[styles.display, { justifyContent: 'space-between' }]}>
                            <Text style={styles.text_light}>Chưa thanh toán</Text>
                            <Text style={styles.text}>12.000 ₫</Text>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderStyle: 'dashed' }}>
                        <Text style={[styles.text_light, { textAlign: 'center' }]}>Thanh toán tiền mặt hoặc chuyển khoản</Text>
                    </View>
                    <View style={{ paddingVertical: 20, alignSelf: 'center' }}>
                        <Text style={{color: '#565555', fontSize: 12 }}>Bán hàng chuyên nghiệp bằng ứng dụng</Text>  
                        <View style={[styles.display, { justifyContent: 'center', alignItems: 'center', marginVertical: 5 }]}>
                            <Image source={require('../assets/images/bottom3_active.png')}  style={{ width: 30, height: 30, objectFit: 'contain', marginRight: 5 }} />
                            <Text style={{ color: '#15803D', fontWeight: 'bold', fontSize: 16 }}>SoBanHang</Text>
                        </View>
                        <Text style={styles.text}>Cảm ơn quý khách và hẹn gặp lại.</Text>
                    </View>
                </View>
            </ScrollView>
            <ButtonCustom 
                title="Tạo đơn mới" 
                customStyle={{ marginHorizontal: 15 }} 
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
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,  
        borderBottomColor: '#e5e5ea',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', 
        paddingHorizontal: 15,
    },
    horizontalLine: { 
        height: 10, 
        backgroundColor: '#f2f2f5' 
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
    },
    display: {
        display: 'flex',
        flexDirection: 'row'
    },
    text: {
        fontWeight: '500', 
        color: '#3a3a3a'
    },
    text_light: {
        color: '#565555', 
        fontSize: 12,
        fontWeight: '400', 
        fontSize: 14
    }
})

export default PaymentDetail;