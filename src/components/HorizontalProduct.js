import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useState } from 'react';


function HorizontalProduct({ checkbox}) {
    const [checked, setChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
    };

    return (  
        <TouchableOpacity onPress={handleCheckboxToggle}>
            <View style={styles.item_container}>
                {checkbox && <Checkbox color='#15803D' uncheckedColor='#a6a6a6' 
                                status={checked ? 'checked' : 'unchecked'}/>}
                <Image source={require('../assets/images/haohao.jpg')} style={styles.item_image} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.item_name}>Mì Hảo Hảo</Text>
                    <Text style={styles.item_price}>14.000</Text>
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
        borderColor: '#eeeef2',
        marginBottom: 10,
        borderRadius: 7,
        elevation: 2,
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
        fontWeight: '600', 
        color: '#7a7a7a',
        marginBottom: 15
    },
    item_price: {
        fontWeight: 'bold', 
        color: '#f08800', 
        fontSize: 12
    },
})

export default HorizontalProduct;