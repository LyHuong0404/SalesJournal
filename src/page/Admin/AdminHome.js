import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FAB, Tooltip } from 'react-native-paper';
import { Switch } from 'react-native-switch'; 


import { logout } from '../../actions/authActions';
import { getNewInfoToday, handleMaintenence, sendNotificationProductExpire, sendNotificationVendorExpire } from '../../actions/admin/otherActions';
import LoadingSpinner from '../../components/LoadingSpinner';
import ModalConfirmation from '../../components/Modal/ModalConfirmation';

const windowWidth = Dimensions.get('window').width;

function AdminHome() {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusSystem, setStatusSystem] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    try{
        const fetchAPI = async()=> {
          setLoading(true);
            const response = await getNewInfoToday();
            if (response) {
                setData(response);
            } else {
                ToastAndroid.show('Lỗi tải thông tin mới không thành công', ToastAndroid.SHORT);
            }
            handleUpdateMaintenence(false);
            setLoading(false);
        }
        fetchAPI();

    } catch(e){
      setLoading(false);
      handleUpdateMaintenence();
      ToastAndroid.show('Lỗi tải thông tin mới không thành công', ToastAndroid.SHORT);
    }
  }, [])

  const handleLogout = async() => {
    setLoading(true);
    await dispatch(logout());
    setLoading(false);
    navigation.navigate('LoginNav');
  }

  const handleSendNotification = () => {
    try{
      const fetchAPI = async() => {
        setLoading(true);
        const rs = await sendNotificationVendorExpire();
        if (rs?.code == 0) {
          ToastAndroid.show('Gửi thông báo thành công', ToastAndroid.SHORT);
        } else ToastAndroid.show('Gửi thông báo thất bại', ToastAndroid.SHORT);
        setLoading(false);
      }
      fetchAPI();
    } catch(e) {
      setLoading(false);
      ToastAndroid.show('Gửi thông báo thất bại', ToastAndroid.SHORT);
    }
  }

  const handleSendNotificationProductExpire = () => {
    try{
      const fetchAPI = async() => {
        setLoading(true);
        const rs = await sendNotificationProductExpire();
        if (rs?.code == 0) {
          ToastAndroid.show('Gửi thông báo thành công', ToastAndroid.SHORT);
        } else ToastAndroid.show('Gửi thông báo thất bại', ToastAndroid.SHORT);
        setLoading(false);
      }
      fetchAPI();
    } catch(e) {
      setLoading(false);
      ToastAndroid.show('Gửi thông báo thất bại', ToastAndroid.SHORT);
    }
  }


  const handleUpdateMaintenence = async(status) => {
    try {
        const response = await handleMaintenence({ update: status });
        if (response?.code == 0) {      
          setStatusSystem(response.data.maintenance);
          setShowModal(false);
        } else {
          ToastAndroid.show('Cập nhật trạng thái hệ thống không thành công!', ToastAndroid.SHORT);
        }
    } catch(err) {
        ToastAndroid.show('Cập nhật trạng thái hệ thống không thành công!', ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>   
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", backgroundColor: '#bf1d1d', height: 'auto', paddingVertical: 12, marginHorizontal: 15 }}>
          <Text style={{ flex: 1, color: '#ffffff', textAlign: 'center', fontWeight: 'bold', marginLeft: 10 }}>Tài khoản quản lý</Text>
          <TouchableOpacity onPress={handleLogout}>
              <Image source={require('../../assets/images/logout.png')} style={{ width: 20, height: 20, marginRight: 10, tintColor: 'white' }}/>
          </TouchableOpacity>
        </View>
      <TouchableOpacity onPress={() => navigation.navigate('SettingProfile')}>
          <Image source={user?.avatar ? { uri: user?.avatar } : require('../../assets/images/no_image.jpg')} style={styles.avatar}/>
      </TouchableOpacity>
      <ScrollView> 
        <View style={[styles.boxes, { padding: 15, borderWidth: 1, borderColor: '#e2e5ea' }]}>         
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11 }}>Hôm nay</Text>
            <Image source={require('../../assets/images/new.png')} style={{ width: 30, height: 30, objectFit: 'contain', marginRight: 5}}/>
          </View>
          <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >          
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Image source={require('../../assets/images/plus_user.png')} style={{ width: 20, height: 20, objectFit: 'contain' }}/>
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5, marginRight: 50}}>
                  <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Tài khoản</Text>
                  <Text style={{ color: '#000000', fontWeight: 'bold' }}>{data?.newUserToday > 0 ? data?.newUserToday : 0}</Text>
                </View> 
                <View style={styles.verticalLine} />
              </View>

              <View style={{ display: 'flex', flexDirection: 'row'}}>
                <Image source={require('../../assets/images/plus_store.png')} style={{ width: 20, height: 20, objectFit: 'contain', tintColor: '#2083c5' }}/>
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5, marginRight: 50}}>
                  <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Cửa hàng</Text>
                  <Text style={{ color: '#000000', fontWeight: 'bold' }}>{data?.newVendorToday > 0 ? data?.newVendorToday : 0}</Text>
                </View> 
                <View style={styles.verticalLine} />
              </View>

              <View style={{ display: 'flex', flexDirection: 'row'}}>
                <Image source={require('../../assets/images/transaction_now.png')} style={{ width: 20, height: 20, objectFit: 'contain' }}/>
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5}}>
                  <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Giao dịch</Text>
                  <Text style={{ color: '#000000', fontWeight: 'bold' }}>{data?.totalTransactionToday > 0 ? data?.totalTransactionToday.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0}</Text>
                </View> 
              </View>       
            </View>
          </ScrollView>
        </View>
        <View style={{ margin: 20, marginBottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tooltip title='Dừng hoạt động của người dùng trong khi đang bảo trì'><Text style={{ color: '#000000', fontWeight: 'bold'}}>Hệ thống đang bảo trì</Text></Tooltip>
          <Switch 
              value={statusSystem} 
              activeText={''}
              inActiveText={''} 
              switchLeftPx={4}  
              circleSize={25}
              barHeight={25} 
              switchRightPx={4} 
              backgroundInactive={'#e9e7e7'}
              onValueChange={() => setShowModal(true)}
          />
        </View>
        <View>
          <Text style={{ margin: 20, marginBottom: 0, color: '#000000', fontWeight: 'bold'}}>Quản lý</Text>
          <View style={[styles.centeredBox, { margin: 20 }]}>  
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 90 }}>                              
              <TouchableOpacity style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}
                onPress={() => navigation.navigate('AccountManagement')} >
                <Image source={require('../../assets/images/team_user.png')} style={{width: 30, height: 30, objectFit: 'contain' }} />
                <Text style={styles.text}>Tài khoản</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('TransactionManagement')} style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../../assets/images/transaction.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Giao dịch</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ServicePackageManagement')} style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../../assets/images/service.png')} style={{width: 40, height: 30, objectFit: 'contain'}} />
                {/* <Badge style={{ position: 'absolute', top: 5, right: 25 }}>3</Badge> */}
                <Text style={styles.text}>Gói gia hạn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <View style={{ marginLeft: 20, flex: 0.7 }}>
                  <Text style={{ marginBottom: 0, color: '#000000', fontWeight: 'bold'}}>Thông báo</Text>
                  <Text style={styles.text_light}>Bấm Gửi để gửi thông báo đến những tài khoản người dùng sắp hết hạn</Text> 
              </View>
              <FAB
                icon="send"
                style={styles.fab}
                onPress={handleSendNotification}
                variant='surface'
              />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 25 }}>
              <View style={{ marginLeft: 20, flex: 0.7 }}>
                  <Text style={styles.text_light}>Bấm Gửi để gửi thông báo những sản phẩm sắp hết hạn cho người bán</Text> 
              </View>
              <FAB
                icon="send"
                style={styles.fab}
                onPress={handleSendNotificationProductExpire}
                variant='primary'
              />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 25 }}>
              <View style={{ marginLeft: 20, flex: 0.7 }}>
                  <Text style={styles.text_light}>Bấm Gửi để gửi thông báo đến những người mua hàng</Text> 
              </View>
              <FAB
                icon="send"
                style={styles.fab}
                onPress={handleSendNotificationProductExpire}
                variant='tertiary'
              />
          </View>
        </View>
      </ScrollView>
      {showModal && 
        <ModalConfirmation 
            title="Thông báo?" 
            question={statusSystem ? "Bạn có chắc rằng muốn dừng bảo trì hệ thống?" : "Bạn có chắc rằng muốn bảo trì hệ thống?"}
            textYes="Đồng ý"
            textNo="Hủy"
            onPressCancel={() => setShowModal(false)}
            onPressConfirm={() => handleUpdateMaintenence(true)}
        />
      }
      {loading && <LoadingSpinner />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F5',
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
  },
  avatar: {
    alignSelf: 'center',
    width: '33%',
    height: 130,
    borderRadius: 100,
    marginVertical: 20,
    objectFit: 'contain',
    backgroundColor: '#dad6d6'
  },
  text_light: {
    fontSize: 10,
    color: '#6f6f6f',
    marginTop: 10
  },
  fab: {
    position: 'absolute',
    marginRight: 28,
    right: 0,
    bottom: 0,
  },
});

export default AdminHome;