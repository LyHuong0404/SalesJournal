import { StyleSheet, View, TouchableOpacity, Image, Text, useWindowDimensions  } from "react-native";
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import ProductTab from "../components/ProductTab";
import CategoryTab from "../components/CategoryTab";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import ModalArrange from "../components/ModalArrange";  
import RBSheet from "react-native-raw-bottom-sheet";
import { Searchbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';


const renderScene = SceneMap({
    first: ProductTab,
    second: CategoryTab,
});

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
    const layout = useWindowDimensions();
    const [searchbarVisible, setSearchbarVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Sản phẩm' },
        { key: 'second', title: 'Danh mục' },
    ]);


    return (  
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Quản lý</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {!searchbarVisible ? 
                        (<TouchableOpacity onPress={() => setSearchbarVisible(true)}>
                            <Image source={require('../assets/images/search.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                        </TouchableOpacity>) : 
                        (<TouchableOpacity onPress={() => setSearchbarVisible(false)}>
                            <Image source={require('../assets/images/close.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                        </TouchableOpacity>)}
                    {index == 0 && (
                        <>
                            <TouchableOpacity><Image source={require('../assets/images/barcode.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/></TouchableOpacity>
                            <TouchableOpacity onPress={() => refRBSheet.current?.open()}><Image source={require('../assets/images/arrange.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/></TouchableOpacity>
                            <TouchableOpacity><Image source={require('../assets/images/order_black.png')} style={{ width: 25, height: 25, objectFit: 'contain' }}/></TouchableOpacity>
                        </>)}
                    {/* <MenuProvider>
                        <Menu>
                            <MenuTrigger/>
                            <MenuOptions>
                            <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                            <MenuOption onSelect={() => alert(`Delete`)}>
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                            </MenuOptions>
                        </Menu>
                    </MenuProvider> */}

                </View>
            </View>
            {searchbarVisible &&(<Animatable.View animation="zoomIn" duration={50} style={{ backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 15, borderRadius: 5, backgroundColor: '#f8f9fa', borderColor: '#15803D', borderWidth: 1, height: 40, flexDirection: 'row', alignItems: 'center' }}>
                    <Searchbar
                        autoFocus
                        placeholder="Tìm theo tên, barcode, SKU"
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
                    }
                }}
            >
                <ModalArrange />
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