import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { HelperText, TextInput, DefaultTheme } from "react-native-paper";
import { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getCodeSignUp } from "../../actions/authActions";
import PasswordInput from "../../components/PasswordInput";
import ButtonCustom from "../../components/ButtonCustom";
import TextInputCustom from "../../components/TextInputCustom";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#888888', 
    },
};

function RegisterStore() {
    const navigation = useNavigation();
    const [nameStore, setNameStore] = useState('');


    const handleRegisterStore = () => {
        // try{
        //     const fetchAPI = async() => {
        //         // const response =
        //     }
        // } catch(err){

        // }
    }
      
    return ( 
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 15, flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <KeyboardAwareScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    >
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#15803D' }}>Đăng ký </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>cửa hàng</Text>
                    </View>
                    <TextInputCustom 
                        label="Tên cửa hàng" 
                        required={true} 
                        placeholder="Ví dụ: Cửa hàng bách hóa" 
                        value={nameStore} 
                        onChange={(text) => setNameStore(text)}
                    />
                     
                </KeyboardAwareScrollView>
            </View>

            <ButtonCustom 
                disabled={!nameStore} 
                onPress={handleRegisterStore} 
                customStyle={{ marginHorizontal: 15 }}
                title="Đăng ký">
            </ButtonCustom>
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

export default RegisterStore;