import { StyleSheet, ScrollView, View } from "react-native";
import { Button } from "react-native-paper";

import HorizontalProduct from "./HorizontalProduct";
import { memo } from "react";

function ProductInCategoryTab({ products, onDelete, onAdd }) {

    return (  
        <>
            <View style={styles.container_product}>
                <ScrollView >
                    {products?.map((product, index) => <HorizontalProduct key={index} product={product} checkbox={false}/>)}
                </ScrollView> 
            </View>

            <View style={styles.button_group}>
                <View style={styles.display}>
                    <Button 
                        mode="outlined" 
                        textColor="#15803D" 
                        buttonColor='transparent' 
                        onPress={onDelete} 
                        style={styles.button}>
                        Xóa sản phẩm
                    </Button>
                    <Button  
                        onPress={onAdd}
                        mode="contained" 
                        buttonColor="#15803D" 
                        style={styles.button}
                    >
                        Thêm sản phẩm
                    </Button>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container_product: {
        flex: 1,
        padding: 10
    },
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
export default memo(ProductInCategoryTab);