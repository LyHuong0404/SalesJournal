import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useState } from "react";
import QRCode from 'react-native-qrcode-svg';

import ButtonCustom from "../components/ButtonCustom";
import { convertTimeStamp } from "../utils/helper";

function PaymentDetail() {
    const navigation = useNavigation();
    const { user } = useSelector((state) => state.auth);
    const route = useRoute();
    const [data, setData] = useState(route.params?.data || {});

    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('BottomNavigator')}>
                <View style={styles.header}>
                    <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Chi tiết hóa đơn</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <ScrollView>
                <View style={styles.content}>
                    <View style={[styles.display, { borderBottomWidth: 1.5 }]}>
                        <View style={{ marginVertical: 15, marginRight: 15 }}>
                            <QRCode
                                value={data?.id.toString()}
                                size={130}
                                color="black"
                                backgroundColor="white"
                            />
                        </View>
                        <View style={{ alignSelf: 'center'}}>
                            <Text style={{ fontWeight: 'bold', color: '#3a3a3a' }}>{user?.nameStore}</Text>
                            <View style={[styles.display, {alignItems: 'center'}]}>
                                <Image source={require('../assets/images/earth.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginRight: 5 }} />
                                <Text style={{ fontStyle: 'italic', color: '#565555' }}>0123456789.taphoa.so</Text>
                            </View>
                            <Text style={{ color: '#565555' }}>0123456789</Text>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: '500', color: '#3a3a3a' }}>HÓA ĐƠN BÁN HÀNG</Text>
                            <Text style={{color: '#565555', fontSize: 12 }}>{`EUNAAB - ${convertTimeStamp(data?.createdAtDate, 'dd/MM/yyyy')} ${data?.createdAtTime}`}</Text>  
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
                        {data?.receiptDetails.map((item, index) => 
                            <View key={index}>
                                <View style={{ marginVertical: 6 }}>
                                    <Text style={[styles.text_amount, { fontWeight: '500' }]}>{index + 1}. 
                                        <Text style={[styles.text_light, { fontWeight: '500', fontSize: 12 }]}> {item?.productName}</Text>
                                    </Text>
                                </View>
                                <View style={[styles.display, { justifyContent: 'space-between' }]}>
                                    <Text style={styles.text_amount}>{`${item?.actualPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                    <Text style={styles.text_amount}>x{item?.numberProduct}</Text>
                                    <Text style={styles.text_amount}>{`${item?.numberProduct * item?.actualPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                </View>
                                {item?.coupon && <View style={[styles.display, { marginHorizontal: 20 }]}>
                                    <Text style={[styles.text_amount, { marginRight: 20 }]}>Giá gốc: </Text>
                                    <Text style={styles.text_amount}>{`${item?.salePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                </View>}
                            </View>
                        )}
                    </View>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderStyle: 'dashed' }}>
                        <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 2 }]}>
                            {/* <Text style={[styles.text_light, { color: '#565555'}]}>
                                {`Tổng ${data?.receiptDetails.reduce((total, item) => {
                                    return total + item?.numberProduct;
                                }, 0)} sản phẩm`}
                            </Text> */}
                            {/* <Text style={styles.text}>26.000 ₫</Text> */}
                        </View>
                        <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 2 }]}>
                            {data?.receiptDetails.every((item) => item.coupon != null) && <>
                                <Text style={[styles.text_light, { color: '#565555'}]}>Tổng đơn gốc</Text>
                                <Text style={styles.text}>{`${data?.totalSalePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫</Text>
                            </>}
                        </View>
                        <View style={[styles.display, { marginBottom: 2 }]}>
                            {data?.receiptDetails.every((item) => item.coupon != null) && <>
                                <Text style={[styles.text_light, { color: '#565555', width: '40%' }]}>Giảm giá</Text>
                                 
                                <View style={{ flex: 1 }}>
                                    {data?.receiptDetails.map((item, index) =>
                                        <View key={index} style={[styles.display, { justifyContent: 'space-between', marginBottom: 2 }]}>
                                            {item.coupon && 
                                                <>
                                                    <View style={styles.coupon_container}>
                                                        <Text style={styles.name_coupon}>{item.coupon?.couponDescription}</Text>
                                                    </View>
                                                    <Text style={styles.text}>-{`${(item.salePrice - item.actualPrice) * item.numberProduct}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫</Text>
                                                </>
                                            }
                                        </View> 
                                    )}
                                </View> 
                            </>}          
                        </View>
                        <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 2 }]}>
                            <Text style={styles.text}>Tổng cộng</Text>
                            <Text style={styles.text}>{`${data?.finalPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫</Text>
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
                title="Trang chủ" 
                customStyle={{ marginHorizontal: 15 }} 
                onPress={() => navigation.navigate('BottomNavigator')}
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
    coupon_container: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#15803D',
        borderStyle: 'dashed',
        borderRadius: 3,
        height: 15
    },
    name_coupon: {
        fontSize: 7,
        fontWeight: '500',
        color: '#15803D',
        paddingHorizontal: 5,
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
        fontSize: 14,
        fontWeight: '400', 
        marginBottom: 4
    },
    text_amount: {
        color: '#565555', 
        fontSize: 12,
        fontWeight: '400', 
    }
})

export default PaymentDetail;