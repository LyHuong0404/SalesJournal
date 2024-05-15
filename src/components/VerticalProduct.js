import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { convertTimeStamp } from "../utils/helper";
import { memo } from "react";

function VerticalProduct({product}) {
    const navigation = useNavigation();

    return (  
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('CreateProduct', { product })}>
                <View style={styles.container_image}>
                    <Image source={{ uri: product?.product?.avatar}} style={styles.image}/>
                    {product?.stockAmount == 0 && <View style={styles.overlay}>
                        <Text style={styles.overlayText}>Tạm hết hàng</Text>    
                    </View>}
                </View>
                <View style={{ margin: 8 }}>
                    <Text style={styles.name}>{product?.name}</Text>
                    <Text style={styles.price}>{`${product?.product?.salePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫</Text>
                    <Text style={styles.text_light}>{`Có thể bán: ${product?.stockAmount}`}</Text>             
                    <Text style={styles.text_light}>{`Ngày nhập: ${convertTimeStamp(product?.importedAt, 'dd/MM/yyyy')}`}</Text>
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
        borderRadius: 10,
        marginLeft: 5,
        marginBottom: 10,
    },
    container_image: {
        borderBottomWidth: 1, 
        borderBottomColor: '#e5e5ea',
    },
    image: {
        width: '100%',
        height: 200,
        objectFit: 'contain',
        borderRadius: 10,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, 
        backgroundColor: 'rgba(100, 100, 100, 0.8)'
    },
    overlayText: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#f2f2f2',
        fontSize: 10
    },    
    name: {
        color: '#565656'
    },
    price: {
        fontWeight: 'bold', 
        color: '#f08800', 
        fontSize: 12
    },
    text_light: {
        fontSize: 10,
        color: '#9a9a9a'
    },
})

export default memo(VerticalProduct);