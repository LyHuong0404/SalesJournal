import { View, StyleSheet, Text, Image } from "react-native";



function Intro() {


    return ( 
        <View style={styles.container}>
            <View style={styles.display}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'cener' }}>
                    <Image source={require('../assets/images/bottom3_active.png')} style={{ width: 28, height: 28, objectFit: 'contain'}}/>
                    <Text style={styles.text}>SoBanHang</Text>
                </View>
                <Text style={styles.text}>Ứng dụng quản lý bán hàng</Text>
                <Text style={{ fontWeight: 'bold', color: '#f49158', fontSize: 18 }}>thông minh</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Image source={require('../assets/images/intro.png')} />
                <View style={{ backgroundColor: '#039403', height: '100%' }}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: 'white'
    },
    display: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        color: '#15803D',
        fontSize: 18
    }
    
})

export default Intro;