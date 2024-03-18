import { View, StyleSheet, Text } from "react-native";


function SettingStore() {

    return ( 
        <View style={styles.container}>
            <Text>Cài đặt cửa hàng</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#ebeced',
    },
})

export default SettingStore;