import { StyleSheet, View, TouchableOpacity, Image, Text, ToastAndroid, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import { Button, Searchbar } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

import { filterServicePackage } from "../actions/otherActions";
import ModalServicePackage from "../components/Modal/ModalServicePackage";
import LoadingSpinner from "../components/LoadingSpinner";

const screenWidth = Dimensions.get('window').width;


function ServicePackage() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [servicePackage, setServicePackage] = useState([]);
    const refRBSheet = useRef();
    const [serviceSelected, setServiceSelected] = useState({});


    useEffect(() => {  
        try {
            const fetchAPI = async() => {
                setLoading(true);
                const response = await filterServicePackage({ pageIndex: 0, pageSize: 1000, orderBy: null });
                if (response) {
                    response.content = response.content.filter((item) => item.activated)
                    setServicePackage(response.content);
                }
                setLoading(false);
            }
            fetchAPI();
        }catch(e) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải package', ToastAndroid.SHORT);
        }
    }, []);

    const handleShowModal = (data) => {
        setServiceSelected(data);
        refRBSheet?.current.open();
    }

    return (  
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                </TouchableOpacity>
                <Text style={styles.title_header}>Nâng cấp SoBanHang</Text>
            </View>
            <ScrollView style={{ flex: 1, paddingHorizontal: 15, marginBottom: 15 }}>
                <Image source={require('../assets/images/pro.png')} style={styles.image_container}/>
                <View style={[styles.display, { marginBottom: 10 }]}>
                    <Text style={{ fontWeight: '600' }}>Danh sách các gói gia hạn</Text>
                </View>
                {servicePackage?.length > 0 && 
                    <View>
                        {servicePackage.map((item, index) => 
                            <TouchableOpacity style={styles.package_container} key={index} onPress={() => handleShowModal(item)}>
                                <View style={styles.display}>
                                    <View>
                                        <View style={styles.code_container}>
                                            <Text style={{ fontWeight: '500', paddingVertical: 5, fontSize: 10 }}>{`GNC${item.id}`}</Text>
                                        </View>
                                        <Text style={{ fontWeight: '600', marginVertical: 5 }}>{`GNC${item.id}`}</Text>
                                        <Text style={styles.text_light}>{`NÂNG CẤP: ${item.day} ngày`}</Text> 
                                        <Text style={{ fontWeight: '600', color: '#e19610' }}>{`${item?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫</Text>
                                    </View>
                                    <View style={{ alignSelf: 'flex-end' }}>
                                        <View style={styles.button}>
                                            <Text style={{ color: '#e19610' }}>Đăng ký</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                }
            </ScrollView>
            {((!servicePackage || servicePackage?.length == 0)) &&
                <View style={styles.content_noitem}>
                    <Image source={require('../assets/images/noresults.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Chưa có gói nâng cấp nào</Text>
                </View>
            }
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: 
                    {
                        backgroundColor: "rgba(100, 100, 100, 0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: "grey"
                    },
                    container: {
                        height: 350
                    }
                }}
            >
                <ModalServicePackage servicePackage={serviceSelected} />
            </RBSheet>
            {loading && <LoadingSpinner />}
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
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea'
    },
    title_header: {
        fontWeight: 'bold', 
        flex: 1,
        textAlign: 'center',
    },
    image_container: {
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 15
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    package_container: {
        marginBottom: 10, 
        borderRadius: 10,
        alignSelf: 'center',
        width: screenWidth - 30,
        height: 'auto',
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 0.6,
        borderColor: '#e19610',
        elevation: 1
    },
    code_container: {
        backgroundColor: '#fcd607',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 70,
        maxWidth: 110,
        borderRadius: 10
    },
    text_light: {
        fontSize: 9,
        color: '#6f6f6f',
        marginBottom: 5
    },
    button: {
        borderWidth: 1.5,
        borderColor: '#e19610',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    content_noitem: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center', 
        paddingHorizontal: 8,
    },
})

export default ServicePackage;