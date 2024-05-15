import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView} from "react-native";
import { useNavigation  } from "@react-navigation/native";



function SaleType() {
    const navigation = useNavigation();

    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.header}>
                    <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Quản lý khuyến mãi</Text>             
                </View>
            </TouchableOpacity>
            <View>
                <Text style={{ fontWeight: '500', color: '#6f6f6f', paddingLeft: 15, marginTop: 15, marginBottom: 5 }}>Chọn để bắt đầu tạo</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CreateCoupon', { proviso: 'BY_PRODUCT' })}>
                    <View style={styles.sale_item_container}>
                        <Image source={require('../../assets/images/tag.png')} style={{ width: 20, height: 20, objectFit: 'contain', flex: 0.1 }}/>
                        <View style={{ flex: 0.8 }}>
                            <Text style={styles.sale_item_name}>Ưu đãi khi mua nhiều</Text>             
                            <Text style={styles.text_light}>Giảm giá cho khách khi mua nhiều sản phẩm</Text>             
                            <Text style={styles.text_light}>Ví dụ: Giảm 100k khi mua từ 4 sản phẩm</Text>             
                        </View>
                        <Image source={require('../../assets/images/left_arrow.png')} style={{ height: 12, tintColor: '#6f6f6f', flex: 0.1 }} />
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => navigation.navigate('CreateCoupon')}>
                    <View style={styles.sale_item_container}>
                        <Image source={require('../../assets/images/gift_outline.png')} style={{ width: 20, height: 20, objectFit: 'contain', flex: 0.1 }}/>
                        <View style={{ flex: 0.8 }}>
                            <Text style={styles.sale_item_name}>Sản phẩm tặng kèm</Text>             
                            <Text style={styles.text_light}>Tặng kèm theo giá trị đơn hoặc sản phẩm mua</Text>             
                            <Text style={styles.text_light}>Ví dụ: Tặng áo thun khi đơn mua tối thiểu 100k</Text>             
                        </View>
                        <Image source={require('../../assets/images/left_arrow.png')} style={{ height: 12, tintColor: '#6f6f6f', flex: 0.1 }} />
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => navigation.navigate('CreateCoupon', { proviso: 'BY_RECEIPT' })}>
                    <View style={styles.sale_item_container}>
                        <Image source={require('../../assets/images/gift_voucher.png')} style={{ width: 24, height: 24, objectFit: 'contain', flex: 0.1 }}/>
                        <View style={{ flex: 0.8 }}>
                            <Text style={styles.sale_item_name}>Giảm giá đơn hàng</Text>             
                            <Text style={styles.text_light}>Giảm giá đơn hàng cho khách khi đạt giá trị</Text>             
                            <Text style={styles.text_light}>Ví dụ: Giảm 10k cho đơn từ 100k</Text>             
                        </View>
                        <Image source={require('../../assets/images/left_arrow.png')} style={{ height: 12, tintColor: '#6f6f6f', flex: 0.1 }} />
                    </View>
                </TouchableOpacity>
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7f8',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    sale_item_container: {
        display: 'flex',
        height: 'auto',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea',
    },
    sale_item_name: {
        fontWeight: '500', 
        color: '#3a3a3a', 
        fontSize: 13, 
        marginBottom: 5
    },
    text_light: {
        fontSize: 10,
        color: '#6f6f6f'
    }
    
})

export default SaleType;