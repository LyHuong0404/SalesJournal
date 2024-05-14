import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView } from "react-native";
import { format } from "date-fns";
import { Dropdown } from 'react-native-element-dropdown';
import { Searchbar, DataTable } from "react-native-paper";
import * as Animatable from 'react-native-animatable';
import RBSheet from "react-native-raw-bottom-sheet";



import { convertTimeStamp, setDateFormat } from "../../utils/helper";
import ModalCalendar from "../../components/Modal/ModalCalendar";
import LoadingSpinner from "../../components/LoadingSpinner";
import { filterOrderHistory } from "../../actions/user/otherActions";

const statusOptions = [
    { label: 'Tất cả', value: 1 },
    { label: 'Khuyến mãi', value: 2 },
];

function OrderHistory() {
    const navigation = useNavigation();
    const refRBSheet = useRef();
    const [loading, setLoading] = useState(false);
    const [typeTransaction, setTypeTransaction] = useState(1);
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const [buttonTimeType, setButtonTimeType] = useState('homnay'); 
    const [fromDate, setFromDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        try{
            const fetchAPI = async()=> {
                setLoading(true);
                const response = await filterOrderHistory({ pageIndex: 0, pageSize: 1000, fromDate, toDate });
                if (response) {
                    if (typeTransaction == 1){
                        response.content = response.content.filter((item) => item.totalDiscount != 0);
                    }
                    setOrders(response.content);
                } else {
                    ToastAndroid.show('Lỗi tải danh sách hóa đơn không thành công', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();       
        } catch(e){
            setLoading(false);
            ToastAndroid.show('Lỗi tải danh sách hóa đơn không thành công', ToastAndroid.SHORT);
        }
    }, [fromDate, toDate, typeTransaction])    

    const handleChangeTime = (data) => {
        const time = setDateFormat(data.buttonType, data.startDate, data.endDate); 
        setFromDate(time[0]);
        setToDate(time[1]);
        setButtonTimeType(data.buttonType);
        refRBSheet.current?.close();
    };

    const handleSettingAgain = () => {
        setButtonTimeType('homnay');
        setStartDate(format(new Date(Date.now()), 'yyyy-MM-dd'));
        setEndDate(format(new Date(Date.now()), 'yyyy-MM-dd'));
        refRBSheet.current?.close();    
    }

    const labelOfTime = () => {
        switch(buttonTimeType) {
            case 'homnay':
                return 'Hôm nay';
            case 'homqua':
                return 'Hôm qua';
            case 'tuannay':
                return 'Tuần này';
            case 'tuantruoc':
                return 'Tuần trước';
            case 'thangnay':
                return 'Tháng này';
            case 'thangtruoc':
                return 'Tháng trước';
            case 'none':
                return 'Tùy chỉnh: ' + format(fromDate, 'dd-MM-yyyy') + ' đến ' + format(toDate, 'dd-MM-yyyy');
            default:
                break;
        }
    }


    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Lịch sử mua hàng</Text>
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
                            placeholder="Tìm kiếm"
                            iconColor="#8e8e93"
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
                <View style={{ marginBottom: 15, display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => refRBSheet.current?.open()}>
                        <Image source={require('../../assets/images/calendar.png')} style={styles.icon_calender}/>
                    </TouchableOpacity>
                    <View style={styles.button_action_container}>   
                        <Text style={styles.text_action}>
                            {labelOfTime()}
                        </Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: '600', marginVertical: 10, marginRight: 10, color: '#6a6a6a', fontSize: 13 }}>Trạng thái</Text>
                    <Dropdown
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={{ fontSize: 12 }}
                        iconColor='#2083c5'
                        data={statusOptions}
                        labelField="label"
                        valueField="value"
                        value={typeTransaction}
                        onChange={(item) => setTypeTransaction(item.value)}
                    />
                </View>
                <View style={[styles.display, { marginTop: 10 }]}>
                    <View style={styles.horizontalLine} />
                    <View style={styles.horizontalLine} />  
                </View>
                <View style={[styles.display, { marginVertical: 10 }]}>
                    <Text style={{ fontWeight: '600' }}>Danh sách đơn hàng</Text>
                    <Text style={{ fontWeight: 'bold' }}>Tổng: <Text style={{ fontWeight: '500', color: 'red'}}>{orders.length}</Text></Text>
                </View>
            </View>
            {orders?.length > 0 ?
                (<ScrollView style={{ flex: 1, marginHorizontal: 15, marginBottom: 15 }}>     
                    <View style={{ backgroundColor: 'white' }}>
                        <DataTable.Header>
                            <DataTable.Title>Mã đơn</DataTable.Title>
                            <DataTable.Title>Thời gian</DataTable.Title>
                            <DataTable.Title>Tổng đơn</DataTable.Title>
                            <DataTable.Title>Khuyến mãi</DataTable.Title>
                        </DataTable.Header>
                        {orders.map((item, index) => 
                            <DataTable.Row key={index}>
                                <DataTable.Cell><Text style={styles.cell_text_number}>{`#HD${item.id}`}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={styles.cell_text_number}>{convertTimeStamp(item.createdAtDate, 'dd/MM/yyyy')} {item.createdAtTime}</Text></DataTable.Cell>
                                <DataTable.Cell style={{ marginLeft: 10, marginVertical: 10 }}><Text style={styles.cell_text_number}>{item.finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text></DataTable.Cell>
                                <DataTable.Cell style={{ alignItems: 'center', justifyContent: 'center'}}>
                                    {item.totalDiscount ? 
                                        <Image source={require('../../assets/images/check_mark.png')}  style={{ width: 17, height: 17, objectFit: 'contain' }} />
                                        : <Image source={require('../../assets/images/wrong.png')}  style={{ width: 17, height: 17, objectFit: 'contain' }} />
                                    }
                                </DataTable.Cell>
                            </DataTable.Row>
                        )}
                    </View>
            </ScrollView>) : 
                <View style={styles.content_noitem}>
                    <Image source={require('../../assets/images/notes.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Bạn chưa có lịch sử hóa đơn nào. </Text>
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
                        height: 540
                    }
                }}
            >
                <ModalCalendar 
                    valueTimeFrom={fromDate} 
                    valueTimeTo={toDate}
                    buttonTimeType={buttonTimeType}
                    onSelected={handleChangeTime}
                    handleSettingAgain={handleSettingAgain} />
            </RBSheet>
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
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    dropdown: {
        width: '37%',
        height: 35,
        borderColor: '#2083c5',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        backgroundColor: "#ffffff",
        marginLeft: 10,
    },
    selectedTextStyle: {
        fontSize: 13,
        color: "#2083c5"
    }, 
    cell_text_number: {
        color: '#3a3a3a',
        fontSize: 11
    },
    icon_calender: {
        width: 28,
        height: 28,
        objectFit: 'contain',
        tintColor: '#3a3a3a',
        marginRight: 10,
        alignSelf: 'center',
    },
    button_action_container: {
        backgroundColor: '#e2e5ea',
        borderRadius: 7,
        // width: '75%',
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        padding: 3,
        justifyContent: 'space-around',
    },
    text_action: {
        fontSize: 10,
        backgroundColor: 'red',
        textAlign: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 7,
        color: '#15803D',
        backgroundColor: 'white'
    },
    horizontalLine: { 
        height: 0.8, 
        backgroundColor: '#e2e5ea' ,
        width: '49%'
    },
})

export default OrderHistory;