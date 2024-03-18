import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import HorizontalProduct from "./HorizontalProduct";


function DeleteProductFromCategory({ onBack }) {
    return (  
        <>
           <View style={styles.container_product}>
                <Text style={{ textAlign: 'center', fontSize: 10, color: '#7a7a7a', paddingBottom: 10 }}>Chọn sản phẩm xóa khỏi danh mục</Text>
                <ScrollView>
                    <HorizontalProduct checkbox={true}/>
                    <HorizontalProduct checkbox={true}/>
                    <HorizontalProduct checkbox={true}/>
                    <HorizontalProduct checkbox={true}/>
                    <HorizontalProduct checkbox={true}/>
                    <HorizontalProduct checkbox={true}/>
                    <HorizontalProduct checkbox={true}/>
                    <HorizontalProduct checkbox={true}/>
                </ScrollView> 
            </View>

            <View style={styles.button_group}>
                <View style={styles.display}>
                    <Button 
                        mode="outlined" 
                        textColor="#575757" 
                        buttonColor='transparent' 
                        onPress={onBack} 
                        style={[styles.button, { borderColor: '#575757' }]}>
                        Quay lại
                    </Button>
                    <Button  
                        // onPress={onPress}
                        mode="contained" 
                        buttonColor="#15803D" 
                        style={styles.button}
                    >
                        Xác nhận xóa
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
export default DeleteProductFromCategory;