import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { convertTimeStamp } from "../../utils/helper";

function OrderDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const [receipt, setReceipt] = useState(route.params?.receipt || {});

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Chi tiết hóa đơn</Text>
            </View>
            <View style={styles.horizontalLine} />
            <ScrollView>
                <View style={styles.content}>
                    <View style={[styles.display, styles.content_above, { justifyContent: 'space-between' }]}>
                        <View>
                            <Text style={styles.text_customer}>{`HD${receipt?.id}`}</Text>
                            <Text style={styles.text_info_order}>{`${receipt?.createdAtTime} - ${convertTimeStamp(receipt?.createdAtDate, 'dd/MM')}`}</Text>
                        </View>
                    <Text style={styles.button_delivered}>{receipt?.paymentMethod}</Text>
                    </View>
                    <View style={styles.content_below}>
                        <View style={[styles.display, { alignItems: 'center', justifyContent: 'space-between' }]}>
                            <Text style={styles.total_price}>{`${receipt?.finalPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                            <View style={styles.button_send}>
                            </View>
                        </View>
                        {(receipt?.receiptDetails.some((item) => item.coupon != null) || receipt?.coupon) && <Text style={{ color: '#cb870b', fontSize: 12 }}>Khuyến mãi</Text>}
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={{ marginBottom: 10 }}>
                        {receipt?.receiptDetails.map((item, index) => 
                            <View key={index} style={styles.product_container}>
                                <View style={{ marginVertical: 6 }}>
                                    <Text style={styles.text}>{`${index+1}.`} 
                                        <Text style={styles.text_produt_name}> {item?.productName}</Text>
                                    </Text>
                                </View>
                                <View style={[styles.display, { justifyContent: 'space-between' }]}>
                                    <Text style={styles.text_light}>{`${item?.salePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                    <Text style={styles.text_light}>{`x${item?.numberProduct}`}</Text>
                                    <Text style={styles.text_light}>{`${item?.actualPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.price_container}>
                            <Text style={{ color: '#858585' }}>
                                {`Tổng ${receipt?.receiptDetails.reduce((total, item) => {
                                    return total + item?.numberProduct;
                                }, 0)} sản phẩm`}</Text>
                            <Text style={{ color: '#565555'}}>{`${receipt?.totalSalePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                        </View>
                        {(receipt?.receiptDetails.some((item) => item.coupon != null) || receipt?.coupon) && <View style={styles.price_container}>
                            <Text style={{ color: '#858585' }}>Giảm giá</Text>
                            <Text style={{ color: '#565555'}}>{`${receipt?.finalPrice - receipt?.totalSalePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                        </View>}
                    </View>
                    <View>
                        <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 5 }]}>
                            <Text style={{ fontWeight: '500' }}>Tổng cộng</Text>
                            <Text style={{ color: '#d81f1f', fontWeight: 'bold' }}>{`${receipt?.finalPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                        </View>
                    </View>  
                </View>
            </ScrollView>
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
        backgroundColor: '#f6f6f8' 
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
        marginTop: 10, 
        marginLeft: 10,
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
    },
    text: {
        fontWeight: '500', 
        fontSize: 13,
        color: '#3a3a3a'
    },
    text_light: {
        color: '#565555', 
        fontSize: 12,
        fontWeight: '400', 
    }
})

export default OrderDetail;