import { Modal } from "react-native-paper";
import { Text, StyleSheet, View } from "react-native";
import { useState, memo } from "react";
import { useNavigation } from "@react-navigation/native";


const containerStyle = {backgroundColor: 'white', margin: 40, height: 'auto', borderRadius: 10 };

function ModalExpire() {
    const navigation = useNavigation();

    return (  
        <Modal visible={true} contentContainerStyle={containerStyle}>
            <View style={styles.container}>
                <View style={{ borderBottomColor: '#e2e5ea', borderBottomWidth: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: '#c10d0d', textAlign: 'center', fontSize: 16 }}>Tài khoản đã hết hạn</Text>
                    <Text style={styles.text_question}>Vui lòng gia hạn tài khoản</Text>
                </View>
                <Text style={{ marginTop: 10, color: '#2083c5', textAlign: 'center', fontWeight: '500' }} onPress={() => navigation.navigate('ServicePackage')}>OK</Text>   
            </View>
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
})

export default memo(ModalExpire);