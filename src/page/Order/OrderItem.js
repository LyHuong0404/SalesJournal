import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";

import { convertTimeStamp } from "../../utils/helper";

function OrderItem({ receipt }) {
    const navigation = useNavigation();
    
    return (  
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('OrderDetail', { receipt })}>
            <View style={[styles.display, styles.content_above]}>
                <View>
                    <Text style={styles.text_customer}>Khách lẻ</Text>
                    <Text style={styles.text_info_order}>{`${convertTimeStamp(receipt?.createdAtDate, 'dd/MM')} ${receipt?.createdAtTime} - HD${receipt?.id}`}</Text>
                </View>
                <Text style={styles.button_delivered}>{receipt?.paymentMethod}</Text>

            </View>
            <View style={styles.content_below}>
                <View style={styles.display}>
                    <Text>Tổng cộng</Text>
                    <Text style={styles.total_price}>{`${receipt?.finalPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                </View>
                {(receipt?.receiptDetails.some((item) => item.coupon != null) || receipt?.coupon) && <Text style={{ color: '#cb870b', textAlign: 'right', fontSize: 12 }}>Khuyến mãi</Text>}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 10,
        height: 'auto',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 2
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        fontWeight: 'bold',
        fontSize: 15
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
});

export default OrderItem;