import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";


function HorizontalCategory() {
    const navigation = useNavigation();

    return (  
        <TouchableOpacity onPress={() => navigation.navigate('ProductInCategory')} >
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <View style={styles.display}>
                        <Image source={require('../assets/images/result.png')} style={styles.image_product}/>
                        <View style={{ justifyContent: 'space-around'}}>
                            <Text style={styles.name}>Đồ dùng</Text>
                            <Text style={styles.number}>5 <Text style={styles.number}>Sản phẩm</Text></Text> 
                        </View>
                    </View>
                    <Image source={require('../assets/images/move.png')} style={styles.image_move}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        paddingVertical: 15,
        display:'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto'
    },
    display: {
        display:'flex',
        flexDirection: 'row',
    },
    image_move:  {
        height: 30,
        width: 30,
        objectFit: 'contain'
    },
    image_product: {
        marginRight: 15,
        height: 60,
        width: 60,
        objectFit: 'contain',
        borderRadius: 10,
    },
    name: {
        color: '#454444',
        fontWeight: '600'
    },
    number: {
        fontWeight: '500',
        color: '#9c9d9e',
        fontSize: 12
    }
})

export default HorizontalCategory;