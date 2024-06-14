import { View, StyleSheet, ScrollView, ToastAndroid, Image, Text } from "react-native";
import { useCallback, useEffect, useState, memo, useRef } from "react";
import { FAB } from 'react-native-paper';
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import VerticalProduct from "./VerticalProduct";
import { filterProduct } from "../actions/seller/productActions";
import LoadingSpinner from "./LoadingSpinner";

function ProductTab({ onSearchValue, onSelectedFilter }) {
    const navigation = useNavigation();
    const [pageIndex, setPageIndex] = useState(0);
    const [resetPageIndex, setResetPageIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const previousOffsetY = useRef(0);
 

    useEffect(() => {
        setPageIndex(0);
        setProducts([]);
    }, [resetPageIndex, onSearchValue, onSelectedFilter]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await filterProduct({ pageIndex, pageSize: 50, keySearch: onSearchValue, productId: null, orderBy: null, fromDate: null, toDate: null });      
                if (response) {
                    if (onSelectedFilter == 'banchay') {
                        response?.content?.sort(function(a, b) {
                            return b.product?.totalSaleAmount - a.product?.totalSaleAmount;
                        });
                    }
                    else if (onSelectedFilter == 'caothap') {
                        response?.content?.sort(function(a, b) {
                            return b.product?.salePrice - a.product?.salePrice;
                        });
                    }
                    else if (onSelectedFilter == 'thapcao') {
                        response?.content?.sort(function(a, b) {
                            return a.product?.salePrice - b.product?.salePrice;
                        });
                    }
                    else if (onSelectedFilter == 'giamgia') {
                        response.content = response.content.filter((item) => item.product.isPromotion);
                    }
                    if (pageIndex === 0) {
                        setProducts(response?.content);
                    } else {
                        setProducts(prevProducts => [...prevProducts, ...response?.content]);
                    }
                }
            } catch (err) {
                ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
            }
            setLoading(false);
        };
    
        fetchProducts();
    }, [pageIndex, resetPageIndex, onSearchValue, onSelectedFilter]);


    useFocusEffect(
        useCallback(() => {
            setResetPageIndex(prevResetIndex => prevResetIndex + 1);
        }, [])
    );

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isScrollingDown = contentOffset.y > previousOffsetY.current;
        previousOffsetY.current = contentOffset.y;
    
        if (isScrollingDown) {
            const isEndOfList = layoutMeasurement.height + contentOffset.y >= contentSize.height-25;
            if (isEndOfList) {
                setPageIndex(prevPageIndex => prevPageIndex + 1)
            };
        }
    }
    
    return (  
        <View style={styles.container}>

            <FAB
                icon="plus"
                label="Nhập hàng"
                style={styles.fab}
                onPress={() => navigation.navigate('CreateProduct')}
                variant='secondary'
            />
            {((!products || products?.length == 0) && !onSearchValue) &&
                <View style={styles.content_noitem}>
                    <Image source={require('../assets/images/noresults.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Bạn chưa nhập sản phẩm nào, hãy nhập ngay sản phẩm đầu tiên nhé</Text>
                </View>
            }
            {((!products || products?.length == 0) && onSearchValue) && 
            <View style={styles.content_noitem}>
                <Image source={require('../assets/images/noresult.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                <Text style={{ color: '#8e8e93', textAlign: 'center', marginTop: 25 }}>Không có kết quả tìm kiếm phù hợp.</Text>
            </View>
            }
            {products?.length > 0 && 
                <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                    <View style={styles.container_product}>
                        {products?.map((product, index) => <VerticalProduct key={index} product={product}/>)}
                    </View>
                </ScrollView>
            }
            {loading && <LoadingSpinner />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    header: {
        paddingHorizontal: 5,
        paddingTop: 7
    },
    container_product: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 100,
        borderRadius: 50,
    },
    content_noitem: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center', 
        paddingHorizontal: 8,
    },
})

export default memo(ProductTab);