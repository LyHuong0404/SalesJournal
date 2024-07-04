import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";

import TextInputCustom from "../TextInputCustom";


function ModalCreateCustomer({ onBack }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    return ( 
        <View style={styles.container}>
            <Text style={{ fontWeight: '600', textAlign: 'center', paddingBottom: 10 }}>Tạo khách hàng mới</Text>
            <View style={{ flex: 1 }}>
                <View style={{ marginVertical: 25 }}>
                    <TextInputCustom 
                        label="Tạo khách hàng mới" 
                        required={true} 
                        placeholder="Ví dụ: Nguyễn Văn A" 
                        value={name} 
                        onChange={(text) => setName(text)}
                        keyboardType='default'
                    />
                </View>

                <TextInputCustom 
                    label="Số điện thoại" 
                    required={true} 
                    placeholder="Ví dụ: 0123456789" 
                    value={phone}
                    onChange={(text) => setPhone(text)}
                    keyboardType='numeric'
                />
            </View>

            <View style={styles.button_group}>
                <View style={styles.display}>
                    <Button 
                        mode="outlined" 
                        textColor="#575757" 
                        buttonColor='transparent' 
                        onPress={onBack} 
                        style={[styles.button, { borderColor: '#575757' }]}>
                        Quay lại
                    </Button>
                    <Button  
                        // onPress={onPress}
                        mode="contained" 
                        buttonColor="#15803D" 
                        style={styles.button}
                    >
                        Tạo
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15
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

export default ModalCreateCustomer;