import { StyleSheet, View, Text, Image } from "react-native";
import { memo } from "react";

import TwoButtonBottom from "../TwoButtonBottom";


function ModalTransactionDetail() {

    const handleSendConfirm = () => {}

    return (  
        <View style={styles.container}>
            <View style={[styles.display, { justifyContent: 'space-between', alignItems: 'center' }]}>
                <View style={[styles.display, { alignItems: 'center'}]}>
                    <Image source={require('../../assets/images/delete.png')} style={styles.icon_delete} />
                    <Text style={{ color: '#cb870b', fontWeight: '500' }}>Xóa</Text>
                </View>
                <Text style={{ fontWeight: 'bold', color: '#3a3a3a' }}>Chi tiết hóa đơn</Text>
                <Image source={require('../../assets/images/close.png')} style={styles.icon_close} />
            </View>
            <View style={{ marginVertical: 10, flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.display}>
                        {/* <Image source={require('../assets/images/plus_circle_outline.png')} style={styles.icon_plus} /> */}
                        <Image source={require('../../assets/images/minus_circle_outline.png')} style={styles.icon_plus} />
                        <View>
                            {/* <Text style={{ fontWeight: 'bold', color: '#3a3a3a' }}>Tôi đã nhận</Text> */}
                            <Text style={{ fontWeight: 'bold', color: '#3a3a3a' }}>Tôi đã đưa</Text>
                            <Text style={{ color: '#6f6f6f', fontSize: 10 }}>11:00 - 17/03/24</Text>
                        </View>
                    </View>
                    <Text style={{ color: '#b21414', fontWeight: '500', fontSize: 18 }}>25.000</Text>
                </View>
                <View style={{ marginTop: 15}}>
                    <Text style={{ fontWeight: '500', color: '#9a9a9a', fontSize: 12 }}>Khách hàng</Text>
                    <View style={[styles.display, { alignItems: 'center', marginTop: 5 }]}>
                        <Image source={require('../../assets/images/user_circle.png')} style={styles.icon_user}/>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Khách lẻ</Text>
                            <Text style={{ color: '#6f6f6f', fontSize: 11 }}>0123456789 </Text> 
                        </View>                     
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontWeight: '500', color: '#9a9a9a', fontSize: 12 }}>Ghi chú</Text>
                    <Text style={{ color: '#3a3a3a', marginTop: 5 }}>Thanh toán</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: '500', color: '#6f6f6f', fontSize: 12 }}>Giao dịch thanh toán</Text>
                    <View style={[styles.display, { justifyContent: 'space-between', alignItems: 'center'}]}>
                        <View style={{ marginVertical: 10}}>
                            <Text style={{ color: '#6f6f6f', fontSize: 10 }}>17/03/24</Text>
                            <Text style={{ color: '#3a3a3a' }}>Trả nợ đơn RGHKJE</Text>
                        </View>
                        <Image source={require('../../assets/images/left_arrow.png')} style={styles.icon_left_arrow} />
                    </View>
                </View>
            </View>
            <View style={{ flex: 0.2 }}>
                <TwoButtonBottom 
                    iconLeft="near-me"
                    onBack={handleSendConfirm} 
                    textColorLeft='#15803D'
                    titleLeft='Gửi xác nhận'
                    buttonColorLeft='transparent'
                    buttonColorRight='#15803D'
                    borderColorLeft='#15803D'
                    titleRight='Thanh toán'
                />
            </View>           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 15, 
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e5ea'
    },
    icon_delete: {
        width: 18,
        height: 18,
        objectFit: 'cover',
        tintColor: '#cb870b',
        marginRight: 5
    },
    icon_close: {
        width: 16,
        height: 16,
    },
    icon_plus: {
        width: 20,
        height: 22,
        alignItems: 'center',
        marginRight: 15,
    },
    icon_user: {
        width: 45,
        height: 45,
        objectFit: 'contain',
        tintColor: '#15803D',
        marginRight: 10
    },
    icon_left_arrow: {
        width: 25,
        height: 12,
        tintColor: '#2083c5'
    }
})

export default memo(ModalTransactionDetail);