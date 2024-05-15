import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity} from "react-native";
import { Text } from "react-native-paper";
import { useState } from "react";
import QRCode from 'react-native-qrcode-svg';


function MyQR() {
  const navigation = useNavigation();
  const route = useRoute();
  const [QR, setQR] = useState(route?.params?.email || '')

  
  return ( 
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>QR tích điểm</Text>            
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
            <View style={{ borderColor: '#e2e5ea', borderWidth: 4 }}>
                <QRCode
                    value={QR.toString()}
                    size={200}
                    color="black"
                    backgroundColor="white"
                />
            </View>
            <Text style={{ marginVertical: 10, fontSize: 12, color: '#888888' }}>Đưa mã này cho thu ngân</Text>            
        </View>

    </View> 
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7f8',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderBottomWidth: 1,  
        borderBottomColor: '#e5e5ea',
    },
    content_noitem: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center', 
        paddingHorizontal: 8,
    },
    content: {
        flex: 0.9,
        paddingHorizontal: 8, 
    }
});

export default MyQR;