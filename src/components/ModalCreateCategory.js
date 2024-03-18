import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button, DefaultTheme } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#c5c6c7', 
    },
};

function ModalCreateCategory() {
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
                        placeholderTextColor='#abaaaa' />
                    <Button style={styles.button} textColor='#ffffff'>Tạo</Button>
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