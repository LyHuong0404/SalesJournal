import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput, ScrollView } from "react-native";
import { useState, useRef } from "react";
import { IconButton, Button } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import ModalCreateCustomer from "../../components/Modal/ModalCreateCustomer";

function Customers() {
    const navigation = useNavigation();
    const [searchValue, setSearchValue] = useState('');
    const searchRef = useRef(null);
    const refRBSheet = useRef();

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginRight: 15, tintColor: '#615f5f' }} />
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
                    placeholder="Tìm tên, số điện thoại"
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
            </View>

            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>

                <View style={styles.content_noitem}>
                    <Image source={require('../../assets/images/circle_customer.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Bạn chưa có khách hàng nào, hãy tạo ngay khách hàng đầu tiên nhé</Text>
                </View>
            
                {/* <ScrollView>
                    <View style={styles.horizontalLine} />
                    <Button icon="account-plus-outline" mode="outlined" textColor="#22539e" buttonColor='transparent' onPress={() => refRBSheet.current?.open()} style={styles.button}>
                        Thêm khách hàng mới
                    </Button>
    
                    <View style={{ display: 'flex', flexDirection: 'row', paddingVertical: 10, backgroundColor: '#ffffff', height: 75, borderBottomWidth: 0.6, borderColor: '#e5e5ea', justifyContent: 'center', alignItems: 'center' }}>                        
                        <View style={{ borderWidth: 1.5, borderColor: '#e2e5ea', borderRadius: 50, width: 50, height: 50, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                            <Image
                                source={require('../../assets/images/user.png')}
                                style={{
                                width: 20,
                                height: 20,
                                objectFit: 'cover',
                                tintColor: '#15803D',
                                }}
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Text style={{ color: '#434343', fontWeight: '500' }}>Lý Hương</Text>
                            <Text style={{ color: '#949191', fontSize: 14, fontWeight: '500' }}>0123456789</Text>
                        </View>
                    </View>
                </ScrollView> */}
            </View>
            {/* <View style={styles.no_result_container}>
                <Image source={require('../../assets/images/noresults.png')} style={styles.image_no_result}/>
                <Text style={{ color: '#8e8e93', fontSize: 13 }}>Không tìm thấy kết quả phù hợp</Text>
            </View> */}

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
                            height: 400
                        }
                    }}
                >
                <ModalCreateCustomer />
            </RBSheet>
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
        backgroundColor: '#ffffff'
    },
    horizontalLine: {
        height: 15,
        backgroundColor: '#f6f7f8', 
        marginBottom: 5,
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
    },
    button: {
        borderWidth: 1,
        borderColor: '#22539e',
        borderRadius: 7
    },
    content_noitem: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center', 
        paddingHorizontal: 8,
    },
})

export default Customers;