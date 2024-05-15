import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";


function ButtonCustom({ title, disabled, onPress, customStyle }) {
    return ( 
        <View style={styles.container}>
            <Button 
                disabled={disabled} 
                onPress={onPress}
                mode="contained" 
                buttonColor="#15803D" 
                style={[styles.button, customStyle]}
            >
                {title}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10, 
        borderTopWidth: 1, 
        borderTopColor: '#f2f2f5', 
        backgroundColor: '#ffffff'
    },
    button: {
        borderRadius: 7, 
        paddingHorizontal: 20
    }
})

export default memo(ButtonCustom);