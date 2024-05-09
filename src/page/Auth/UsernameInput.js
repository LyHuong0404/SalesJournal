import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { Button, TextInput, DefaultTheme  } from "react-native-paper";
import { getCodeSignUp } from "../../actions/authActions";

import Loading from "../../components/Loading";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#888888', 
    },
};

function UsernameInput() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNavigation = async() => {
        setLoading(true);
        try{
            const response = await getCodeSignUp({ username });
            if (response?.message == "OTP Sent") {
                navigation.navigate("Register", { username });
            } else {
                navigation.navigate("Login", { username });
            }
            setLoading(false);
        } catch(e){
            setLoading(false);
            ToastAndroid.show('Thất bại!', ToastAndroid.SHORT);
        }
    }

    return ( 
        <View style={styles.container}>
            <View style={{ flex: 1, marginTop: 100}}>
                <Text style={{ color: '#15803D' }}>Nhập tên tài khoản</Text>
                <TextInput
                    style={{ height: 40, backgroundColor: 'transparent', paddingHorizontal: 0, fontSize: 14, marginBottom: 20, paddingVertical: 5, underlineColor: "red" }}
                    placeholder="Ví dụ: nguyena"
                    placeholderTextColor="#abaaaa"
                    right={username ? <TextInput.Icon icon="close-circle-outline" onPress={() => setUsername('') }/> : null} 
                    rippleColor='#15803D'
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    theme={theme}
                />  
       
                <Button disabled={username == ''} mode="contained" 
                        onPress={handleNavigation} 
                        buttonColor="#15803D" style={{ borderRadius: 7, paddingHorizontal: 22 }}>
                    Tiếp tục
                </Button>
            </View>
            <View style={{ flex: 0.3, alignItems: 'center', marginVertical: 10 }}>
                <Image source={require('../../assets/images/guarantee.png')} style={{ width: 40, height: 40, objectFit: 'contain', marginBottom: 10 }} />
                <Text style={{ marginBottom: 20, fontSize: 11 }}>An toàn & bảo mật 100%</Text>
                <Text style={{ color: '#888888' }}>Bằng việc ấn vào Tiếp tục, bạn đã đồng ý với <Text style={{ color: '#15803D'}}>Điều khoản và Điều kiện sử dụng </Text>của ứng dụng</Text>
            </View>
            {loading && <Loading />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        paddingHorizontal: 15, 
        backgroundColor: '#fbfdff',
    },
})


export default UsernameInput;