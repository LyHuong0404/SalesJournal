import { Modal } from "react-native-paper";
import { Text, StyleSheet, View } from "react-native";
import { useState, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { logout } from "../../actions/authActions";
import LoadingSpinner from "../LoadingSpinner";


const containerStyle = {backgroundColor: 'white', margin: 40, height: 'auto', borderRadius: 10 };

function ModalExpire() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = async() => {
        setLoading(true);
        await dispatch(logout());
        setLoading(false);
        navigation.navigate('LoginNav');
      }

    return (  
        <Modal visible={true} contentContainerStyle={containerStyle}>
            <View style={styles.container}>
                <View style={{ borderBottomColor: '#e2e5ea', borderBottomWidth: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: '#c10d0d', textAlign: 'center', fontSize: 16 }}>Tài khoản đã hết hạn</Text>
                    <Text style={styles.text_question}>Vui lòng gia hạn tài khoản</Text>
                </View>
                <View style={styles.display}>
                    <Text style={{ marginTop: 10, color: '#a3b8c8', fontWeight: '500' }} onPress={handleLogout}>Đăng xuất</Text>   
                    <Text style={{ marginTop: 10, color: '#2083c5', fontWeight: '500' }} onPress={() => navigation.navigate('ServicePackage')}>Gia hạn</Text>   
                </View>
            </View>
            {loading && <LoadingSpinner />}
        </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text_question: {
        marginBottom: 15, 
        color: '#575757',
        fontSize: 13,
        textAlign: 'center',
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        alignItems: 'center',
    }
})

export default memo(ModalExpire);