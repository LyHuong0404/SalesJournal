import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { format } from 'date-fns';

import Loading from "../../components/Loading";
import { filterReceipt } from "../../actions/seller/receiptActions";
import ModalCalendar from "../../components/Modal/ModalCalendar";
import OrderItem from "./OrderItem";
import { setDateFormat } from "../../utils/helper";

function Order() {
  const navigation = useNavigation();
  const refRBSheet = useRef(null);
  const [startDate, setStartDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));   
  const [endDate, setEndDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd')); 
  const [buttonTimeType, setButtonTimeType] = useState('homnay'); 
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try{
        const fetchAPI = async() => {
            setLoading(true);
            const response = await filterReceipt({ pageIndex: 0, pageSize: 1000, fromDate: startDate, toDate: endDate, paymentMethod: null});
            if (response?.code == 0) {
                setReceipts(response?.data?.content);
            } else {
                ToastAndroid.show('Lỗi khi tải hóa đơn', ToastAndroid.SHORT);
            }
            setLoading(false);
        }
        fetchAPI();
    } catch(err) {
        setLoading(false);
        ToastAndroid.show('Lỗi khi tải hóa đơn', ToastAndroid.SHORT);
    }
  }, [startDate, endDate])


  const handleChangeTime = (data) => {
    const time = setDateFormat(data.buttonType, data.startDate, data.endDate);

    setStartDate(time[0]);
    setEndDate(time[1]);
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
                <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>Quản lý hóa đơn</Text>            
            <TouchableOpacity onPress={() => refRBSheet.current?.open()}>
                <Image source={require('../../assets/images/calendar_outline.png')} style={{ width: 25, height: 20, objectFit: 'contain', tintColor: '#000000' }}/>
            </TouchableOpacity>
        </View>
        {receipts?.length > 0 && 
            <ScrollView style={styles.content}>
                {receipts?.map((receipt, index) => <OrderItem key={index} receipt={receipt}/>)}
            </ScrollView>
        }

        {receipts?.length == 0 && <View style={styles.content_noitem}>
            <Image source={require('../../assets/images/checklist.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
            <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Chưa có hóa đơn nào, hãy bán hàng để tạo hóa đơn mới nhé</Text>
            {/* <Button mode="contained" onPress={() => navigation.navigate('Sell')} buttonColor="#15803D" style={{ borderRadius: 7, paddingHorizontal: 20 }}>
                Tạo đơn hàng
            </Button> */}
        </View>}
        {loading && <Loading />}

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
                valueTimeFrom={startDate} 
                valueTimeTo={endDate}
                buttonTimeType={buttonTimeType}
                onSelected={handleChangeTime}
                handleSettingAgain={handleSettingAgain} />
        </RBSheet>
    </View> 
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fbfffc',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export default Order;