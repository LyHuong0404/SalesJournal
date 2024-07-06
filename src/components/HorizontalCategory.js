import { useNavigation } from "@react-navigation/native";
import { memo } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";


function HorizontalCategory({ category }) {
    const navigation = useNavigation();

    return (  
        <TouchableOpacity onPress={() => navigation.navigate('ProductInCategory', { categoryId: category?.id })}>
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <View style={[styles.display, { justifyContent: 'space-between', width: '100%' }]}>
                        <View style={styles.display}>
                            <Image source={{ uri: category?.avatar }} style={styles.image_product}/>
                            <View style={{ justifyContent: 'space-around' }}>
                                <Text style={styles.name}>#{category?.id} - {category?.name}</Text>         
                                <Text style={styles.text_light}>{`Giá bán       : ${category?.salePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>             
                                <Text style={styles.text_light}>{`Có thể bán : ${category?.stockAmount}`}</Text>             
                            </View>
                        </View>
                        {category.isPromotion && <Image source={require('../assets/images/sale.png')} style={{ width: 24, height: 24, objectFit: 'cover'}}/>}
                    </View>
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
        height: 25,
        width: 25,
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
        fontWeight: '600',
        width: '70%', 
        width: '100%',
    },
    number: {
        fontWeight: '500',
        color: '#9c9d9e',
        fontSize: 12
    },
    text_light: {
        fontSize: 10,
        color: '#9a9a9a'
    },
})

export default memo(HorizontalCategory);