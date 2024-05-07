import { StyleSheet, View, TouchableOpacity, Image, Text, useWindowDimensions  } from "react-native";
import { TabView, TabBar  } from 'react-native-tab-view';
import { useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Searchbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import ProductTab from "../../components/ProductTab";
import CategoryTab from "../../components/CategoryTab";
import ModalArrange from "../../components/Modal/ModalArrange";  
import useDebounce from "../../hooks";
import QRDemo from "../QRDemo";


const CustomTabBar = (props) => {
    return (
        <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
            renderLabel={({ route, focused, color }) => (
            <Text style={[styles.tabText, focused ? styles.tabTextFocused : {}]}>
                {route.title}
            </Text>
            )}
        />
    );
};

function ProductManagement() {
    const navigation = useNavigation();
    const refRBSheet = useRef(null);
    const refRBSheetCamera = useRef(null);
    const route = useRoute();
    const paramIndex = route.params?.index;
    const layout = useWindowDimensions();
    const [searchbarVisible, setSearchbarVisible] = useState(false);
    const [searchProductValue, setSearchProductValue] = useState(null);
    const [searchCategoryValue, setSearchCategoryValue] = useState(null);
    const debounceProductValue = useDebounce(searchProductValue, 500);
    const debounceCategoryValue = useDebounce(searchCategoryValue, 500);
    const [filterValue, setFilterValue] = useState('moinhat');

    const [index, setIndex] = useState(paramIndex || 0);
    const [routes] = useState([
        { key: 'first', title: 'Sản phẩm' },
        { key: 'second', title: 'Danh mục' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ProductTab onSearchValue={debounceProductValue} onSelectedFilter={filterValue}/>;
            case 'second':
                return <CategoryTab onSearchValue={debounceCategoryValue}/>;
            default:
                return null;
        }
    };

    const handleFilter = (text) => {
        setFilterValue(text);
        refRBSheet.current.close();
    }

    const handleChangeSearchValue = (text) => {
        if (index == 0) {
            setSearchProductValue(text);
        } else {
            setSearchCategoryValue(text);
        }
    }

    const handleClearSearchValue = () => {
        if (index == 0) {
            setSearchProductValue(null);
        } else {
            setSearchCategoryValue(null);
        }
    }

    const handleHideSearchBar = () => {
        setSearchbarVisible(false);
        if (index == 0) {
            setSearchProductValue(null);
        } else {
            setSearchCategoryValue(null);
        }
    }

    return (  
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Quản lý</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {!searchbarVisible ? 
                        (<TouchableOpacity onPress={() => setSearchbarVisible(true)}>
                            <Image source={require('../../assets/images/search.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                        </TouchableOpacity>) : 
                        (<TouchableOpacity onPress={handleHideSearchBar}>
                            <Image source={require('../../assets/images/close.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                        </TouchableOpacity>)}
                    {index == 0 && (
                        <>
                            <TouchableOpacity onPress={() => refRBSheetCamera.current?.open()}><Image source={require('../../assets/images/barcode.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/></TouchableOpacity>
                            <TouchableOpacity onPress={() => refRBSheet.current?.open()}><Image source={require('../../assets/images/arrange.png')} style={{ width: 25, height: 20, objectFit: 'contain', tintColor: '#000000' }}/></TouchableOpacity>
                        </>
                    )}

                </View>
            </View>
            {searchbarVisible &&(<Animatable.View animation="zoomIn" duration={50} style={{ backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 15, borderRadius: 5, backgroundColor: '#f8f9fa', borderColor: '#15803D', borderWidth: 1, height: 40, flexDirection: 'row', alignItems: 'center' }}>
                    <Searchbar
                        autoFocus
                        placeholder={index == 0 ? "Tìm theo tên sản phẩm" : "Tìm theo tên danh mục"}
                        iconColor='#8e8e93'
                        value={index == 0 ? searchProductValue : searchCategoryValue}
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent', 
                        }}
                        inputStyle={{
                            fontSize: 13, 
                        }}
                        placeholderTextColor="#8e8e93" 
                        onChangeText={handleChangeSearchValue}
                        clearIcon='close-circle-outline'
                        onClearIconPress={handleClearSearchValue}
                    />
                </View>
            </Animatable.View>)}
            
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: 
                    {
                        backgroundColor: "rgba(100, 100, 100, 0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: "grey"
                    },
                    container: {
                        height: 300
                    }
                }}
            >
                <ModalArrange value={filterValue} onSelectedChange={handleFilter} />
            </RBSheet>

            <RBSheet
                ref={refRBSheetCamera}
                customStyles={{               
                    container: {
                    height: '100%'
                    }
                }}
            >
                <QRDemo action='ProductDetail' 
                    onScanSuccess={() => refRBSheet.current?.close()} 
                    close={() => refRBSheet.current?.close()}
                />
            </RBSheet>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => <CustomTabBar {...props} />}
            />
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
        alignItems: 'center'
    },
    tabBar: {
        backgroundColor: '#fff', 
    },
    indicator: {
        backgroundColor: '#15803D', 
    },
    tabText: {
        color: 'black', 
    },
    tabTextFocused: {
        color: '#15803D', 
    },
})

export default ProductManagement;