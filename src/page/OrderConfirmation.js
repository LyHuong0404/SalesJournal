import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput as TextInputR } from "react-native";
import { Button, DefaultTheme, ToggleButton, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import TextInputCustom from "../components/TextInputCustom";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#abaaaa', 
    },
};

function OrderConfirmation({ onBack }) {
    const navigation = useNavigation();
    const [value, setValue] = useState('left');
    const [discount, setDiscount] = useState("0");
    const [transport, setTransport] = useState("0");
    const [note, setNote] = useState("");
    const [createDay, setCreateDay] = useState(format(new Date(Date.now()), 'dd/MM/yyyy'));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setCreateDay(format(new Date(date), 'dd/MM/yyyy'));
        hideDatePicker();
    };

    return ( 
        <View style={styles.container}>
            
                <View style={styles.header}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Xác nhận</Text>
                    </View>
                </View>
                <KeyboardAwareScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                <Button icon="plus" mode="outlined" textColor="#22539e" buttonColor='transparent' onPress={() => console.log('Pressed')} style={[styles.button, {marginHorizontal: 15 }]}>
                    Thêm sản phẩm
                </Button>

                <View style={{ paddingHorizontal: 15, backgroundColor: '#ffffff' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', paddingVertical: 10, backgroundColor: '#ffffff', height: 90, borderBottomWidth: 0.6, borderColor: '#e5e5ea' }}>
                        <Image source={require('../assets/images/close_circle.png')} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                        <Image source={require('../assets/images/background-wallpapers-15.jpg')} style={{ width: 50, height: 50, marginRight: 10, objectFit: 'cover', borderRadius: 10 }} />
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Text style={{ color: '#252424' }}>Mì Hảo Hảo</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{ color: '#1d7ebf', fontSize: 14, fontWeight: '500' }}>14.000</Text>
                                <View style={{ display: 'flex', width: '40%',flexDirection: 'row', paddingVertical: 4, alignItems: 'center', justifyContent: 'space-around', borderColor: '#e5e5e2', borderWidth: 1, borderRadius: 5 }}>
                                    <TouchableOpacity>
                                        <Image source={require('../assets/images/minus.png')} style={{ width: 12, height: 15, objectFit: 'contain', tintColor: '#7a7a7a' }}/>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: '500' }}>1</Text>
                                    <TouchableOpacity>
                                        <Image source={require('../assets/images/plus.png')} style={{ width: 15, height: 15, objectFit: 'contain', tintColor: '#15803D' }}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.horizontalLine} />
                <TouchableOpacity onPress={() => navigation.navigate("Customers")}>
                    <View style={{ paddingHorizontal: 15, backgroundColor: '#ffffff', marginVertical: 5 }}>
                        <Text style={{ color: '#7a7a7a', fontWeight: '600' }}>Khách hàng</Text>
                        <TextInput
                            theme={theme}
                            placeholder='Chọn khách hàng'
                            placeholderTextColor='#abaaaa'
                            style={styles.input_style}
                            underlineColor="#abaaaa"
                            right={<TextInput.Icon icon="account-circle-outline" color='#888888' onPress={() => refRBSheet.current?.open()} />}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.horizontalLine} />

                <View style={{ marginVertical: 5, paddingHorizontal: 15, backgroundColor: '#ffffff' }}>
                    <View style={styles.display}>
                        <Text style={{ color: '#888888' }}>Tổng 2 sản phẩm</Text>
                        <Text style={{ fontWeight: '500' }}>129.000</Text>
                    </View>

                    {/* <View style={{ width: 95 }}>
                        <ToggleButton.Row onValueChange={(value) => setValue(value)} value={value} >
                            <ToggleButton icon={() => <Text >VNĐ</Text>} value="vnd" status="checked" style={{ height: 35, width: 50 }}/>
                            <ToggleButton icon={() => <Text>%</Text>} value="%" style={{ height: 35, width: 50 }} />
                        </ToggleButton.Row>
                    </View> */}

                    <View style={[styles.display, { marginLeft: 10 }]}>
                        <View style={styles.display_center}>
                            <TouchableOpacity>
                                <Image source={require('../assets/images/close_circle_outline.png')} style={styles.close_icon} />
                            </TouchableOpacity>
                            <Text style={{ color: '#888888' }}>Chiết khấu</Text>
                        </View>
                        <View style={styles.display_center}>
                            <TextInputR
                                style={{ height: 40, color: '#4f86da', fontWeight: '500' }}
                                onChangeText={newText => setDiscount(newText)}
                                defaultValue={discount}
                                keyboardType="numeric"
                            />
                            <Image source={require('../assets/images/edit_text.png')} style={[styles.close_icon, { tintColor: '#4f86da' }]}/>
                        </View>
                    </View>

                    <View style={[styles.display, { marginLeft: 10 }]}>
                        <View style={styles.display_center}>
                            <TouchableOpacity>
                                <Image source={require('../assets/images/close_circle_outline.png')} style={styles.close_icon} />
                            </TouchableOpacity>
                            <Text style={{ color: '#888888' }}>Vận chuyển</Text>
                        </View>
                        <View style={styles.display_center}>
                            <TextInputR
                                style={{ height: 40, color: '#4f86da', fontWeight: '500' }}
                                onChangeText={newText => setTransport(newText)}
                                defaultValue={transport}
                                keyboardType="numeric"
                            />
                            <Image source={require('../assets/images/edit_text.png')} style={[styles.close_icon, { tintColor: '#4f86da' }]}/>
                        </View>
                    </View>

                    <View style={styles.total}>
                        <View style={[styles.display, { marginVertical: 12 }]}>
                            <Text style={{ fontWeight: '500' }}>Tổng cộng</Text>
                            <Text style={{ color: '#d81f1f', fontWeight: 'bold' }}>129.000</Text>
                        </View>
                        <Button icon="wallet-outline" mode="outlined" textColor="#22539e" buttonColor='transparent' onPress={() => console.log('Pressed')} style={styles.button}>
                            Thanh toán trước
                        </Button>
                    </View>

                </View>
                <View style={styles.horizontalLine} />

                <View style={{ paddingHorizontal: 15, paddingTop: 10, paddingBottom: 20 }}>
                    <TextInputCustom 
                        label="Ghi chú"
                        placeholder="Ghi chú đơn hàng" 
                        value={note} 
                        onChange={(text) => setNote(text)} 
                        keyboardType='default'
                    />
                </View>
                
                <View style={{ flex: 1, paddingHorizontal: 15, marginVertical: 5, backgroundColor: '#f6f7f8' }}>
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                        <View style={[styles.display_center,]} >
                            <TouchableOpacity>
                                <Image source={require('../assets/images/close_circle_outline.png')} style={[styles.close_icon, { marginRight: 0 }]} />
                            </TouchableOpacity>
                            <Image source={require('../assets/images/calendar.png')} style={{ width: 20, height: 20, tintColor: '#4f86da', marginHorizontal: 10 }}/>
                            <Text style={{ color: '#3d73c7' }}>Ngày tạo: </Text>
                        
                            <TextInputR
                                disabled
                                style={{ height: 40, color: '#3d73c7' }}
                                defaultValue={createDay}
                            />
                            <Image source={require('../assets/images/dropdown.png')} style={{ width: 20, height: 20, tintColor: '#4f86da', marginLeft: 2 }}/>
                        </View>
                    </TouchableOpacity>    
                </View>
                </KeyboardAwareScrollView>
                <View style={styles.button_group}>
                    <View style={styles.display}>
                        <Button 
                            mode="outlined" 
                            textColor="#15803D" 
                            buttonColor='transparent' 
                            onPress={onBack} 
                            style={styles.button_bottom}>
                            Giao sau
                        </Button>
                        <Button  
                            // onPress={onPress}
                            mode="contained" 
                            buttonColor="#15803D" 
                            style={styles.button_bottom}
                        >
                            Bán nhanh
                        </Button>
                    </View>
                </View>
                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e5ea'
    },
    button: {
        borderWidth: 1,
        borderColor: '#22539e',
        borderRadius: 7,
        marginVertical: 10
    },
    input_style:{
        height: 40, 
        backgroundColor: 'transparent', 
        paddingHorizontal: 0, 
        fontSize: 14, 
        paddingBottom: 5
    },
    horizontalLine: { 
        height: 10, 
        backgroundColor: '#f2f2f5' 
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    display_center: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    close_icon: {
        width: 20, 
        height: 20, 
        objectFit: 'contain', 
        marginRight: 8
    },
    total: {
        marginTop: 10,
        borderTopWidth: 0.6, 
        borderTopColor: '#e5e5ea',
        borderBottomWidth: 0.6, 
        borderBottomColor: '#e5e5ea',
    },
    button_group: {
        padding: 10, 
        borderTopWidth: 1, 
        borderTopColor: '#f2f2f5', 
        backgroundColor: '#ffffff'
    },
    button_bottom: {
        width: '48%',
        borderWidth: 2,
        borderColor: '#15803D',
        borderRadius: 7,
        // margin: 10, 
    }
});

export default OrderConfirmation;