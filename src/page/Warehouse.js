import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView, Dimensions } from "react-native";
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { filterProduct } from "../actions/seller/productActions";
import { filterCategory } from "../actions/seller/categoryActions";
import LoadingSpinner from "../components/LoadingSpinner";

const screenWidth = Dimensions.get('window').width;

function Warehouse() {
    const refRBSheet = useRef();
    const navigation = useNavigation();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productId, setProductId] = useState(null);

    useEffect(() => {
        try{      
            const getAllProduct = async() => {
                setLoading(true);
                const response = await filterProduct({ pageIndex: 0, pageSize: 1000, keySearch: null, productId, orderBy: null, fromDate: null, toDate: null });
                
                if (response?.content && response.content.length > 0) {
                    setProducts(response.content);
                } else setProducts([]);
                setLoading(false);
            }
            getAllProduct();

        } catch(e) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, [productId])

    useEffect(() => {
        try{      
            const getCategories = async() => {   
                setLoading(true);
                const response = await filterCategory({ pageIndex: 0, pageSize: 1000 });
                if (response?.content) {
                    response?.content.unshift({name: 'Tất cả'});
                    setCategories(response?.content);
                }
                setLoading(false);
            }
            
            getCategories();
        } catch(e) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, [])

    const handleIndexChange = (index) => {
        if(index == 0) {
            setProductId(undefined);
        } else setProductId(categories[index].id);
        setSelectedIndex(index);
    }; 

    const totalAmount = useCallback(() => {
        const rs = products?.reduce((total, item) => {
            return total + item?.stockAmount}, 0);
        return rs;
    }, [products])

    const totalWarehouseValue = useCallback(() => {
        const rs = products?.reduce((total, item) => {
            return total + (item?.stockAmount * item.importPrice);
        }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
        return rs;
    }, [products])

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Kho hàng</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 0 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ImportBook')} style={{ backgroundColor: 'white', borderRadius: 7, justifyContent: 'center', alignItems: 'center', width: 80, paddingVertical: 5, marginRight: 15 }}>
                    <Image source={require('../assets/images/import_product.png')} style={{ width: 40, height: 40, objectFit: 'contain' }}/>
                    <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 11 }}>Sổ nhập hàng</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ExportBook')} style={{ backgroundColor: 'white', borderRadius: 7, justifyContent: 'center', alignItems: 'center', width: 80, paddingVertical: 5 }}>
                    <Image source={require('../assets/images/export_product.png')} style={{ width: 40, height: 40, objectFit: 'contain' }}/>
                    <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 11 }}>Sổ xuất hàng</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, marginVertical: 15 }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                > 
                    <SegmentedControlTab
                        values={categories.map(category => category.name)}
                        selectedIndex={selectedIndex}
                        onTabPress={handleIndexChange}
                        tabStyle={{ backgroundColor: 'white', borderColor: '#e5e5ea', borderWidth: 1.5, borderRadius: 8, marginRight: 10, paddingHorizontal: 10 }}
                        activeTabStyle={{ backgroundColor: 'white', borderColor: '#4173bc', borderWidth: 1.5, borderRadius: 8 }}
                        tabTextStyle={{ color: '#8e8e93' }}
                        activeTabTextStyle={{ color: '#4173bc' }}
                    />
                </ScrollView>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.box_container}>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e2e5ea' }}>
                        <Text style={{ fontWeight: '500', fontSize: 11, color: '#abaaaa', textAlign: 'center'}}>Giá trị kho</Text>                
                        <Text style={styles.text_price}>
                            {totalWarehouseValue()}</Text>                   
                    </View>  
                    <View style={styles.display_gap}>
                        <View>
                            <Text style={styles.text}>Mã sản phẩm</Text>
                            <Text style={{ color: '#3a3a3a', textAlign: 'center' }}>{products.length}</Text>
                        </View>
                        <View style={styles.verticalLine}></View>
                        <View>
                            <Text style={styles.text}>Số lượng</Text>
                            <Text style={{ color: '#3a3a3a', textAlign: 'center' }}>
                                {totalAmount()}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 15 }}>
                    {products.length > 0 ? 
                        products.map((product, index) =>
                            <View style={styles.product_container} key={index}>
                                <Image source={{ uri: product?.product?.avatar }} style={styles.image_product}  />
                                <View style={{ flex: 1 }}>
                                    <View style={[styles.display, { flex: 1 }]}>
                                        <Text style={{ fontWeight: '500', color: '#3a3a3a' }}>{product.name}</Text>
                                        <Text style={styles.text_light}>{`SL: ${product?.stockAmount}`}</Text>
                                    </View>
                                    <View style={[styles.display, { flex: 1, marginTop: 10}]}>
                                        <View style={styles.row}>
                                            <Text style={styles.text_light}>{`SP00${product?.id}`}</Text>
                                        </View>
                                        <Text style={styles.product_price}>{`${product.importPrice * product?.stockAmount}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                    </View>
                                </View>
                            </View>
                        ) : <View style={styles.content_noitem}>
                                <Image source={require('../assets/images/noresults.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}/>
                                <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Bạn chưa có danh mục sản phẩm nào trong danh mục này. </Text>
                            </View>
                        }                   
                </View>
            </ScrollView>
            {loading && <LoadingSpinner />}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7f8',
    },
    content_noitem: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center', 
        paddingHorizontal: 8,
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    box_container: {
        paddingHorizontal: 20,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 7,
        width: screenWidth - 30,
        height: 'auto',
        elevation: 2,
        marginBottom: 15
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text_price: {
        textAlign: 'center',
        fontSize: 24,
        color:'#15803D',
        fontWeight: '500',
        marginTop: 5
    },
    display_gap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    text: {
        color: "#abaaaa",
        fontSize: 11,
        marginBottom: 5
    },
    verticalLine: {
        alignSelf: 'center',
        width: 1,
        height: '50%',
        backgroundColor: '#e2e5ea'
    },
    product_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1, 
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 7,
        elevation: 2,
        marginBottom: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    image_product: {
        width: 50,
        height: 50,
        objectFit: 'contain',
        borderRadius: 15,
        marginRight: 10
    },
    product_price: {
        color: '#e58302', 
    },
    text_light: {
        fontSize: 12,
        color: '#9a9a9a'
    },
})

export default Warehouse;