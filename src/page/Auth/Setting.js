import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import { useState } from "react";

import { logout } from "../../actions/authActions";
import LoadingSpinner from "../../components/LoadingSpinner";

function Setting() {
    const navigation = useNavigation();
    const [loadingLogout, setLoadingLogout] = useState(false);


    const handleLogout = async() => {
        setLoadingLogout(true);
        await logout();
        setLoadingLogout(false);
        navigation.navigate('LoginNav');
    }
    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: "flex-start", height: 50, backgroundColor: 'white', paddingHorizontal: 15,  }}>
                        <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', marginLeft: 10 }}>Cài đặt</Text>
                </View>
            </TouchableOpacity>
            <ScrollView style={{ flex: 1, marginTop: 20 }}>
                <TouchableOpacity style={styles.setting_item} onPress={() => navigation.navigate('SettingStore')}>
                    <Image source={require('../../assets/images/setting_store.png')} style={styles.icon} />
                    <Text style={{ flex: 1, marginLeft: 10 }}>Cài đặt cửa hàng</Text>
                    <Image source={require('../../assets/images/left_arrow.png')} style={[styles.icon, { tintColor: '#6f6f6f' }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.setting_item} onPress={() => navigation.navigate('SettingProfile')}>
                    <Image source={require('../../assets/images/setting.png')} style={styles.icon} />
                    <Text style={{ flex: 1, marginLeft: 10 }}>Cài đặt cá nhân</Text>
                    <Image source={require('../../assets/images/left_arrow.png')} style={[styles.icon, { tintColor: '#6f6f6f' }]} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.setting_item, { marginTop: 20 }]} onPress={handleLogout}>
                    <Image source={require('../../assets/images/logout.png')} style={[styles.icon, { tintColor: '#3a3a3a'}]} />
                    <Text style={{ flex: 1, marginLeft: 10 }}>Đăng xuất</Text>
                    <Image source={require('../../assets/images/left_arrow.png')} style={[styles.icon, { tintColor: '#6f6f6f' }]} />
                </TouchableOpacity>
                
            </ScrollView>
            <View style={{ flex: 0.15, alignItems: 'center' }}>
                <Image source={require('../../assets/images/guarantee.png')} style={{ width: 35, height: 35, objectFit: 'contain', marginBottom: 10 }} />
                <Text style={{ marginBottom: 20, fontSize: 11, color: '#7a7a7a' }}>An toàn & bảo mật 100%</Text>
            </View>
            {loadingLogout && <LoadingSpinner />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#e7ede9',
    },
    box: {
        marginVertical: 10,
        height: 'auto',
        width: '90%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 10,
    },
    box_content: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignContent: 'center',
        justifyContent: 'center'
    }, 
    avatar: {
        height: 90,
        width: '30%',
        marginRight: 25,
        borderRadius: 50,
    },
    setting_item: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea',
        alignItems: 'center',
    },
    icon: {
        width: 22,
        height: 22,
        tintColor: '#15803D'
    }
})

export default Setting;