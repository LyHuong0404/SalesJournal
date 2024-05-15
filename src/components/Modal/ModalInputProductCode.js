import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import { TextInput, Button, DefaultTheme } from "react-native-paper";
import { memo, useState } from "react";
import { getProductByCode } from "../../actions/seller/productActions";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#c5c6c7', 
    },
};

function ModalInputProductCode({ ArrayQRAndAmount, onScanSuccess }) {
    const [code, setCode] = useState('');

    const submitForm = () => {   
        try {
            const index = Array.isArray(ArrayQRAndAmount) ? ArrayQRAndAmount.findIndex((item) => item?.product?.code == code) : -1;
            if (index == -1) {
                try {
                    const fetchData = async() => {
                        const response = await getProductByCode(code);
                        if (response) {
                            const newFormatProductDisplay = { product: response, amount: 1 }
                            onScanSuccess(newFormatProductDisplay)
                        } else {
                            onScanSuccess('');
                            ToastAndroid.show('Mã sản phẩm không tồn tại', ToastAndroid.SHORT);
                        }
                    }
                    fetchData();
                } catch (err) {
                    ToastAndroid.show('Lỗi khi quét mã sản phẩm', ToastAndroid.SHORT);
                }
            } else {
                onScanSuccess(index);
            }
        } catch(err) {
            ToastAndroid.show('Mã sản phẩm không tồn tại', ToastAndroid.SHORT);
        }
    }
    return ( 
        <View style={styles.container}>
            <Text style={{ fontWeight: '600', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f5', paddingBottom: 10 }}>Nhập mã sản phẩm</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextInput 
                        autoFocus 
                        theme={theme}
                        style={styles.input_style}
                        placeholder="Nhập mã sản phẩm" 
                        value={code}
                        onChangeText={(text) => setCode(text)}
                        placeholderTextColor='#abaaaa' />
                    <Button 
                        onPress={submitForm}
                        disabled={!code} 
                        style={styles.button} 
                        textColor='#ffffff'>Thêm</Button>
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
    input_style:{
        flex: 0.9,
        backgroundColor: 'transparent', 
        paddingHorizontal: 0, 
        fontSize: 14,
        height: 40,
        marginRight: 10
    },
    button: {
        flex: 0.1,
        backgroundColor: '#15803D',
        borderRadius: 7
    }
})

export default memo(ModalInputProductCode);