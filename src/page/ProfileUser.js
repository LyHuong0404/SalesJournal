import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Button, TextInput, DefaultTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#c5c6c7', 
    },
};

function ProfileUser() {
    const navigation = useNavigation();
    const { user } = useSelector((state) => state.auth);
 
    const handleLogout = async() => {
        await AsyncStorage.removeItem('user');
        navigation.navigate('UsernameInput');
    }

    return (
        <View style={styles.container}>
            <View onPress={() => navigation.goBack()}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: "flex-start", backgroundColor: 'green', height: 'auto', paddingVertical: 12, paddingHorizontal: 15 }}>
                    <Text style={{ flex: 1, color: '#ffffff', textAlign: 'center', fontWeight: 'bold', marginLeft: 10 }}>Thông tin cá nhân</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Image source={require('../assets/images/avatar.jpg')} style={styles.avatar}/>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 15, flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        theme={theme}
                        style={{ fontSize: 13 }}
                        mode="outlined"
                        label="Tên tài khoản"
                        placeholder="Tên tài khoản"
                        value={user?.username}
                    />
                    <TextInput
                        theme={theme}
                        style={{ fontSize: 13, marginTop: 15 }}
                        mode="outlined"
                        label="Email"
                        placeholder="Email"
                        value={user?.email}
                    />
    
                    {/* <TextInput
                        theme={theme}
                        style={{ fontSize: 13, marginTop: 15 }}
                        mode="outlined"
                        label="Số điện thoại"
                        placeholder="Số điện thoại"
                        value='0123456789'
                    /> */}
                    
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', marginVertical: 15 }} onPress={handleLogout}>
                        <Image source={require('../assets/images/logout.png')} style={{ width: 20, height: 20, marginRight: 10 }}/>
                        <Text>Đăng xuất</Text>
                    </TouchableOpacity>
                    <Button 
                        mode="contained" 
                        buttonColor="#15803D" 
                        style={{ borderRadius: 7 }}>
                        Cập nhật thông tin
                    </Button>
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <Button 
                        mode="outlined" 
                        textColor='#15803D' 
                        buttonColor="transparent" 
                        style={{ borderRadius: 7, borderColor: '#15803D' }}
                        onPress={() => navigation.navigate('RegisterStore')}>
                        Đăng ký bán hàng
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
    avatar: {
        alignSelf: 'center',
        width: '32%',
        height: 120,
        borderRadius: 100,
        marginVertical: 20
    }
})

export default ProfileUser;