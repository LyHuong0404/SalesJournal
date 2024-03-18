import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import { useState } from "react";
import * as Animatable from 'react-native-animatable';
import AddProductToCategory from "../components/AddProductToCategory";
import DeleteProductFromCategory from "../components/DeleteProductFromCategory";
import ProductInCategoryTab from "../components/ProductInCategoryTab";

function ProductInCategory() {
    const [searchbarVisible, setSearchbarVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [tabIndex, setTabIndex] = useState(1);

    const renderTabContent = () => {
        switch (tabIndex) {
            case 1:
                return <ProductInCategoryTab onDelete={() => setTabIndex(3)} onAdd={() => setTabIndex(2)}/>;
            case 2:
                return <AddProductToCategory onBack={() => setTabIndex(1)}/>;
            case 3:
                return <DeleteProductFromCategory onBack={() => setTabIndex(1)} />;
            default:
                return 0;
        }
    }

    return (  
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Đồ dùng</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {!searchbarVisible ? 
                        (<TouchableOpacity onPress={() => setSearchbarVisible(true)}>
                            <Image source={require('../assets/images/search.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                        </TouchableOpacity>) : 
                        (<TouchableOpacity onPress={() => setSearchbarVisible(false)}>
                            <Image source={require('../assets/images/close.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                        </TouchableOpacity>)}
                    <TouchableOpacity>
                        <Image source={require('../assets/images/edit_text.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 15  }}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/delete.png')} style={{ width: 25, height: 25, objectFit: 'contain' }}/>
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
                        onClearIconPress={() => setSearchValue('')}
                    />
                </View>
            </Animatable.View>)}
            {renderTabContent()}
            {/* Sản phẩm trong danh mục */}
            

            {/* xóa sản phẩm khỏi danh mục */}
            

            {/* Thêm sản phẩm vào danh mục */}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#f4f6f8',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff'
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