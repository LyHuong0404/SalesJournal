import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { memo, useState } from 'react';
import { convertTimeStamp } from '../utils/helper';

function HorizontalProduct({ product, checkbox, productIdDeleteArray }) {
    const [checked, setChecked] = useState(false);

    const handleCheckboxToggle = () => {
        productIdDeleteArray(product.id);
        setChecked(!checked);
    };

    return (  
        <TouchableOpacity onPress={handleCheckboxToggle}>
            <View style={styles.item_container}>
                {checkbox && <Checkbox color='#15803D' uncheckedColor='#a6a6a6' 
                                status={checked ? 'checked' : 'unchecked'}/>}
                <Image source={{ uri: product?.product?.avatar}} style={styles.item_image} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.item_name}>{product?.name}</Text>
                    <Text style={styles.text_light}>{`Có thể bán: ${product?.stockAmount}`}</Text>             
                    <Text style={styles.text_light}>{`Ngày nhập: ${convertTimeStamp(product?.importedAt, 'dd/MM/yyyy')}`}</Text>
                    {/* <Text style={styles.item_price}>{`${product?.product?.salePrice}.000 ₫`}</Text> */}
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    item_container: {
        display: 'flex', 
        flexDirection: 'row', 
        padding: 5, 
        backgroundColor: '#ffffff', 
        height: 'auto', 
        borderWidth: 1, 
        borderColor: '#e2e5ea',
        marginBottom: 10,
        borderRadius: 7,
        alignItems: 'center',
    },
    item_image: {
        width: 100, 
        height: 80, 
        marginRight: 10, 
        objectFit: 'contain',
        borderRadius: 7
    },
    item_name: {
        fontWeight: '500', 
        color: '#7a7a7a',
    },
    item_price: {
        fontWeight: 'bold', 
        color: '#f08800', 
        fontSize: 12
    },
    text_light: {
        fontSize: 10,
        color: '#9a9a9a'
    },
})

export default memo(HorizontalProduct);