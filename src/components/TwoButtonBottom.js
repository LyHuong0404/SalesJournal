import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

function TwoButtonBottom({onBack, textColorLeft, titleLeft, buttonColorLeft, iconLeft, buttonColorRight, borderColorLeft, titleRight, onPressRight }) {
    return (  
        <View style={styles.button_group}>
            <View style={styles.display}>
                <Button 
                    icon={iconLeft}
                    mode="outlined" 
                    textColor={textColorLeft} 
                    buttonColor={buttonColorLeft} 
                    onPress={onBack}
                    style={[styles.button, { borderColor: borderColorLeft }]}>
                    {titleLeft}
                </Button>
                <Button  
                    onPress={onPressRight}
                    mode="contained" 
                    buttonColor={buttonColorRight} 
                    style={styles.button}
                >
                    {titleRight}
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        borderWidth: 1.5,
        borderColor: '#15803D',
        borderRadius: 7,
        // margin: 10, 
    }
})
export default TwoButtonBottom;