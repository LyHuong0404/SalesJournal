import { View, StyleSheet, Text, Button } from "react-native";


function OrderItem() {
    return (  
        <View style={styles.container}>
            <View style={[styles.display, styles.content_above]}>
                <View>
                    <Text style={styles.text_customer}>Khách lẻ</Text>
                    <Text style={styles.text_info_order}>11:40 10/03 - TCPKHB</Text>
                </View>
                {/* <Text style={styles.button_delivered}>Đã giao</Text> */}
                <Text style={styles.button_processing}>Đang xử lý</Text>

            </View>
            <View style={styles.content_below}>
                <View style={styles.display}>
                    <Text>Tổng cộng</Text>
                    <Text style={styles.total_price}>12.500</Text>
                </View>
                {/* <Text style={{ color: '#15803D', textAlign: 'right', fontSize: 12 }}>Đã thanh toán</Text> */}
                {/* <Text style={{ color: '#eb9d0e', textAlign: 'right', fontSize: 12 }}>Thanh toán một phần</Text> */}
                {/* <Text style={{ color: '#d61212', textAlign: 'right', fontSize: 12 }}>Chưa thanh toán</Text> */}
                <Text style={{ color: '#d61212', textAlign: 'right', fontSize: 12 }}>Đã ghi nợ</Text>    {/*chưa thanh toán gì */}
            </View>

            {/* button */}
            <View style={styles.button_group}>
                <View style={styles.display}>
                    <View style={styles.button_action_container}>
                        <Text style={[styles.button_action, { color: '#787878', borderColor: '#888888', borderWidth: 1 }]} >Hủy bỏ</Text>
                    </View>
                    <View style={styles.button_action_container}>
                        <Text style={[styles.button_action, { color: 'white', backgroundColor: '#15803D'}]} >Đã giao</Text>
                    </View>
                    {/* <Text style={[styles.button_action, { color: '#787878', borderColor: '#888888', borderWidth: 1 }]} >Hủy bỏ</Text>
                    <Text style={[styles.button_action, { color: 'white', backgroundColor: '#15803D' }]} >Đã giao</Text> */}
                </View>
            </View>
        </View>
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
    button_processing: {
        paddingHorizontal: 6, 
        fontSize: 12, 
        color: '#cb870b', 
        backgroundColor: '#f8e9cc', 
        height: 24, 
        fontWeight: '500', 
        borderRadius: 10
    },
    button_group: {
        paddingVertical: 10, 
    },
    button_action_container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_action: {
        paddingVertical: 4, 
        borderRadius: 8, 
        fontSize: 11, 
        paddingHorizontal: '18%', 
        fontWeight: '500'
    }
});

export default OrderItem;