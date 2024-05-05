import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef } from "react";

import ModalTransactionDetail from "../components/Modal/ModalTransactionDetail";

const windowWidth = Dimensions.get('window').width;

function TransactionDetails() {
    const refRBSheet = useRef();
    const navigation = useNavigation();

    return (  
        <View style={styles.container}>   
            <View style={[styles.header, { marginBottom: 10, paddingTop: 30 }]}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>     
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/images/right_arrow.png')}  style={styles.image_back} />
                        </TouchableOpacity>
                        <Image source={require('../assets/images/user_circle.png')} style={styles.image}/>
                        <View style={{ marginLeft: 10}}>
                            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>Khách lẻ</Text>
                                <Text style={{ color: '#ffffff', fontSize: 11 }}>0123456789 
                            </Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity> 
                            <Image source={require('../assets/images/phone.png')} style={{ width: 24, height: 24, objectFit: 'contain', marginRight: 15 }}/>
                        </TouchableOpacity>
                        <Image source={require('../assets/images/guide.png')} style={{ width: 25, height: 25, objectFit: 'contain' }}/>
                    </View>
                </View>   
            </View>
            <View style={styles.payment_container}>
                <View style={[styles.display, { justifyContent: 'space-between' }]}>
                    <View>
                        <Text style={styles.text}>Tôi phải thu</Text>
                        <Text style={{ color: '#b21414', fontWeight: '500', fontSize: 16, marginTop: 5 }}>60.000 ₫</Text>
                    </View>
                    <Button 
                        mode="contained" 
                        buttonColor="#15803D"
                        style={styles.button_payment}
                    >
                        Thanh toán
                    </Button>
                </View>
            </View>
            <View style={[styles.display, { marginHorizontal: 15 }]}>
                <Text style={{ color: '#6f6f6f', flex: 0.4, fontSize: 11 }}>4 giao dịch</Text>
                <Text style={styles.text_info}>Tôi đã đưa</Text>
                <Text style={styles.text_info}>Tôi đã nhận</Text>
            </View>
            <ScrollView style={{ flex: 1, marginHorizontal: 15 }}>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <View style={styles.payment_item}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={{ color: '#6f6f6f', fontSize: 10 }}>17/03/24</Text>
                            <Text style={{ color: '#3a3a3a'}}>Trả nợ đơn GUVNDB</Text>
                        </View>
                        <Text style={[styles.text_price, { color: '#b21414' }]}>50.000</Text>
                        <Text style={[styles.text_price, { color: '#15803D' }]}>25.000</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <View style={[styles.display, { flex: 0.09, marginHorizontal: 15, marginVertical: 10, justifyContent: 'space-between' }]}>
                <Button icon="minus-circle-outline" mode="contained" textColor="white" buttonColor='#a11515' style={styles.button}>
                    Tôi đã đưa
                </Button>
                <Button icon="plus-circle-outline" mode="contained" textColor="white" buttonColor='#15803D' style={styles.button}>
                    Tôi đã nhận
                </Button>
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
                    },
                    container: {
                        height: 500
                    }
                }}
            >
                <ModalTransactionDetail />
            </RBSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f3f5',
    },
    display: {
        display: 'flex',
        flexDirection: 'row'
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
        width: 45,
        height: 45,
        borderRadius: 100, 
        objectFit: 'contain'
    },
    image_back: {
        width: 17, 
        height: 17, 
        objectFit: 'contain', 
        marginRight: 10, 
        tintColor: 'white'
    },
    payment_container: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 0.8,
        borderColor: '#e2e5ea',
        alignSelf: 'center',
        width: windowWidth - 30,
        height: 'auto'
    },
    text: {
        color: '#6f6f6f',
        fontWeight: '500'
    },
    button_payment: {
        borderRadius: 7,
        height: '80%',
        alignSelf: 'center'
    },
    payment_item: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5
    },
    button: {
        width: '48%',
        borderRadius: 7,
    },
    text_price: {
        flex: 0.3, 
        alignSelf: 'center', 
        textAlign: 'right', 
        fontWeight: '500'  
    },
    text_info: {        
        color: '#6f6f6f', 
        flex: 0.3, 
        textAlign: 'right', 
        fontSize: 11 
    }
})

export default TransactionDetails;