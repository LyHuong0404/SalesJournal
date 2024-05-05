import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput, ScrollView } from "react-native";
import { useNavigation, DrawerActions  } from '@react-navigation/native';
import { Searchbar } from "react-native-paper";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function Paybook() {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };
    
    
    return ( 
        <View style={styles.container}>   
            <View style={[styles.header, { marginBottom: 10, paddingTop: 30 }]}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={openDrawer}>
                    <Image source={require('../assets/images/store.jpg')} style={styles.image}/>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 10}}>
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>Cửa Hàng Tạp Hóa</Text>
                    <Text style={{ color: '#ffffff', fontSize: 11 }}>Thông tin cửa hàng 
                        <Image source={require('../assets/images/left_arrow.png')} style={{ width: 12, height: 12, objectFit: 'contain' }}/>
                    </Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}> 
                        <Image source={require('../assets/images/search.png')} style={{ width: 22, height: 22, objectFit: 'contain', marginRight: 15 }}/>
                    </TouchableOpacity>
                    <Image source={require('../assets/images/chatting.png')} style={{ width: 25, height: 25, objectFit: 'contain' }}/>
                </View>
                </View>   
            </View>
            <View style={styles.payment_container}>
                <View style={[styles.display, { marginBottom: 20, paddingHorizontal: 10 }]}>
                    <View style={styles.payment_item}>
                        <Text style={styles.text}>Tôi phải trả</Text>
                        <Text style={{ color: '#15803D', fontWeight: '500', fontSize: 16, marginTop: 5 }}>50.000</Text>
                    </View>
                    <View style={styles.vertical_line}></View>
                    <View style={styles.payment_item}>
                        <Text style={styles.text}>Tôi phải thu</Text>
                        <Text style={{ color: '#b21414', fontWeight: '500', fontSize: 16, marginTop: 5 }}>60.000</Text>
                    </View>
                </View>
                <View style={styles.horizontal_line}></View>
                <View style={styles.history}>
                    <View style={styles.display}>
                        <Image source={require('../assets/images/history.png')} style={{ width: 18, height: 20, objectFit: 'contain', alignSelf: 'center' }}/>
                        <Text style={{ fontWeight: '500', marginLeft: 5, color: '#3a3a3a' }}>Lịch sử chi tiết</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.display, { marginVertical: 10, paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center'}]}>
                <Searchbar
                    placeholder="Tìm khách hàng"
                    iconColor='#8e8e93'
                    style={{
                        backgroundColor: '#f1f3f5', 
                        borderRadius: 7,
                        width: '70%',
                    }}
                    inputStyle={{
                        fontSize: 14, 
                    }}
                    placeholderTextColor="#8e8e93" 
                    onFocus={() => navigation.navigate('Customers')}
                />
                <View>
                    <Image source={require('../assets/images/download.png')} style={{ width: 19, height: 19, objectFit: 'contain', alignSelf: 'center' }}/>
                    <Text style={{ fontSize: 10, color: '#838383'}}>Báo cáo</Text>
                </View>
                <View >
                    <Image source={require('../assets/images/arrows.png')} style={{ width: 17, height: 17, objectFit: 'contain', alignSelf: 'center' }}/>
                    <Text style={{ fontSize: 10, color: '#838383'}}>Bộ lọc</Text>
                </View>
            </View>
            <View style={styles.text_list}>
                <Text style={[styles.text, { fontSize: 14 }]}>Danh sách khách hàng</Text>
            </View>
            <ScrollView style={{ paddingHorizontal: 15, flex: 1}}>
                <TouchableOpacity>
                    <View style={styles.customer_item_container}>
                        <View style={[styles.display, { alignItems: 'center'}]}>
                            <View style={{ borderWidth: 1.5, borderColor: '#e2e5ea', borderRadius: 50, width: 50, height: 50, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                <Image
                                    source={require('../assets/images/user.png')}
                                    style={{
                                    width: 20,
                                    height: 20,
                                    objectFit: 'cover',
                                    tintColor: '#15803D',
                                    }}
                                />
                            </View>
                            <Text style={{ color: '#434343', fontWeight: '500' }}>Lý Hương</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#b21414', fontWeight: '500', textAlign: 'right' }}>65.000</Text>
                            <Text style={{ fontSize: 12, color: '#b5b6b8'}}>Tôi phải thu</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    //   paddingTop: 20,
      flex: 1,
      backgroundColor: '#ffffff',
    },
    header: {
      backgroundColor: 'green',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 100, 
      objectFit: 'contain'
    },
    payment_container: {
        paddingVertical: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 0.8,
        borderColor: '#e2e5ea',
        alignSelf: 'center',
        width: windowWidth - 30,
        height: 'auto'
    },
    payment_item: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: 12,
        color: '#6f6f6f',
        fontWeight: '500'
    },
    vertical_line: {
        width: 0.8,
        backgroundColor: '#e2e5ea'
    },
    horizontal_line: {
        width: '100%',
        height: 0.8,
        backgroundColor: '#e2e5ea'
    },
    history: {
        marginTop: 15,
        alignSelf: 'center'
    },
    text_list: {
        backgroundColor: '#f0f5fa',
        paddingLeft: 15,
        paddingVertical: 10
    },
    customer_item_container: {
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#e2e5ea',
        borderBottomWidth: 0.8
    }
})

export default Paybook;