import { StyleSheet, ScrollView, Text, View, ToastAndroid } from "react-native";
import { Button } from "react-native-paper";
import HorizontalProduct from "./HorizontalProduct";
import { useState } from "react";
import Loading from "./Loading";
import { deleteProduct } from "../actions/seller/productActions";
import ModalConfirmation from "./Modal/ModalConfirmation";


function DeleteProductFromCategory({ products, onBack }) {
    const [productIdDeleteArray, setProductIdDeleteArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChangeDataDelete = (id) => {
        let checkExist = productIdDeleteArray?.some(item => item == id);
        if (!checkExist) {
            setProductIdDeleteArray(prev => [...prev, id]);
        } else {
            setProductIdDeleteArray(prev => prev.filter(item => item !== id));
        }
    }

    
    const handleDeleteProductInCategory = () => {
        try{
            setLoading(true);
            productIdDeleteArray.map((id) => {
                const fetchAPI = async() => {
                    await deleteProduct(id);
                }
                fetchAPI();
            });
            ToastAndroid.show('Xóa sản phẩm thành công', ToastAndroid.SHORT);
            setLoading(false);
            setShowModal(false);
            onBack();
        } catch(err) {
            setLoading(false);
            setShowModal(false);
            ToastAndroid.show('Xóa sản phẩm thất bại', ToastAndroid.SHORT);
        }
    }

    return (  
        <>
           <View style={styles.container_product}>
                <Text style={{ textAlign: 'center', fontSize: 10, color: '#7a7a7a', paddingBottom: 10 }}>Chọn sản phẩm xóa khỏi danh mục</Text>
                <ScrollView>
                    {products?.map((product, index) => <HorizontalProduct key={index} product={product} checkbox={true} productIdDeleteArray={(data) => handleChangeDataDelete(data)}/>)}
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
                        onPress={() => setShowModal(true)}
                        mode="contained" 
                        buttonColor="#15803D" 
                        style={styles.button}
                        disabled={productIdDeleteArray?.length == 0}
                    >
                        Xác nhận xóa
                    </Button>
                </View>
            </View> 
            {showModal && 
                <ModalConfirmation 
                    title="Xóa sản phẩm?" 
                    question="Bạn có chắc rằng muốn xóa sản phẩm?"
                    textYes="Xóa"
                    textNo="Quay lại"
                    onPressCancel={() => setShowModal(false)}
                    onPressConfirm={handleDeleteProductInCategory}
                />
            }
            {loading && <Loading />}
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