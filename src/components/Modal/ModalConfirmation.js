import { Modal } from "react-native-paper";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

const containerStyle = {backgroundColor: 'white', margin: 20, height: 'auto', borderRadius: 7 };

function ModalConfirmation({ title, question, textYes, textNo, onPressConfirm, onPressCancel}) {
    const [visible, setVisible] = useState(true);

    const hideModal = () => {
        setVisible(false);
    }

    const handleConfirm = () => {
        onPressConfirm();
        hideModal();
    }

    const handleCancel = () => {
        onPressCancel()
        hideModal();
    }

    return (  
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View style={styles.container}>
                <View style={styles.display}>
                    <Text style={{ fontWeight: '500', color: 'black'}}>{title}</Text>
                    <TouchableOpacity onPress={handleCancel}>
                        <Image source={require('../../assets/images/close.png')} style={styles.icon_close} />
                    </TouchableOpacity> 
                </View> 
                <Text style={styles.text_question}>{question}</Text>
                <View style={styles.button_container}>
                    <Text style={styles.text_No} onPress={handleCancel}>{textNo}</Text>
                    <Text style={styles.text_confirm} onPress={handleConfirm}>{textYes}</Text>
                </View>    
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e5ea'
    },
    icon_close: {
        width: 16,
        height: 16,
    },
    text_question: {
        marginVertical: 20,
        fontWeight: '500', 
        color: '#575757'
    },
    button_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    text_confirm: {
        fontWeight: '500',
        color: '#b21414',
        marginLeft: 40
    },
    text_No: {
        fontWeight: '500', 
        color: '#575757'
    }
})

export default ModalConfirmation;