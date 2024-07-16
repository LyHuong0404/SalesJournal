import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { Button, ProgressBar } from 'react-native-paper';
import { memo, useCallback, useEffect, useState } from "react";
import moment from 'moment';
import { useNavigation } from "@react-navigation/native";

import { convertTimeStamp } from "../../utils/helper";
import { filterProduct } from "../../actions/seller/productActions";
import LoadingSpinner from "../LoadingSpinner";


function WarehouseTab() {
    const navigation = useNavigation();
    const [active, setActive] = useState(1);
    const [products, setProducts] = useState([]);
    const [productToCount, setProductToCount] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        try{      
            const getAllProduct = async() => {
                setLoading(true);
                const response = await filterProduct({ pageIndex: 0, pageSize: 1000, keySearch: null, productId: null, orderBy: null, fromDate: null, toDate: null });
                
                if(response?.content && response?.content.length > 0) {
                    setProductToCount(response?.content);
                }
                setLoading(false);
            }
            getAllProduct();
        } catch(e) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, [])

    useEffect(() => {
        try{      
            const getAllProduct = async() => {
                setLoading(true);
                const response = await filterProduct({ pageIndex: 0, pageSize: 1000, keySearch: null, productId: null, orderBy: null, fromDate: null, toDate: null});
                if (response?.content) {
                    let filteredContent = response.content;
                    if (active === 2) filteredContent = filteredContent.filter(item => item.stockAmount <= 20);
                    else if (active === 3) filteredContent = filteredContent.filter(item => item.stockAmount > 0);
                    else if (active === 4) filteredContent = filteredContent.filter(item => moment(item.expireAt).isBefore(moment()));
                    setProducts(filteredContent);
                }
                setLoading(false);
            }
            getAllProduct();
        } catch(e) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, [active])

 
    const labelOfOverview = useCallback(() => {
        switch (active) {
            case 1:
                return 'Tổng quan giá trị kho';
            case 2:
                return 'Tổng quan hàng sắp hết';
            case 3:
                return 'Tổng quan hàng còn bán';
            case 4:
                return 'Tổng quan hàng hết hạn';
            default: 
                return 'Tổng quan giá trị kho';
        }
    }, [active])

    const totalValue = useCallback(() => {
        const rs = productToCount?.reduce((total, item) => {
            return total + (item?.stockAmount * item.importPrice);
        }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return rs;
    }, [productToCount])

    return (  
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.report_container}>
                <View style={[styles.display, { marginBottom: 15 }]}>
                    <TouchableOpacity onPress={() => setActive(1)} 
                                        style={[styles.item_report, 
                                        { borderColor: active == 1 ? '#15803D' : 'transparent'},
                                        { backgroundColor: active == 1 ? '#f2f8f4' : '#f6f7f8'}
                                    ]}>
                        <Image source={require('../../assets/images/dollor.png')} style={styles.icon}/>
                        <Text style={styles.text_bold}>
                            {totalValue()}
                        </Text>
                        <Text style={styles.text_light}>Giá trị kho</Text>             
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActive(2)} 
                                    style={[styles.item_report, 
                                            { borderColor: active == 2 ? '#cb870b' : 'transparent'},
                                            { backgroundColor: active == 2 ? '#FFFAFA' : '#f6f7f8'},]}>
                        <Image source={require('../../assets/images/cubes.png')} style={styles.icon}/>
                        <Text style={styles.text_bold}>{(productToCount.filter((item) => item.stockAmount <= 20)).length}</Text>
                        <Text style={styles.text_light}>Sản phẩm sắp hết hàng</Text>             
                    </TouchableOpacity>
                </View>
                <View style={styles.display}>
                    <TouchableOpacity onPress={() => setActive(3)} 
                                    style={[styles.item_report, 
                                            { borderColor: active == 3 ? '#2083c5' : 'transparent'},
                                            { backgroundColor: active == 3 ? '#f8ffff' : '#f6f7f8'}
                                        ]}>
                        <Image source={require('../../assets/images/completed.png')} style={styles.icon}/>
                        <Text style={styles.text_bold}>{(productToCount.filter((item) => item.stockAmount > 0)).length}</Text>
                        <Text style={styles.text_light}>Sản phẩm còn bán</Text>             
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActive(4)} 
                                    style={[styles.item_report, 
                                    { borderColor: active == 4 ? '#d61d1d' : 'transparent'},
                                    { backgroundColor: active == 4 ? '#fff2f2' : '#f6f7f8'}
                                ]}>
                        <Image source={require('../../assets/images/rejected.png')} style={styles.icon}/>
                        <Text style={styles.text_bold}>{productToCount.filter(item => moment(item.expireAt).isBefore(moment())).length}</Text>
                        <Text style={styles.text_light}>Sản phẩm hết hạn</Text>             
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.report_container, { marginVertical: 10, minHeight: 350 }]}>
                <Text style={styles.text_bold}>{labelOfOverview()}</Text>
                {products.length == 0 && 
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Image source={require('../../assets/images/noresults.png')} style={{ width: 80, height: 80, objectFit: 'contain'}}/>
                        <Text style={[styles.text_light, { fontSize: 13 }]}>Chưa có sản phẩm tồn kho</Text>
                        <Text style={[styles.text_light, { fontSize: 13 }]}>Nhập tồn kho ngay!</Text>
                        <Button 
                            mode="outlined" 
                            textColor="#298bcb" 
                            buttonColor='transparent'
                            onPress={() => navigation.navigate('ImportProduct')} 
                            style={[styles.button, { borderColor: '#2083c5' }]}>
                            Nhập hàng ngay
                        </Button>
                    </View>
                }
                {products.length > 0 &&
                    <View style={[styles.display, { marginVertical: 5 }]}>
                        <Text style={styles.text_light}>Sản phẩm</Text>
                        <Text style={styles.text_light}>Giá trị</Text>
                    </View>
                }
                {products.map((product, index) => 
                    <View style={styles.row} key={index}>
                        <Text style={styles.order}>{index + 1}</Text>
                        <View style={styles.product_container}>
                            <Image source={{ uri: product?.product?.avatar }} style={styles.image_product}  />
                            <View style={{ flex: 1 }}>
                                <View style={[styles.display, { flex: 1 }]}>
                                    <Text style={{ fontWeight: '500', color: '#3a3a3a', flex: 0.8 }}>{product.name}</Text>
                                    <Text style={styles.product_price}>{`${product.importPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                </View>
                                <View style={[styles.display, { flex: 1, marginTop: 10, marginBottom: 5 }]}>
                                    <Text style={[styles.text_light, { fontSize: 13, marginHorizontal: 5 }]}>{`ID: ${product?.id}`}</Text>
                                    <Text style={[styles.text_light, { fontSize: 12, fontWeight: 500 }]}>{`SL: ${product?.stockAmount}`}</Text>
                                </View>
                                {active == 4 && <Text style={[styles.text_light, { fontSize: 12, marginBottom: 5 }]}>HSD: {convertTimeStamp(product.expireAt, 'dd/MM')}</Text>}
                                <ProgressBar progress={1 - (product?.stockAmount / product?.importAmount)} color='#15803D' style={{ borderRadius: 10, height: 6, marginBottom: 15  }}/>
                            </View>
                        </View>
                    </View>
                )} 
            </View>
            </ScrollView>
            {loading && <LoadingSpinner />}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#f0f0f0',
        paddingVertical: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    report_container: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'center',
        height: 'auto',
        width: '100%',
        padding: 15
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item_report: {
        backgroundColor: '#f6f7f8',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        minHeight: 100,
        borderRadius: 10,
        borderWidth: 1.5
    },
    order: {
        fontSize: 10,
        color: '#9a9a9a',
        marginHorizontal: 5, 
        justifyContent: 'center', 
        paddingVertical: 5
    },
    icon: {
        width: 24,
        height: 24,
        objectFit: 'contain'
    },
    text_light: {
        fontSize: 10,
        color: '#9a9a9a'
    },
    text_bold: {
        fontWeight: '500',
        marginVertical: 5
    },
    image_product: {
        width: 50,
        height: 50,
        objectFit: 'contain',
        borderRadius: 15,
        marginHorizontal: 5
    },
    product_price: {
        fontWeight: '500', 
        color: '#f08800', 
    },
    product_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1, 
        borderBottomWidth: 1, 
        borderBottomColor: '#e2e5ea',
        marginBottom: 15
    },
    button: {
        width: 'auto',
        borderWidth: 1,
        borderRadius: 7,
        marginVertical: 10, 
    }
})

export default memo(WarehouseTab);