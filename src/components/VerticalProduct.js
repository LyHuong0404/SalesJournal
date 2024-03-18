import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

function VerticalProduct() {
    return (  
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.container_image}>
                    <Image source={require('../assets/images/haohao.jpg')} style={styles.image}/>
                    </View>
                <View style={{ margin: 8 }}>
                    <Text style={styles.name}>Mì Hảo Hảo</Text>
                    <Text style={styles.price}>14.000</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '48%',
        backgroundColor: 'white',
        height: 'auto',
        borderWidth: 1,
        borderColor: '#e5e5ea',
        borderRadius: 7,
        marginLeft: 5,
        marginBottom: 10,
        elevation: 1,
    },
    container_image: {
        borderBottomWidth: 1, 
        borderBottomColor: '#e5e5ea',
    },
    image: {
        width: '100%',
        height: 200,
        objectFit: 'contain',
        borderRadius: 7,
    },
    name: {
        fontWeight: '600', 
        color: '#7a7a7a'
    },
    price: {
        fontWeight: 'bold', 
        color: '#f08800', 
        fontSize: 12
    }
})

export default VerticalProduct;