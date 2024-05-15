import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView, Dimensions } from "react-native";
import { FAB } from "react-native-paper";

import { filterServicePackage } from "../../actions/otherActions";
import { convertTimeStamp } from "../../utils/helper";
import LoadingSpinner from "../../components/LoadingSpinner";

const screenWidth = Dimensions.get('window').width;

function ServicePackageManagement() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [servicePackages, setServicePackages] = useState([]);

    const getServicePackages = async() => {
        const response = await filterServicePackage({ pageIndex: 0, pageSize: 1000, orderBy: null });
        if (response) {
            setServicePackages(response.content);
        } else {
            ToastAndroid.show('Lỗi tải danh sách gói gia hạn không thành công', ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        try{
            const fetchAPI = ()=> {
                setLoading(true);
                getServicePackages();
                setLoading(false);
            }
            fetchAPI();
          
        } catch(e){
            setLoading(false);
            ToastAndroid.show('Lỗi tải danh sách gói gia hạn không thành công', ToastAndroid.SHORT);
        }
    }, [])    

    useFocusEffect(
        useCallback(() => {
            getServicePackages();
        }, [])
    );
    
    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Quản lý gói gia hạn</Text>
            </View>
            <View style={{ marginHorizontal: 15 }}>
                <Text style={{ fontWeight: '600' }}>Danh sách các gói gia hạn </Text>
                <Text style={{ fontWeight: 'bold' }}>Tổng: <Text style={{ fontWeight: '500', color: 'red'}}>{servicePackages.length}</Text></Text>
            </View>
            {servicePackages?.length > 0 ?
                (<ScrollView style={{ flex: 1, marginHorizontal: 15, marginBottom: 15 }}> 
                    {servicePackages.map((item, index) => 
                            <TouchableOpacity style={styles.package_container} key={index} onPress={() => navigation.navigate('AddServicePackage', { data: item })}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: '600', marginBottom: 5 }}>{`GNC${item.id}`}</Text>
                                    <Text style={{ fontWeight: '600', color: '#e19610' }}>{`${item?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫</Text>
                                </View>
                                <Text style={styles.text_light}>{`NÂNG CẤP: ${item.day} ngày`}</Text> 
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.text_light}>{`Ngày tạo: ${convertTimeStamp(item?.createdAt, 'dd/MM/yyyy')}`}</Text> 
                                    {item.activated ?
                                        <Text style={{ fontSize: 11, color: '#15803D', backgroundColor: '#d2fce2', borderRadius: 7, paddingHorizontal: 5, width: 80, textAlign: 'center' }}>Đang chạy</Text>
                                        : <Text style={{ fontSize: 11, color: '#a5a5a5', backgroundColor: '#e2e5ea', borderRadius: 7, paddingHorizontal: 5, width: 80, textAlign: 'center' }}>Đã dừng</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                        )}
                        
                </ScrollView>
            ) : 
                <View style={styles.content_noitem}>
                    <Image source={require('../../assets/images/noresults.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Chưa có gói nâng cấp nào</Text>
                </View>
            }
            <FAB
                icon="plus"
                label="Tạo gói"
                style={styles.fab}
                onPress={() => navigation.navigate('AddServicePackage')} 
                color='white'
            />
            {loading && <LoadingSpinner />}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
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
    package_container: {
        marginTop: 10, 
        borderRadius: 10,
        alignSelf: 'center',
        width: screenWidth - 30,
        height: 'auto',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderWidth: 0.6,
        borderColor: '#e19610',
        elevation: 1
    },
    text_light: {
        fontSize: 9,
        color: '#6f6f6f',
        marginBottom: 5
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: '#0e7bc5',
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1.5
    },
})

export default ServicePackageManagement;