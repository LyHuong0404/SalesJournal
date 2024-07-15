import { memo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";



function ModalServicePackage({ servicePackage, onNavigation }) {
    const navigation = useNavigation();
    const [data, setData] = useState(servicePackage || {});

    
    return ( 
        <View style={styles.container}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e2e5ea'}}>
                <Text style={{ fontWeight: '600', textAlign: 'center', marginBottom: 10 }}>Đăng ký gói gia hạn</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e2e5ea' }}>
                    <View style={styles.box_container}>
                        <Text style={{ color: '#838383' }}>HSD</Text>
                        <Text style={{ color: '#e19610', fontWeight: '600' }}>{`${data.day} ngày`}</Text>
                    </View>
                    <Text style={{ marginVertical: 20, color: '#838383', fontSize: 13 }}>Bạn đang thực hiện đăng ký gói 
                        <Text style={{ color: '#3a3a3a' }}>{` GNC${data.id}`}</Text>
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ marginBottom: 20, color: '#838383', fontSize: 13 }}>Giá gói:  
                        <Text style={{ color: '#3a3a3a' }}>{` ${data?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫</Text>
                    </Text>
                </View>
                <Button  
                    mode="contained" 
                    buttonColor="#e19610" 
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("Payment", { servicePackage: data });
                        onNavigation();
                    }}
                >
                    Thanh toán
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button_group: {
        padding: 10, 
        borderTopWidth: 1, 
        borderTopColor: '#f2f2f5', 
        backgroundColor: '#ffffff'
    },
    button: {
        borderWidth: 1,
        borderColor: '#e19610',
        borderRadius: 7,
    },
    box_container: {
        alignSelf: 'center', 
        borderColor: '#e2e5ea', 
        borderWidth: 1, 
        borderRadius: 10,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        backgroundColor: '#fafafa'
    }
})

export default memo(ModalServicePackage);