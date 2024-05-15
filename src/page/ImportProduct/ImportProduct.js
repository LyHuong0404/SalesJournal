import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect, useRef, useState, useCallback } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView} from "react-native";
import { Button, Searchbar } from "react-native-paper";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import * as Animatable from 'react-native-animatable';
import RBSheet from "react-native-raw-bottom-sheet";

import { filterProduct } from "../../actions/seller/productActions";
import useDebounce from "../../hooks";
import QRDemo from "../QRDemo";
import { convertTimeStamp } from "../../utils/helper";
import LoadingSpinner from "../../components/LoadingSpinner";


function ImportProduct() {
    const refRBSheet = useRef();
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchbarVisible, setSearchbarVisible] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const debounceValue = useDebounce(searchValue, 500);
    const [loading, setLoading] = useState(false);

    const getAllProduct = async() => {
        setLoading(true);     
        const response = await filterProduct({ pageIndex: 0, pageSize: 1000, keySearch: debounceValue, productId: null, orderBy: null, fromDate: null, toDate: null });

        if(response) {
            if (selectedIndex == 1) {
                response?.content?.sort(function(a, b) {
                    return b.product?.totalSaleAmount - a.product?.totalSaleAmount;
                });
            } else if (selectedIndex == 2) {
                response.content = response.content.filter((item) => item.stockAmount == 0)
            }
            setProducts(response?.content)
        }
        setLoading(false);     
    }

    useEffect(() => {
        try{      
            getAllProduct();
        } catch(e) {
            setLoading(false);     
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, [debounceValue, selectedIndex])

    const handleIndexChange = (index) => {
        setSelectedIndex(index);
    }; 

    useFocusEffect(
        useCallback(() => {
            getAllProduct();
        }, [])
    );

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Nhập hàng</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {!searchbarVisible ? 
                        (<TouchableOpacity onPress={() => setSearchbarVisible(true)}>
                            <Image source={require('../../assets/images/search.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                        </TouchableOpacity>) : 
                        (<TouchableOpacity onPress={() => setSearchbarVisible(false)}>
                            <Image source={require('../../assets/images/close.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                    </TouchableOpacity>)}
                    <TouchableOpacity onPress={() => refRBSheet.current?.open()}>
                        <Image source={require('../../assets/images/barcode.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateProduct')}>
                        <Image source={require('../../assets/images/add_product.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                    </TouchableOpacity>
                </View>
            </View>
            {searchbarVisible &&(<Animatable.View animation="zoomIn" duration={50} style={{ backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 15, borderRadius: 5, backgroundColor: '#f8f9fa', borderColor: '#15803D', borderWidth: 1, height: 40, flexDirection: 'row', alignItems: 'center' }}>
                    <Searchbar
                        autoFocus
                        placeholder="Tìm kiếm theo tên sản phẩm"
                        iconColor='#8e8e93'
                        value={searchValue}
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent', 
                        }}
                        inputStyle={{
                            fontSize: 13, 
                        }}
                        placeholderTextColor="#8e8e93" 
                        onChangeText={(text) => setSearchValue(text)}
                        clearIcon='close-circle-outline'
                        onClearIconPress={() => setSearchValue(null)}
                    />
                </View>
            </Animatable.View>)}
            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                <SegmentedControlTab
                    values={['Tất cả', 'Bán chạy', 'Hết hàng']}
                    selectedIndex={selectedIndex}
                    onTabPress={handleIndexChange}
                    tabStyle={{ backgroundColor: 'white', borderColor: '#e5e5ea', borderWidth: 1.5, borderRadius: 8, marginRight: 10, minWidth: 70 }}
                    activeTabStyle={{ backgroundColor: 'white', borderColor: '#4173bc', borderWidth: 1.5, borderRadius: 8 }}
                    tabTextStyle={{ color: '#8e8e93' }}
                    activeTabTextStyle={{ color: '#4173bc' }}
                />
            </View>
          
            {/* <View style={styles.content_noitem}>
                <Image source={require('../../assets/images/noresults.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Bạn chưa có sản phẩm nào, hãy tạo ngay sản phẩm đầu tiên nhé</Text>
            </View> */}
            {products?.length > 0 ?
                <ScrollView style={{ paddingHorizontal: 15}}>
                    {products?.map((product, index) => 
                        <View key={index} style={styles.item_container}>
                            <Image source={{ uri: product?.product?.avatar }} style={styles.item_image} />
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                <Text style={styles.item_name}>{product?.name}</Text>
                                <View style={styles.display}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ color: '#abaaaa', fontSize: 11 }}>{`HSD: ${convertTimeStamp(product?.expireAt, 'dd/MM/yyyy')}`}  |  </Text>
                                        <Text style={{ color: '#abaaaa', fontSize: 11 }}>Còn: {product?.stockAmount}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('ImportProductInfo', { product })}>
                                        <Image source={require('../../assets/images/add_button.png')} style={styles.button_image} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    {/* <Button 
                        icon="plus"
                        mode="outlined" 
                        textColor="#15803D" 
                        buttonColor='transparent' 
                        onPress={() => navigation.navigate('CreateProduct')} 
                        style={{ borderWidth: 2, borderColor: '#15803D', borderRadius: 7,}}>
                        Thêm sản phẩm
                    </Button> */}
                </ScrollView>
                : <View style={styles.content_noitem}>
                    <Image source={require('../../assets/images/noresults.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Bạn chưa có sản phẩm nào, hãy tạo ngay sản phẩm đầu tiên nhé</Text>
                </View>
            }
            <RBSheet
                ref={refRBSheet}
                customStyles={{
                    container: {
                        height: '100%'
                    }
                }}
            >
                <QRDemo 
                    action="ImportProductDetail" 
                    onScanSuccess={() => refRBSheet.current?.close()} 
                    close={() => refRBSheet.current?.close()}
                />
            </RBSheet>
            {loading && <LoadingSpinner />}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#f6f7f8',
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
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    item_container: {
        display: 'flex', 
        flexDirection: 'row', 
        padding: 10, 
        backgroundColor: '#ffffff', 
        height: 'auto', 
        borderWidth: 1, 
        borderColor: '#eeeef2',
        marginBottom: 10,
        borderRadius: 7,
        elevation: 2,
    },
    item_image: {
        width: 80, 
        height: 80, 
        marginRight: 10, 
        objectFit: 'contain',
        borderRadius: 7
    },
    button_image: {
        width: 40, 
        height: 40, 
        objectFit: 'contain',
    },
    item_name: {
        color: '#3a3a3a',
    },
    content_noitem: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center', 
        paddingHorizontal: 8,
    },
})

export default ImportProduct;