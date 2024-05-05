import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";

function SettingProfile() {
    const navigation = useNavigation();

    const { user } = useSelector((state) => state.auth);

    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: "flex-start", backgroundColor: 'green', height: 'auto', paddingVertical: 12 }}>
                        <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain', tintColor: '#ffffff' }}/>
                    <Text style={{ flex: 1, color: '#ffffff', textAlign: 'center', fontWeight: 'bold', marginLeft: 10 }}>Thông tin cá nhân</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.box}>
                <View style={styles.box_content}>
                    <Image source={require('../../assets/images/avatar.jpg')} style={styles.avatar} />
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: '#575757', fontWeight: '500' }}>{user.username}</Text>
                        <Text style={{ color: "#8e8e93"}}>{user.email}</Text>
                        <Text style={{ color: "#15803D", fontWeight: '500', fontSize: 13}} onPress={() => navigation.navigate("Profile")}>Chỉnh sửa thông tin</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.setting_item}>
                    <Image source={require('../../assets/images/lock.png')} style={styles.icon} />
                    <Text style={{ flex: 1, marginLeft: 10 }}>Đổi mật khẩu</Text>
                    <Image source={require('../../assets/images/left_arrow.png')} style={[styles.icon, { tintColor: '#d9d9d9' }]} />
                </View>
                <View style={styles.setting_item}>
                    <Image source={require('../../assets/images/message.png')} style={styles.icon} />
                    <Text style={{ flex: 1, marginLeft: 10 }}>Đóng góp ý kiến</Text>
                    <Image source={require('../../assets/images/left_arrow.png')} style={[styles.icon, { tintColor: '#d9d9d9' }]} />
                </View>
                <View style={styles.setting_item}>
                    <Image source={require('../../assets/images/info.png')} style={styles.icon} />
                    <Text style={{ flex: 1, marginLeft: 10 }}>Về ứng dụng</Text>
                    <Image source={require('../../assets/images/left_arrow.png')} style={[styles.icon, { tintColor: '#d9d9d9' }]} />
                </View>
                <View style={styles.setting_item}>
                    <Image source={require('../../assets/images/lock.png')} style={styles.icon} />
                    <Text style={{ flex: 1, marginLeft: 10 }}>Quy chế hoạt động</Text>
                    <Image source={require('../../assets/images/left_arrow.png')} style={[styles.icon, { tintColor: '#d9d9d9' }]} />
                </View>
                <View style={styles.setting_item}>
                    <Image source={require('../../assets/images/lock.png')} style={styles.icon} />
                    <Text style={{ flex: 1, marginLeft: 10 }}>Chính sách bảo mật</Text>
                    <Image source={require('../../assets/images/left_arrow.png')} style={[styles.icon, { tintColor: '#d9d9d9' }]} />
                </View>
                <View style={styles.setting_item}>
                    <Image source={require('../../assets/images/lock.png')} style={styles.icon} />
                    <Text style={{ flex: 1, marginLeft: 10 }}>Giải quyết khiếu nại</Text>
                    <Image source={require('../../assets/images/left_arrow.png')} style={[styles.icon, { tintColor: '#d9d9d9' }]} />
                </View>
                
            </ScrollView>
            <View style={{ flex: 0.15, alignItems: 'center' }}>
                <Image source={require('../../assets/images/guarantee.png')} style={{ width: 35, height: 35, objectFit: 'contain', marginBottom: 10 }} />
                <Text style={{ marginBottom: 20, fontSize: 11, color: '#7a7a7a' }}>An toàn & bảo mật 100%</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        paddingHorizontal: 15, 
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
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea',
        alignItems: 'center',
    },
    icon: {
        width: 15,
        height: 15,
    }
})

export default SettingProfile;