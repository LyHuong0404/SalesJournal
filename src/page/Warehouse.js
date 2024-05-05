import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView, Dimensions } from "react-native";
import { Searchbar } from "react-native-paper";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import * as Animatable from 'react-native-animatable';
import RBSheet from "react-native-raw-bottom-sheet";
import { filterProduct } from "../actions/seller/productActions";
import { filterCategory } from "../actions/seller/categoryActions";

const screenWidth = Dimensions.get('window').width;

function Warehouse() {
    const refRBSheet = useRef();
    const navigation = useNavigation();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        try{      
            const getAllProduct = async() => {
                const response = await filterProduct({ pageIndex: 0, pageSize: 1000, keySearch: null, productId: null, orderBy: null});
                
                if (response?.content && response.content.length > 0) {
                    setProducts(response.content);
                }
            }
            getAllProduct();

            const getCategories = async() => {               
                const response = await filterCategory({ pageIndex: 0, pageSize: 1000 });
                if (response?.content) {
                    setCategories(response?.content);
                }
            }
            
            getCategories();
        } catch(e) {
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, [])

    const handleIndexChange = (index) => {
        setSelectedIndex(index);
    }; 

    

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
            <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                > 
            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                <SegmentedControlTab
                    values={categories.map(category => category.name)}
                    selectedIndex={selectedIndex}
                    onTabPress={handleIndexChange}
                    tabStyle={{ backgroundColor: 'white', borderColor: '#e5e5ea', borderWidth: 1.5, borderRadius: 8, marginRight: 10, minWidth: 120 }}
                    activeTabStyle={{ backgroundColor: 'white', borderColor: '#4173bc', borderWidth: 1.5, borderRadius: 8 }}
                    tabTextStyle={{ color: '#8e8e93' }}
                    activeTabTextStyle={{ color: '#4173bc' }}
                />
            </View>
            </ScrollView>
            <ScrollView>
                <View style={styles.box_container}>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e2e5ea' }}>
                        <Text style={{ fontWeight: '500', fontSize: 11, color: '#abaaaa', textAlign: 'center'}}>Giá trị tồn</Text>                
                        <Text style={styles.text_price}>265</Text>                   
                    </View>  
                    <View style={styles.display_gap}>
                        <View>
                            <Text style={styles.text}>Mã sản phẩm</Text>
                            <Text style={{ color: '#3a3a3a'}}>20</Text>
                        </View>
                        <View style={styles.verticalLine}></View>
                        <View>
                            <Text style={styles.text}>Số lượng</Text>
                            <Text style={{ color: '#3a3a3a'}}>20</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 15 }}>
                    {products.map((product, index) =>
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
                                    <Text style={styles.product_price}>{`${product.importPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
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