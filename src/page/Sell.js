import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Searchbar, Button } from "react-native-paper";
import { useState, useRef } from "react";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import RBSheet from "react-native-raw-bottom-sheet";

import ModalArrange from "../components/Modal/ModalArrange";

function Sell() {
    const refRBSheet = useRef();
    const navigation = useNavigation();
    const [searchValue, setSearchValue] = useState('');
    const searchRef = useRef(null);
    const [value, setValue] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleIndexChange = (index) => {
        setSelectedIndex(index);
    };

    return ( 
        <View style={styles.container}>
            <View style={{ height: 20, width: '100%', backgroundColor: 'transparent'}}></View>
            <View style={{ backgroundColor: '#ffffff'}}>
                <View style={styles.header}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Bán hàng</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                            <Image source={require('../assets/images/arrange.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15 }}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../assets/images/order_black.png')} style={{ width: 25, height: 25, objectFit: 'contain' }}/>
                        </TouchableOpacity>                      
                    </View>
                </View>

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

               
                <View style={{ marginHorizontal: 15, borderRadius: 5, backgroundColor: '#f8f9fa', borderColor:  searchRef.current && searchRef.current.isFocused() ? '#15803D' : '#e5e5ea', borderWidth: 1, height: 40, flexDirection: 'row', alignItems: 'center' }}>
                    <Searchbar
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
                        ref={searchRef}
                    />
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >  
                    <View style={{ marginTop: 10, backgroundColor: '#f6f7f8', height: 55, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/images/menu.png')} style={{ width: 20, height: 20, objectFit: 'contain', marginHorizontal: 10 }}/>
                        <SegmentedControlTab
                            values={['Tất cả', 'Walking', 'Transit', 'Driving', 'xhg', 'xwe', 'xwq']}
                            selectedIndex={selectedIndex}
                            onTabPress={handleIndexChange}
                            tabStyle={{ backgroundColor: 'white', borderColor: '#e5e5ea', borderWidth: 1.5, borderRadius: 8, marginRight: 10, minWidth: 70 }}
                            activeTabStyle={{ backgroundColor: 'white', borderColor: '#3370cc', borderWidth: 1.5, borderRadius: 8 }}
                            tabTextStyle={{ color: '#8e8e93' }}
                            activeTabTextStyle={{ color: '#3370cc' }}
                        />
                    </View>
                </ScrollView>
            </View>
            <ScrollView>
                <View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#ffffff', height: 100, borderBottomWidth: 1, borderColor: '#e5e5ea' }}>
                        <Image source={require('../assets/images/haohao.jpg')} style={{ width: 100, height: 80, marginRight: 10, objectFit: 'contain' }} />
                        <View style={{ flex: 1, justifyContent: 'space-around' }}>
                            <Text style={{ fontWeight: '600', color: '#7a7a7a' }}>Mì Hảo Hảo</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{ fontWeight: 'bold', color: '#f08800', fontSize: 12 }}>14.000</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <Image source={require('../assets/images/minus_circle.png')} style={{ width: 20, height: 20, objectFit: 'contain' }}/>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold' }}>   1   </Text>
                                    <TouchableOpacity>
                                        <Image source={require('../assets/images/plus_circle.png')} style={{ width: 20, height: 20, objectFit: 'contain' }}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Button icon="plus" mode="outlined" textColor="#15803D" buttonColor='transparent' onPress={() => console.log('Pressed')} style={styles.button}>
                    Thêm sản phẩm
                </Button>
            </ScrollView>
            <View style={styles.container_card}>
                <TouchableOpacity>
                    <View style={styles.card}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Image source={require('../assets/images/money.png')} style={{width: 25, height: 25, marginRight: 10 }}/>
                            <Text style={styles.text_card}>8.000</Text>
                        </View> 
                        <Text style={styles.text_card}>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7f8',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        borderWidth: 1,
        borderColor: '#15803D',
        borderRadius: 7,
        margin: 10, 
    },
    container_card: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e5e5ea',
        elevation: 1
    },
    card: {
        margin: 10,
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: '#15803D',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    text_card: {
        color: 'white',
        fontWeight: '600'
    },
    badge: {
        color: 'white',
    }
});

export default Sell;