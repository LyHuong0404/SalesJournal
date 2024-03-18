import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Button, TextInput, DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#c5c6c7', 
    },
};

function Profile() {
    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: "flex-start", backgroundColor: 'green', height: 'auto', paddingVertical: 12, paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain', tintColor: '#ffffff' }}/>
                </TouchableOpacity>
                <Text style={{ flex: 1, color: '#ffffff', textAlign: 'center', fontWeight: 'bold', marginLeft: 10 }}>Chỉnh sửa thông tin cá nhân</Text>
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
                        value='username'
                    />
                    <TextInput
                        theme={theme}
                        style={{ fontSize: 13, marginTop: 15 }}
                        mode="outlined"
                        label="Email"
                        placeholder="Email"
                        value='van@gmail.com'
                    />
    
                    <TextInput
                        theme={theme}
                        style={{ fontSize: 13, marginTop: 15 }}
                        mode="outlined"
                        label="Số điện thoại"
                        placeholder="Số điện thoại"
                        value='0123456789'
                    />
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <Button 
                        mode="contained" buttonColor="#15803D" style={{ borderRadius: 7 }}>
                        Cập nhật
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

export default Profile;