import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView, Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { format } from "date-fns";

import ModalCalendar from "../../components/Modal/ModalCalendar";
import { setDateFormat } from "../../utils/helper";
import LoadingSpinner from "../../components/LoadingSpinner";
import { revenueOfProduct } from "../../actions/seller/receiptActions";

const screenWidth = Dimensions.get('window').width;

function ExportBook() {
    const refRBSheet = useRef();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));
    const [buttonTimeType, setButtonTimeType] = useState('homnay'); 
    const [totalExport, setTotalExport] = useState(''); 
    const [products, setProducts] = useState([]); 


    useEffect(() => {
        try{
            const getTotalImport = async()=> {
                setLoading(true);
                const response = await revenueOfProduct({ pageIndex: 0, pageSize: 1000, fromDate, toDate});
                if (response) {
                    const totalExportProductMoney = response.reduce((total, item) => {
                        return total + (item.totalSaleMoney);
                    }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
                    const totalExportAmount = response.reduce((total, item) => {
                        return total + (item.totalSaleAmount);
                    }, 0);
                    if (totalExportProductMoney > 0 || totalExportAmount > 0){
                        setTotalExport({ totalExportProductMoney, totalExportAmount });
                        response.content = response.filter((item) => item.totalSaleAmount > 0);
                        setProducts(response);
                    } else {
                        setTotalExport('');
                    }
                } else {
                    ToastAndroid.show('Lỗi tải không thành công sổ xuất hàng', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            getTotalImport();

        } catch(e){
            setLoading(false);
            ToastAndroid.show('Lỗi tải không thành công sổ xuất hàng', ToastAndroid.SHORT);
        }
      }, [fromDate, toDate])    

    const labelOfTime = useCallback(() => {
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
    }, [buttonTimeType])

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

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
                    </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Sổ xuất hàng</Text>
            </View>
            <View style={[styles.display_center, { margin: 15 }]}>
                <TouchableOpacity onPress={() => refRBSheet.current?.open()}>
                    <Image source={require('../../assets/images/calendar.png')} style={styles.icon_calender}/>
                </TouchableOpacity>
                <View style={styles.button_action_container}>   
                    <Text style={styles.text_action}>
                        {labelOfTime()}
                    </Text>
                </View>
            </View>
            {totalExport && 
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.box_container}>
                        <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e2e5ea' }}>
                            <View style={[styles.display, { marginVertical: 10 }]}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Image source={require('../../assets/images/distribution.png')} style={{ width: 28, height: 28, marginRight: 10 }}/>
                                    <Text style={{ color: '#969696', fontSize: 13 }}>Tổng số lượng xuất</Text>                
                                </View>
                                <Text style={{ color: '#3a3a3a', fontSize: 13, fontWeight: '500' }}>{totalExport.totalExportAmount}</Text>                
                            </View> 
                            <View style={[styles.display, { marginVertical: 10 }]}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Image source={require('../../assets/images/dollar.png')} style={{ width: 28, height: 28, marginRight: 10 }}/>
                                    <Text style={{ color: '#969696', fontSize: 13 }}>Tổng số tiền xuất</Text>                
                                </View>
                                <Text style={{ color: '#3a3a3a', fontSize: 13, fontWeight: '500' }}>{totalExport.totalExportProductMoney}</Text>                
                            </View>                                     
                        </View>  
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 20, marginHorizontal: 15, justifyContent: 'space-between' }}>
                        <View style={styles.horizontalLine} />
                        <View style={styles.horizontalLine} />  
                    </View>

                    {products.map((item, index) => 
                        <View style={styles.item_container} key={index}>
                            <Text>{item.product.name}</Text>
                            <View style={[styles.display, { marginVertical: 6 }]}>
                                <Text style={{ color: '#969696', fontSize: 12 }}>{`#SP00${item.product.id}`}</Text>                
                                <Text style={{ color: '#3a3a3a', fontSize: 12, fontWeight: '500' }}>SL: - {item.totalSaleAmount}</Text>                
                            </View>              
                        </View>
                    )}
                </ScrollView>
            }

            {!totalExport &&
                <View style={styles.no_content}>
                    <Image source={require('../../assets/images/notes.png')} style={{ width: 80, height: 80, objectFit: 'contain', marginVertical: 10 }}/>
                    <Text style={{ color: '#767676' }}>Bạn chưa có báo cáo nào được ghi lại.</Text>
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
        alignItems: 'center'
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    display_center: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    box_container: {
        paddingHorizontal: 20,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 7,
        width: screenWidth - 30,
        height: 'auto',
        elevation: 2,
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
        height: 1, 
        backgroundColor: '#c5c5c5' ,
        width: '49%'
    },
    item_container: {
        backgroundColor: 'white',
        padding: 15,
        paddingVertical: 5,
        borderBottomColor: '#e2e5ea',
        borderBottomWidth: 1
    },
    no_content: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    }
})

export default ExportBook;