import { StyleSheet, View, TouchableOpacity, Image, Text, ToastAndroid } from "react-native";
import { Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from "@react-navigation/native";

import ModalConfirmation from "../../components/Modal/ModalConfirmation";
import DeleteProductFromCategory from "../../components/DeleteProductFromCategory";
import ProductInCategoryTab from "../../components/ProductInCategoryTab";
import { deleteCategory, getCategoryById } from "../../actions/seller/categoryActions";
import useDebounce from "../../hooks";
import { filterProduct } from "../../actions/seller/productActions";
import LoadingSpinner from "../../components/LoadingSpinner";

function ProductInCategory() {
    const navigation = useNavigation();
    const route = useRoute();
    const [categoryId, setCategoryId] = useState(route.params?.categoryId) || '';
    const [searchbarVisible, setSearchbarVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const debounceValue = useDebounce(searchValue, 500);
    const [tabIndex, setTabIndex] = useState(1);
    const [category, setCategory] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [productsInCategory, setProductsInCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const renderTabContent = () => {
        switch (tabIndex) {
            case 1:
                return <ProductInCategoryTab products={productsInCategory} onDelete={() => setTabIndex(2)} onAdd={handleAddProduct}/>;
            case 2:
                return <DeleteProductFromCategory products={productsInCategory} onBack={() => setTabIndex(1)}/>;
            default:
                return 0;
        }
    }

    useEffect(() => {
        try {
            const fetchData = async () => {
                setLoading(true);
                const response = await getCategoryById(categoryId);
                setCategory(response?.info);
                setLoading(false);
            }
            fetchData();
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải danh mục', ToastAndroid.SHORT);
        }
    }, [])

    
    useEffect(() => {
        try {
            const fetchProducts = async () => {
                setLoading(true);
                const response = await filterProduct({ pageIndex: 0, pageSize: 1000, keySearch: debounceValue, productId: categoryId, orderBy: null, fromDate: null, toDate: null });
                setProductsInCategory(response?.content) 
                setLoading(false);
            };
            fetchProducts();
        } catch (err) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, [debounceValue, tabIndex]);

        
    const handleDeleteCategory = () => {
        try{           
            const fetchAPI = async() => {
                setLoading(true);
                const response = await deleteCategory(categoryId);
                if (response?.code == 0) {
                    ToastAndroid.show('Xóa danh mục không thành công', ToastAndroid.SHORT);
                    navigation.navigate('ProductManagement', { index: 1 });
                } else {
                    ToastAndroid.show('Xóa danh mục không thành công', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
            setShowModal(false);
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Xóa danh mục không thành công', ToastAndroid.SHORT);
        }
    }

    const handleAddProduct = () => {
        const categoryIfo = { product: { name: category?.name, id: category?.id }};
        navigation.navigate('CreateProduct', { product: categoryIfo })
    }

    return (  
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{category?.name}</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate('CreateCategory', { category })}>
                        <Image source={require('../../assets/images/edit_text.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 15  }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Image source={require('../../assets/images/delete.png')} style={{ width: 25, height: 25, objectFit: 'contain' }}/>
                    </TouchableOpacity>
                </View>
            </View>
            
            {searchbarVisible &&(<Animatable.View animation="zoomIn" duration={50} style={{ backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 15, borderRadius: 5, backgroundColor: '#f8f9fa', borderColor: '#15803D', borderWidth: 1, height: 40, flexDirection: 'row', alignItems: 'center' }}>
                    <Searchbar
                        autoFocus
                        placeholder="Tìm tên sản phẩm, barcode"
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

            {renderTabContent()}
            {showModal && 
                <ModalConfirmation 
                    title="Xóa danh mục?" 
                    question="Bạn có chắc rằng muốn xóa danh mục?"
                    textYes="Xóa"
                    textNo="Quay lại"
                    onPressCancel={() => setShowModal(false)}
                    onPressConfirm={handleDeleteCategory}
                />
            }
            {loading && <LoadingSpinner />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#f4f6f8',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    container_product: {
        flex: 1,
        padding: 10
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button_group: {
        padding: 10, 
        borderTopWidth: 1, 
        borderTopColor: '#f2f2f5', 
        backgroundColor: '#ffffff'
    },
    button: {
        width: '48%',
        borderWidth: 1,
        borderColor: '#15803D',
        borderRadius: 7,
        // margin: 10, 
    }
})

export default ProductInCategory;