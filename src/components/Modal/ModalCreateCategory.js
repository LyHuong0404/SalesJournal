import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import { TextInput, Button, DefaultTheme } from "react-native-paper";
import { addCategory } from "../../actions/seller/categoryActions";
import { useState } from "react";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#c5c6c7', 
    },
};

function ModalCreateCategory({onSetCategory}) {
    const [name, setName] = useState('');

    const submitForm = () => {
        const formData = new FormData();
        formData.append('name', name);

        try {
            const fetchApi = async() => {
                const response = await addCategory(formData);
                if (response?.code == 0) {
                    ToastAndroid.show('Tạo danh mục thành công', ToastAndroid.SHORT);
                }
            }
            fetchApi();
        } catch(err) {
            ToastAndroid.show('Tạo danh mục thất bại', ToastAndroid.SHORT);
        }
    }
    return ( 
        <View style={styles.container}>
            <Text style={{ fontWeight: '600', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f5', paddingBottom: 10 }}>Tạo danh mục</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextInput 
                        autoFocus 
                        theme={theme}
                        style={styles.input_style}
                        placeholder="Nhập tên danh mục" 
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholderTextColor='#abaaaa' />
                    <Button 
                        onPress={submitForm}
                        disabled={!name} 
                        style={styles.button} 
                        textColor='#ffffff'>Tạo</Button>
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

export default ModalCreateCategory;