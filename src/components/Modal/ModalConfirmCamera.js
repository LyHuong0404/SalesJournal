import { View, StyleSheet, Text, ToastAndroid, Image  } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, TextInput, DefaultTheme } from "react-native-paper";
import { format, parse } from 'date-fns';
import DateTimePicker from "react-native-modal-datetime-picker";
import TwoButtonBottom from "../TwoButtonBottom";


function ModalConfirmCamera() {


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontWeight: '600', textAlign: 'center', flex: 1 }}>Bộ lọc</Text>
                <TouchableOpacity style={{ flex: 0.5}}>
                    <Image source={require('../../assets/images/close.png')} style={{ width: 15, height: 15 }}/>
                </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Image source={require('../../assets/images/image_circle.png')} style={{ width: 15, height: 15 }}/>
                <Text style={{ color: '#ffffff' }}>Chụp ảnh đại diện</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      marginHorizontal: 15
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e5ea',
        paddingBottom: 10
    },
    button_container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    button_calendar: {
        width: '48%',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1
    },
    text_input_day: {
        flex: 1,
        paddingVertical: 0,
        height: 35,
        backgroundColor: 'transparent',
        fontSize: 13,
        paddingHorizontal: 0
    }
    
  });
export default ModalConfirmCamera;