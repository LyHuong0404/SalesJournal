import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

function TwoButtonBottom({onBack, title1, title2}) {
    return (  
        <View style={styles.button_group}>
                <View style={styles.display}>
                    <Button 
                        mode="outlined" 
                        textColor="#575757" 
                        buttonColor='transparent' 
                        onPress={onBack} 
                        style={[styles.button, { borderColor: '#575757' }]}>
                        {title1}
                    </Button>
                    <Button  
                        // onPress={onPress}
                        mode="contained" 
                        buttonColor="#15803D" 
                        style={styles.button}
                    >
                        {title2}
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
        borderWidth: 2,
        borderColor: '#15803D',
        borderRadius: 7,
        // margin: 10, 
    }
})
export default TwoButtonBottom;