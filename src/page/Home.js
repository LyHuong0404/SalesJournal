import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Badge, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useState, useEffect, useRef, useCallback } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";

import { filterReport } from '../actions/seller/receiptActions';
import { convertTimeStamp } from '../utils/helper';
import ModalSell from '../components/Modal/ModalSell';
import ModalExpire from '../components/Modal/ModalExpire';

const windowWidth = Dimensions.get('window').width;

function Home() {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [date, setDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));
  const [revenue, setRevenue] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchAPI = async()=> {
    const response = await filterReport({ fromDate: date, toDate: date});
    if (response) {
        setRevenue(response);
    } else {
        ToastAndroid.show('Lỗi tải không thành công rồi', ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    try{   
        if((new Date(user?.profile?.expireAt) < new Date())) {
          setShowModal(true);
        }
        else {
          fetchAPI();
          setShowModal(false);
        };
    } catch(e){
        ToastAndroid.show('Lỗi tải không thành công rồi', ToastAndroid.SHORT);
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
        fetchAPI();
    }, [])
);

  return (
    <View style={styles.container}>   
      <View style={[styles.header, { marginBottom: 10, paddingTop: 20 }]}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', flex: 0.7 }} onPress={() => navigation.navigate('SettingStore')}>
            <Image source={require('../assets/images/store_circle.png')} style={styles.image}/>
            <View style={{ marginLeft: 10}}>
              <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>{user?.profile?.nameStore}</Text>
              <Text style={{ color: '#ffffff', fontSize: 11 }}>Thông tin cửa hàng 
                <Image source={require('../assets/images/left_arrow.png')} style={{ width: 12, height: 12, objectFit: 'contain' }}/>
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}> 
              <Image source={require('../assets/images/search.png')} style={{ width: 22, height: 22, objectFit: 'contain', marginLeft: 15 }}/>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Image source={require('../assets/images/chatting.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginLeft: 15 }} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <Image source={require('../assets/images/setting.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginLeft: 15, tintColor: 'white' }} />
            </TouchableOpacity>
          </View>
        </View>   
      </View> 
      <ScrollView> 
        <View style={[styles.boxes, { padding: 15, borderWidth: 1, borderColor: '#e2e5ea' }]}>         
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11 }}>Hôm nay</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/increasing_outline.png')} style={{ width: 16, height: 16, objectFit: 'contain', marginRight: 5, marginTop: -5 }}/>
              <Text style={{ color: '#2083c5', fontSize: 11 }} onPress={() => navigation.navigate('Report')}>Xem lãi lỗ</Text>
              <Image source={require('../assets/images/left_arrow.png')} style={{ width: 14, height: 14, objectFit: 'contain', tintColor: '#2083c5' }}/>
            </View>
          </View>
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >          
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Image source={require('../assets/images/economy.png')} style={{ width: 20, height: 20, objectFit: 'contain' }}/>
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5, marginRight: 50}}>
                  <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Doanh thu</Text>
                  <Text style={{ color: '#000000', fontWeight: 'bold' }}>{revenue?.length > 0 ? `${revenue[0]?.totalSaleMoney}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0}</Text>
                </View> 
                <View style={styles.verticalLine} />
              </View>

              <View style={{ display: 'flex', flexDirection: 'row'}}>
                <Image source={require('../assets/images/order_fill.png')} style={{ width: 20, height: 20, objectFit: 'contain', tintColor: '#2083c5' }}/>
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5, marginRight: 50}}>
                  <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Hóa đơn</Text>
                  <Text style={{ color: '#000000', fontWeight: 'bold' }}>{revenue?.length > 0 ? `${revenue[0]?.totalReceipt}` : 0}</Text>
                </View> 
                <View style={styles.verticalLine} />
              </View>

              <View style={{ display: 'flex', flexDirection: 'row'}}>
                <Image source={require('../assets/images/money-bag.png')} style={{ width: 20, height: 20, objectFit: 'contain' }}/>
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5}}>
                  <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Lợi nhuận</Text>
                  <Text style={{ color: '#000000', fontWeight: 'bold' }}>{revenue?.length > 0 ? `${revenue[0]?.totalRevenue}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0}</Text>
                </View> 
              </View>       
            </View>
          </ScrollView>
        </View>
        <View style={[styles.boxes, { backgroundColor: '#faeed6', padding: 15, borderWidth: 1, borderColor: '#da9413', width: windowWidth - 60, marginTop: 10 }]}>         
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../assets/images/crown.png')} style={{ width: 35, height: 35, objectFit: 'contain', marginRight: 10 }}/>
            <Text style={{ fontWeight: '500', color: '#cb870b'}}>Gói gia hạn <Text style={{ fontWeight: '400' }}>của bạn sẽ hết hạn {'\n'} vào ngày {`${convertTimeStamp(user?.profile?.expireAt, 'dd/MM/yyyy')}`}</Text></Text>
          </View>
          <Button  
              mode="contained" 
              buttonColor='#c5830c' 
              style={{ borderRadius: 10, marginTop: 10 }}
              onPress={() => navigation.navigate('ServicePackage')}
          >Gia hạn</Button>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ margin: 20, marginBottom: 0, color: '#000000', fontWeight: 'bold'}}>Quản lý thông minh cùng Sổ</Text>
          {/* <View style={styles.centeredBox}>
            <View style={[styles.box, { backgroundColor: '#107f10',  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', height: 150 }]}>              
              <View style={{width: '90%', height: 30, backgroundColor: '#ffffff', margin: 10, borderRadius: 5}}>
                <Text style={{marginLeft: 10}}>Tạo đơn hàng đầu tiên</Text>
              </View>
              <View style={{width: '90%', height: 30, backgroundColor: '#ffffff', margin: 10, borderRadius: 5}}>
                <Text style={{marginLeft: 10}}>Tạo sản phẩm đầu tiên</Text>
              </View>
              <View style={{width: '90%', height: 30, backgroundColor: '#ffffff', margin: 10, borderRadius: 5}}>
                <Text style={{marginLeft: 10}}>Xem báo cáo lãi lỗ bán hàng</Text>
              </View>
            </View>
          </View> */}

          <View style={[styles.centeredBox, { margin: 20 }]}>  
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 90 }}>                              
              <TouchableOpacity style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}
                onPress={() => refRBSheet.current?.open()} >
                <Image source={require('../assets/images/icon-store.png')} style={{width: 30, height: 30, objectFit: 'contain' }} />
                <Text style={styles.text}>Bán hàng</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ProductManagement')} style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/package.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Sản phẩm</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Order')} style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/bill.png')} style={{width: 40, height: 30, objectFit: 'contain'}} />
                {/* <Badge style={{ position: 'absolute', top: 5, right: 25 }}>3</Badge> */}
                <Text style={styles.text}>Hóa đơn</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.centeredBox, { margin: 20, marginTop: 0 }]}>  
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 90 }}>                              
              <TouchableOpacity onPress={() => navigation.navigate('Report')} style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/increasing.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Báo cáo</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/exchange.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Thu chi</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => navigation.navigate('ImportProduct')} style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/product_in.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Nhập hàng</Text>
              </TouchableOpacity> 

              <TouchableOpacity onPress={() => navigation.navigate('Customers')} style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/customer.png')} style={{width: 30, height: 30, objectFit: 'contain', tintColor: '#491CDE'}} />
                <Text style={styles.text}>Khách hàng</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.centeredBox, { margin: 20, marginTop: 0 }]}>  
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 90 }}>                              
              <TouchableOpacity onPress={() => navigation.navigate('SaleManagement')} style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/gift.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Khuyến mãi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/plus.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Thêm tính năng</Text>
              </TouchableOpacity>
            </View>
          </View>


          {/* <View style={{ paddingHorizontal: 15 }}>
            <Text style={{ marginBottom : 10, color: '#000000', fontWeight: 'bold'}}>Việc cần làm</Text>
            <View style={styles.work_container}>
              <View style={styles.display}>
                  <Image source={require('../assets/images/processing.png')} style={{ width: 15, height: 20 }}/>
                  <Text style={{ color: '#565555', marginLeft: 10 }}>Đang xử lý</Text>
              </View>
              <View style={styles.display}>
                  <Text style={{ color: '#3a3a3a'}}>4</Text>
                  <Image source={require('../assets/images/left_arrow.png')} style={styles.icon} />
              </View>
            </View>
          </View> */}
        </View>
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
                  height: 140,
                  backgroundColor: '#3a3a3a',
              }
            }}
          >
              <ModalSell onClose={() => refRBSheet?.current.close()}/>
          </RBSheet>
      </ScrollView>
      {showModal && <ModalExpire />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F5',
    paddingTop: 10
  },
  header: {
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100, 
    objectFit: 'contain'
  },
  centeredBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  boxes: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: windowWidth - 30,
    alignSelf: 'center',
    borderRadius: 10,
  },
  verticalLine: {
    width: 1, 
    height: 30, 
    backgroundColor: '#e2e5ea', 
    alignSelf: 'center',
    marginRight: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 11,
    marginTop: 5
  },
  display: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  work_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  icon: {
    width: 25,
    height: 12,
    tintColor: '#3a3a3a'
  }
});

export default Home;