import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import TextInputCustom from "../components/TextInputCustom";
import { useState } from "react";
import ButtonCustom from "../components/ButtonCustom";


function SettingStore() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                </TouchableOpacity>
                <Text style={{ flex: 1, color: 'black', textAlign: 'center', fontWeight: 'bold', marginLeft: 10 }}>Thông tin cá nhân</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={{ flex: 1, marginHorizontal: 15 }}>
                <TextInputCustom
                    label='Tên cửa hàng'
                    value={name}
                    onChange={(text) => setName(text)}
                    placeholder="Tên cửa hàng"
                />
                <View style={styles.gap}></View>
                <TextInputCustom
                    label='Số điện thoại'
                    value={phone}
                    onChange={(text) => setPhone(text)}
                    placeholder="Số điện thoại"
                />
                <View style={styles.gap}></View>
                <TextInputCustom
                    label='Địa chỉ'
                    value={address}
                    onChange={(text) => setAddress(text)}
                    placeholder="Địa chỉ"
                />
            </View>
            <ButtonCustom 
                title='Cập nhật'
                customStyle={{ marginHorizontal: 15 }}
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
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 15, 
        justifyContent: "flex-start", 
        height: 'auto', 
        paddingVertical: 12
    },
    horizontalLine: {
        height: 10,
        backgroundColor: '#f6f7f8', 
        marginBottom: 5,
    },
    gap: {
        marginTop: 25
    }
})

export default SettingStore;