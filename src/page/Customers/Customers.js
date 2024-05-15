import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

import { filterBonus } from "../../actions/seller/bonusActions";
import LoadingSpinner from "../../components/LoadingSpinner";


function Customers() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        try{
            const fetchAPI = async()=> {
                setLoading(true);
                const response = await filterBonus({ pageIndex: 0, pageSize: 1000, orderBy: null });
                if (response){
                    setCustomers(response.content);
                } else {
                    ToastAndroid.show('Lỗi tải danh sách khách hàng không thành công', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
          
        } catch(e){
            setLoading(false);
            ToastAndroid.show('Lỗi tải danh sách khách hàng không thành công', ToastAndroid.SHORT);
        }
    }, [])    

    
    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Quản lý khách hàng</Text>
            </View>
            <View style={{ marginHorizontal: 15 }}>
                <Text style={{ fontWeight: '600' }}>Danh sách khách hàng </Text>
                <Text style={{ fontWeight: 'bold' }}>Tổng: <Text style={{ fontWeight: '500', color: 'red'}}>{customers.length}</Text></Text>
            </View>
            {customers?.length > 0 ?
                (<ScrollView style={{ flex: 1, margin: 15 }}> 
                    <View style={{ backgroundColor: 'white'}}>
                        <DataTable.Header>
                            <DataTable.Title>Email</DataTable.Title>
                            <DataTable.Title numeric>Điểm</DataTable.Title>
                        </DataTable.Header>
                        {customers.map((item, index) => 
                            <DataTable.Row key={index}>
                                <DataTable.Cell ><Text style={styles.cell_text_number}>{item.buyerEmail}</Text></DataTable.Cell>
                                <DataTable.Cell numeric><Text style={[styles.cell_text_number, { fontWeight: '500' }]}>{item.point}</Text></DataTable.Cell>
                            </DataTable.Row>
                        )}
                    </View>
                </ScrollView>
            ) : 
                <View style={styles.content_noitem}>
                    <Image source={require('../../assets/images/noresults.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Cửa hàng chưa có khách hàng nào</Text>
                </View>
            }

            {loading && <LoadingSpinner />}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7f8',
    },
    content_noitem: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center', 
        paddingHorizontal: 8,
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        marginBottom: 10
    },
    button: {
        width: '28%',
        borderWidth: 2,
        borderColor: '#15803D',
        borderRadius: 7,
    },
    cell_text_number: {
        color: '#585858',
        fontSize: 12
    }
})

export default Customers;