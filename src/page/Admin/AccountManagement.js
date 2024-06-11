import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { Searchbar, DataTable } from "react-native-paper";
import * as Animatable from 'react-native-animatable';
import { Switch } from 'react-native-switch'; 


import useDebounce from "../../hooks";
import { filterAccount, lockAccount, unlockAccount } from "../../actions/admin/otherActions";
import LoadingSpinner from "../../components/LoadingSpinner";
import ModalConfirmation from "../../components/Modal/ModalConfirmation";


const typeAccountOptions = [
    { label: 'Tất cả', value: '1' },
    { label: 'Người mua', value: '2' },
    { label: 'Người bán', value: '3' },
];

function AccountManagement() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const debounceValue = useDebounce(searchValue, 500); 
    const [typeAccount, setTypeAccount] = useState('1');
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const [isVendor, setIsVendor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const getListAccount = async()=> {
        setLoading(true);
        const response = await filterAccount({ pageIndex: 0, pageSize: 1000, keySearch: debounceValue, isVendor });
        if (response) {
            setAccounts(response);
        } else {
            ToastAndroid.show('Lỗi tải danh sách tài khoản không thành công', ToastAndroid.SHORT);
        }
        setLoading(false);
    }

    useEffect(() => {
        try{           
            getListAccount();
        } catch(e){
            setLoading(false);
            ToastAndroid.show('Lỗi tải danh sách tài khoản không thành công', ToastAndroid.SHORT);
        }
    }, [debounceValue, isVendor])    


    const handleChangeTypeAccount = useCallback((item) => {
        if(item.value == "2") {
            setIsVendor(false);
        } else if (item.value == "3") {
            setIsVendor(true);
        } else if (item.value == "1") {
            setIsVendor(null);
        }
        setTypeAccount(item.value);
    }, [typeAccount])

    const handleOpenModalConfirm = (item) => {
        setShowModal(true);
        setSelectedItem(item);

    }
    const handleChangeStatusAccount = () => {
        if (selectedItem.activate) {
            try {
                const fetchAPI = async() => {
                    const response = await lockAccount(selectedItem.id);
                    if (response?.code == 0) {
                        ToastAndroid.show('Lưu trạng thái thành công', ToastAndroid.SHORT);
                        getListAccount();
                    } else ToastAndroid.show('Lưu trạng thái thất bại', ToastAndroid.SHORT);
                }
                fetchAPI();
            } catch(e) {
                ToastAndroid.show('Lỗi khi thay đổi trạng thái tài khoản', ToastAndroid.SHORT);
            }
        } else {
            try {
                const fetchAPI = async() => {
                    const response = await unlockAccount(selectedItem.id);
                    if (response?.code == 0) {
                        ToastAndroid.show('Lưu trạng thái thành công', ToastAndroid.SHORT);
                        getListAccount();
                    } else ToastAndroid.show('Lưu trạng thái thất bại', ToastAndroid.SHORT);
                }
                fetchAPI();
                
            } catch(e) {
                ToastAndroid.show('Lỗi khi thay đổi trạng thái tài khoản', ToastAndroid.SHORT);
            }
        }
        setShowModal(false);
    }

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Quản lý tài khoản</Text>
                {!searchBarVisible ? 
                    (<TouchableOpacity onPress={() => setSearchBarVisible(true)}>
                        <Image source={require('../../assets/images/search.png')} style={{ width: 25, height: 20, objectFit: 'contain', tintColor: '#000000' }}/>
                    </TouchableOpacity>) : 
                    (<TouchableOpacity onPress={() => {
                            setSearchBarVisible(false);
                            setSearchValue(null);
                        }}>
                        <Image source={require('../../assets/images/close.png')} style={{ width: 25, height: 20, objectFit: 'contain', tintColor: '#000000' }}/>
                    </TouchableOpacity>
                )} 
            </View>
            {searchBarVisible &&
                (<Animatable.View animation="zoomIn" duration={50} style={{ backgroundColor: 'white', marginHorizontal: 15 }}>
                    <View style={{ borderRadius: 5, backgroundColor: 'white', borderColor: '#15803D', borderWidth: 1, height: 40, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <Searchbar
                            autoFocus
                            placeholder="Tìm kiếm theo tên"
                            iconColor='#8e8e93'
                            value={searchValue}
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent', 
                            }}
                            inputStyle={{
                                fontSize: 13, 
                            }}
                            placeholderTextColor="#8e8e93" 
                            onChangeText={(text) => setSearchValue(text)}
                            clearIcon='close-circle-outline'
                            onClearIconPress={() => setSearchValue(null)}
                        />
                    </View>
                </Animatable.View>
            )}
            <View style={{ marginHorizontal: 15 }}>
                <View style={{ alignItems: 'flex-end', marginTop: 10, marginBottom: 15 }}>
                    <Dropdown
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={{ fontSize: 12 }}
                        iconColor='#2083c5'
                        data={typeAccountOptions}
                        labelField="label"
                        valueField="value"
                        value={typeAccount}
                        onChange={handleChangeTypeAccount}
                    />
                </View> 
                <View style={[styles.display, { marginBottom: 15}]}>
                    <Text style={{ fontWeight: '600' }}>Danh sách tài khoản </Text>
                    <Text style={{ fontWeight: 'bold' }}>Tổng: <Text style={{ fontWeight: '500', color: 'red'}}>{accounts.length}</Text></Text>
                </View>
            </View>
            {accounts?.length > 0 ?
                (<ScrollView style={{ flex: 1, marginHorizontal: 15, marginBottom: 15 }}> 
                    <View style={{ backgroundColor: 'white' }}>
                    <DataTable.Header>
                        <DataTable.Title>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/images/user.png')} style={{ width: 15, height: 15, tintColor: '#929292' }}/>
                                <Text style={{ fontSize: 11, color: '#929292' }}>Tên tài khoản</Text>
                            </View>
                            
                        </DataTable.Title>
                        <DataTable.Title style={{ marginLeft: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/images/mail.png')} style={{ width: 20, height: 18, objectFit: 'contain', tintColor: '#929292', marginRight: 5 }}/>
                                <Text style={{ fontSize: 11, color: '#929292' }}>Email</Text>
                            </View>
                        </DataTable.Title>

                        <DataTable.Title style={{ marginLeft: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/images/marriage.png')} style={{ width: 20, height: 18, objectFit: 'contain', tintColor: '#929292', marginRight: 5 }}/>
                                <Text style={{ fontSize: 11, color: '#929292' }}>Trạng thái</Text>
                            </View>
                        </DataTable.Title>
                    </DataTable.Header>
                    {accounts.map((item, index) => 
                        <DataTable.Row key={index}>
                            <DataTable.Cell><Text style={styles.cell_text_number}>{item.username}</Text></DataTable.Cell>
                            <DataTable.Cell style={{ marginLeft: 10, marginVertical: 10 }}>
                                <Text style={styles.cell_text_number}>{item.email}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ marginLeft: 10, marginVertical: 10, justifyContent: 'center' }}>
                            <Switch 
                                value={item.activate} 
                                activeText={''}
                                inActiveText={''} 
                                switchLeftPx={4}  
                                circleSize={20}
                                barHeight={25} 
                                switchRightPx={4} 
                                backgroundInactive={'#e9e7e7'}
                                onValueChange={() => handleOpenModalConfirm(item)}
                            />
                            </DataTable.Cell>
                        </DataTable.Row>
                    )}
                </View> 
            </ScrollView>) : 
                <View style={styles.content_noitem}>
                    <Image source={require('../../assets/images/notes.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Hệ thống chưa có tài khoản nào. </Text>
                </View>
            }
            {showModal && 
                <ModalConfirmation 
                    title="Thông báo?" 
                    question={selectedItem.activate ? "Bạn chắc chắn muốn khóa tài khoản?" : "Bạn chắc chắn muốn mở khóa tài khoản?"}
                    textYes="Đồng ý"
                    textNo="Quay lại"
                    onPressCancel={() => setShowModal(false)}
                    onPressConfirm={handleChangeStatusAccount}
                />
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
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dropdown: {
        width: '37%',
        height: 35,
        borderColor: '#2083c5',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        backgroundColor: "#ffffff",
    },
    selectedTextStyle: {
        fontSize: 13,
        color: "#2083c5"
    }, 
    cell_text_number: {
        color: '#3a3a3a',
        fontSize: 11
    },
    header_table: {
        fontWeight: '500',
    },
})

export default AccountManagement;