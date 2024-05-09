import { Text, View, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { HelperText, TextInput, DefaultTheme } from "react-native-paper";
import { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getCodeSignUp } from "../../actions/authActions";
import PasswordInput from "../../components/PasswordInput";
import ButtonCustom from "../../components/ButtonCustom";
import TextInputCustom from "../../components/TextInputCustom";
import { useDispatch } from "react-redux";
import { registerStore } from "../../actions/user/authActions";


function Setting() {

      
    return ( 
        <View style={styles.container}>
            
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fbfdff',
    },
})

export default Setting;