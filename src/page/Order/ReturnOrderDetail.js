import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ToastAndroid } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

import { convertTimeStamp } from "../../utils/helper";

function ReturnOrderDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const [receipt, setReceipt] = useState(route.params?.receipt || {});
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const viewRef = useRef();
    
    useEffect(() => {
        if (receipt.returnProducts.length > 0 || receipt.receiptDetails.length > 0) {
            receipt.receiptDetails.map((item) => {
                receipt.returnProducts.map((i) => {
                    if (i.productId == item.productId) {
                        item.numberProduct = item.numberProduct + 1;
                        receipt.finalPrice = receipt.finalPrice + item.actualPrice;
                        receipt.totalSalePrice = receipt.totalSalePrice + item.salePrice;
                    }
                })
            })
           
            const result = receipt.returnProducts.filter(a => !receipt.receiptDetails.some(b => b.productId === a.productId));
            if (result.length > 0) {
                result.map((product) => {
                    receipt.receiptDetails.push(product);
                    receipt.finalPrice = receipt.finalPrice + (product.actualPrice * product.numberProduct);
                    receipt.totalSalePrice = receipt.totalSalePrice + (product.salePrice * product.numberProduct);
                })
            }
            
            if (receipt.receiptDetails.length == 0) {
                receipt.receiptDetails = receipt.returnProducts;
                receipt.receiptDetails.map((item) => {
                    receipt.finalPrice = receipt.finalPrice + item.actualPrice;
                    receipt.totalSalePrice = receipt.totalSalePrice + item.salePrice;
                })
            }
            setReceipt(receipt);
        }       
    }, [])

    const takeScreenshot = async () => {
        try {
            let permission = status;
        if (!permission?.granted) {
                permission = await requestPermission();
            }
          const uri = await captureRef(viewRef, {
            format: 'png',
            quality: 0.8,
          });
    
          if (permission?.granted) {
            const asset = await MediaLibrary.createAssetAsync(uri);
            await MediaLibrary.createAlbumAsync('Screenshots', asset, false);
            ToastAndroid.show('Hình ảnh đã được lưu.', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Không có quyền truy cập thư viện ảnh.', ToastAndroid.SHORT);
          }
        } catch (error) {
            ToastAndroid.show('Có lỗi xảy ra khi lưu hóa đơn.', ToastAndroid.SHORT);
        }
    };

    const handleCalAmountMoneyReturn = useCallback(() => {
        const rs = receipt?.returnProducts?.reduce((total, item) => {
            return total + (item.numberProduct * item?.actualPrice);
        }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
        return rs;
    }, [])

    const handleCalNumberProductReturn = useCallback(() => {
        const rs = receipt?.returnProducts?.reduce((total, item) => {
            return total + item.numberProduct;
        }, 0);
        return rs;
    }, [])

    const handleCalNumberProduct = useCallback(() => {
        const rs = receipt?.receiptDetails?.reduce((total, item) => {
            return total + item.numberProduct;
        }, 0);
        return rs;
    }, [])

    return ( 
        <View style={styles.container} ref={viewRef}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Order')}>
                    <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Chi tiết trả hàng</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={takeScreenshot} style={{ alignItems: 'center' }}>
                        <Image source={require('../../assets/images/download.png')} style={{ width: 20, height: 20, objectFit: 'contain', }}/>
                        <Text style={{ fontSize: 10, color: '#3a3a3a' }}>Tải đơn</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 50, backgroundColor: '#f8f8fa', justifyContent: 'center', paddingHorizontal: 15 }} >
                <Text style={{ fontWeight: '500', color: '#a9a8a8'}}>Trả đơn hàng từ <Text style={{ color: '#2083c5'}}>{`#HD${receipt?.id}`}</Text></Text>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <View style={[styles.display, styles.content_above, { justifyContent: 'space-between' }]}>
                        <View>
                            <Text style={styles.text_customer}>{`HT#${receipt?.id}`}</Text>
                            <Text style={styles.text_info_order}>{`${receipt?.createdAtTime} - ${convertTimeStamp(receipt?.createdAtDate, 'dd/MM')}`}</Text>
                        </View>
                        <Text style={styles.status}>Trả hàng</Text>
                    </View>
                    <View style={styles.content_below}>
                        <View style={[styles.display, { alignItems: 'center', justifyContent: 'space-between' }]}>
                            <Text style={styles.total_price}>{handleCalAmountMoneyReturn()}</Text>
                            <View style={styles.button_send}>
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={{ marginBottom: 10 }}>
                        {receipt?.returnProducts?.map((item, index) => 
                            <View key={index} style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 15, paddingVertical: 15, backgroundColor: '#ffffff', minHeight: 90, borderBottomWidth: 0.8, borderColor: '#e5e5ea' }}>
                                <Image source={{ uri: item.productAvatar }} style={{ width: 60, height: '100%', marginRight: 10, objectFit: 'cover', borderRadius: 5 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#252424' }}>{item.productName}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <Text style={{ color: '#7c7b7b'}}>SL: <Text style={{ fontWeight: '500' }}>{item?.numberProduct}</Text></Text>
                                        <Text style={{ color: '#d81f1f', fontWeight: '500' }}>{`${item?.actualPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        
                        {receipt?.returnProducts?.length == 0 && 
                            <Text style={{ marginTop: 10, paddingHorizontal: 15 }}>Sản phẩm đã xóa</Text>
                        }
                    </View>
                    
                    <View style={[styles.horizontalLine, { marginTop: 10 }]} />
                    <View style={{ marginVertical: 10, paddingHorizontal: 15 }}>
                        <Text style={{ color: '#858585' }}>Tổng {handleCalNumberProductReturn()} sản phẩm</Text>  
                    </View>
                    <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 15, paddingHorizontal: 15 }]}>
                        <Text style={{ fontWeight: '500', fontSize: 18 }}>Tổng tiền trả khách</Text>
                        <Text style={{ color: '#d81f1f', fontWeight: 'bold', fontSize: 18 }}>{handleCalAmountMoneyReturn()}</Text>
                    </View>
                </View>

                <View style={{ height: 50, backgroundColor: '#f8f8fa', justifyContent: 'center', paddingHorizontal: 15 }} >
                <Text style={{ fontWeight: '500', color: '#a9a8a8'}}>Đơn hàng <Text style={{ color: '#2083c5'}}>{`#HD${receipt?.id}`}</Text></Text>
            </View>
                <View style={styles.header}>
                    <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Chi tiết hóa đơn gốc</Text>
                </View>
                <View style={styles.content}>
                    <View style={[styles.display, styles.content_above, { justifyContent: 'space-between' }]}>
                        <View>
                            <Text style={styles.text_customer}>{`HD#${receipt?.id}`}</Text>
                            <Text style={styles.text_info_order}>{`${receipt?.createdAtTime} - ${convertTimeStamp(receipt?.createdAtDate, 'dd/MM')}`}</Text>
                        </View>
                    </View>
                    <View style={styles.content_below}>
                        <View style={[styles.display, { alignItems: 'center', justifyContent: 'space-between' }]}>
                            <Text style={styles.total_price}>{`${receipt?.finalPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                            <View style={styles.button_send}>
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={{ marginBottom: 10 }}>
                        {receipt?.receiptDetails?.length > 0 && 
                            receipt?.receiptDetails.map((item, index) => 
                                <View key={index} style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 15, paddingVertical: 15, backgroundColor: '#ffffff', minHeight: 90, borderBottomWidth: 0.8, borderColor: '#e5e5ea' }}>
                                    <Image source={{ uri: item?.productAvatar }} style={{ width: 60, height: '100%', marginRight: 10, objectFit: 'cover', borderRadius: 5 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#252424' }}>{item.productName}</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                            <Text style={{ color: '#7c7b7b'}}>SL: <Text style={{ fontWeight: '500' }}>{item?.numberProduct}</Text></Text>
                                            <Text style={{ color: '#d81f1f', fontWeight: '500' }}>{`${item?.salePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                        {receipt?.receiptDetails?.length == 0 && 
                            <Text style={{ marginTop: 10, paddingHorizontal: 15 }}>Sản phẩm đã xóa</Text>
                        }
                    </View>
                    
                    <View style={[styles.horizontalLine, { marginTop: 10 }]} />
                    <View style={{ marginVertical: 10, paddingHorizontal: 15 }}>
                        <View style={styles.price_container}>
                            <Text style={{ color: '#858585' }}>Tổng {handleCalNumberProduct()} sản phẩm</Text>
                            <Text style={{ color: '#565555'}}>{`${receipt?.totalSalePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                        </View>
                        
                        <View style={[styles.display, { marginBottom: 2 }]}>
                            <Text style={[styles.text_light, { color: '#565555', width: '40%', fontSize: 14, flex: 1 }]}>Giảm giá</Text>                              
                            {(receipt?.receiptDetails?.some((item) => item.coupon != null) || receipt?.coupon) ? 
                                <>
                                    <View style={{ flex: 1 }}>
                                        {receipt?.receiptDetails?.map((item, index) =>
                                            <View key={index} style={[styles.display, { justifyContent: 'space-between', marginBottom: 2 }]}>
                                                {item.coupon && 
                                                    <>
                                                        <View style={styles.coupon_container}>
                                                            <Text style={styles.name_coupon} onPress={() => navigation.navigate('CouponDetail', {couponId: item.coupon?.couponId})}>{item.coupon?.couponCode}</Text>
                                                        </View>
                                                        <Text style={styles.text}>-{`${item.discount * item.numberProduct}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫</Text>
                                                    </>
                                                }
                                            </View> 
                                            
                                        )}
                                        {receipt?.coupon && 
                                            <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 2 }]}>
                                                <View style={styles.coupon_container}>
                                                    <Text style={styles.name_coupon} onPress={() => navigation.navigate('CouponDetail', {couponId: item.coupon?.couponId})}>{receipt.coupon.couponCode}</Text>
                                                </View>
                                                <Text style={styles.text}>-{`${receipt.discountOfReceipt}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫</Text>
                                            </View> 
                                        }
                                    </View> 
                                </> : <Text style={[styles.text, { alignContent: 'flex-end' }]}>0</Text>
                            }          
                        </View>                 
                    </View>
                    <View style={[styles.display, { justifyContent: 'space-between', marginBottom: 20, paddingHorizontal: 15 }]}>
                        <Text style={{ fontWeight: '500', fontSize: 18 }}>Tổng cộng</Text>
                        <Text style={{ color: '#d81f1f', fontWeight: 'bold', fontSize: 18 }}>{`${receipt?.finalPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
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
        backgroundColor: '#f8f8fa' 
    },
    button_payment: {
        borderWidth: 1,
        borderColor: '#22539e',
        borderRadius: 7,
        marginVertical: 10
    },
    content: {
        flex: 1,
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
        borderBottomColor: '#dfdede',
        paddingHorizontal: 15
    },
    content_below: {
        paddingVertical: 10,
        paddingHorizontal: 15
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
        marginBottom: 5,
        fontSize: 17
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
    },
    name_coupon: {
        fontSize: 7,
        fontWeight: '500',
        color: '#15803D',
        paddingHorizontal: 5,
    },
    coupon_container: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#15803D',
        borderStyle: 'dashed',
        borderRadius: 3,
        height: 15
    },
    status: {
        backgroundColor: '#a9a8a8',
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 7,
        fontWeight: '500',
        height: 25
    }
})

export default ReturnOrderDetail;