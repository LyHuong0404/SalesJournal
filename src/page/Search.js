import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput, ScrollView } from "react-native";
import { useState, useRef } from "react";
import { IconButton } from 'react-native-paper';


function Search() {
    const navigation = useNavigation();
    const [searchValue, setSearchValue] = useState('');
    const searchRef = useRef(null);

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginRight: 15, tintColor: '#615f5f' }} />
                </TouchableOpacity>
                <View
                    style={{
                        flex:1,
                        backgroundColor: '#fafafa',
                        borderRadius: 5,
                        borderColor: searchRef.current && searchRef.current.isFocused() ? '#15803D' : '#e5e5ea',
                        borderWidth: 1,
                        height: 42,
                        flexDirection: 'row',
                        alignItems: 'center',}}>
                    <IconButton
                    icon="magnify"
                    color="#8e8e93"
                />
                <TextInput
                    ref={searchRef}
                    placeholder="Tìm theo tên, barcode, SKU"
                    placeholderTextColor="#8e8e93"
                    value={searchValue}
                    style={{
                        flex: 1,
                        fontSize: 13,
                        textAlignVertical: 'center',
                        }}
                    onChangeText={(text) => setSearchValue(text)}
                />
                {searchValue.length > 0 && (
                    <IconButton
                    icon="close-circle-outline"
                    color="#8e8e93"
                    onPress={() => setSearchValue('')}
                    />
                )}
                </View>
                <TouchableOpacity>
                    <Image source={require('../assets/images/qr_code.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginLeft: 15 }}/>
                </TouchableOpacity>
            </View>
        {/* label_search */}
            {/* <View style={styles.label_search}>
                <Text style={{ color: '#a6a6a6', textAlign: 'center', fontSize: 12 }}>Tìm sản phẩm, đơn hàng, khách hàng...</Text>
            </View> */}

        {/* search_results */}
            {/* <ScrollView>
                <View style={{marginTop: 8 }}>
                    <View style={styles.item_container}>
                        <Image source={require('../assets/images/haohao.jpg')} style={styles.item_image} />
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Text style={styles.item_name}>Mì Hảo Hảo</Text>
                            <Text style={styles.item_price}>14.000</Text>
                        </View>
                    </View>
                </View>
            </ScrollView> */}

            <View style={styles.no_result_container}>
                <Image source={require('../assets/images/noresults.png')} style={styles.image_no_result}/>
                <Text style={{ color: '#8e8e93', fontSize: 13 }}>Không tìm thấy kết quả phù hợp</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#ebeced',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        height: 'auto',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea',
        backgroundColor: '#ffffff'
    },
    label_search: {
        backgroundColor: '#f1f3f5',
        height: 80,
        paddingVertical: 10
    },
    item_container: {
        display: 'flex', 
        flexDirection: 'row', 
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        backgroundColor: '#ffffff', 
        height: 'auto', 
        borderBottomWidth: 1, 
        borderColor: '#eeeef2'
    },
    item_image: {
        width: 100, 
        height: 80, 
        marginRight: 10, 
        objectFit: 'contain'
    },
    item_name: {
        fontWeight: '600', 
        color: '#7a7a7a'
    },
    item_price: {
        fontWeight: 'bold', 
        color: '#f08800', 
        fontSize: 12
    },
    no_result_container: {
        flex: 0.9,
        justifyContent: 'center',  
        alignItems: 'center', 
    },
    image_no_result: {
        width: 200, 
        height: 200, 
        objectFit: 'contain', 
        marginBottom: 10
    }
})

export default Search;