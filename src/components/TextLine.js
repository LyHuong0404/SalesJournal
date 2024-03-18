import { Text, StyleSheet, View } from "react-native";

function TextLine({ title}) {
    return (  
        <View>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.verticalLine} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#ebeced',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    verticalLine: {
        width: 1, 
        height: 30, 
        backgroundColor: '#898888', 
        marginVertical: 5, 
    },
    text: {
        color: 'red'
    },
})

export default TextLine;