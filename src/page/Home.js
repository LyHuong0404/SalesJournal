import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity  } from 'react-native';
import { useNavigation, DrawerActions  } from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>   
      <View style={[styles.header, { marginBottom: 10 }]}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity onPress={openDrawer}>
              <Image source={require('../assets/images/store.jpg')} style={styles.image}/>
            </TouchableOpacity>
            <View style={{ marginLeft: 10}}>
              <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>Cửa Hàng Tạp Hóa</Text>
              <Text style={{ color: '#ffffff', fontSize: 11 }}>Thông tin cửa hàng 
                <Image source={require('../assets/images/left_arrow.png')} style={{ width: 12, height: 12, objectFit: 'contain' }}/>
              </Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}> 
              <Image source={require('../assets/images/search.png')} style={{ width: 22, height: 22, objectFit: 'contain', marginRight: 15 }}/>
            </TouchableOpacity>
            <Image source={require('../assets/images/chatting.png')} style={{ width: 25, height: 25, objectFit: 'contain' }}/>
          </View>
        </View>   
      </View> 
      <ScrollView> 
        <View style={[styles.boxes, { padding: 15 }]}>         
          <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11 }}>Hôm nay</Text>
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >          
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
              <View style={{ display: 'flex', flexDirection: 'row'}}>
                <Image source={require('../assets/images/economy.png')} style={{ width: 20, height: 20, objectFit: 'contain' }}/>
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5, marginRight: 50}}>
                  <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Doanh thu</Text>
                  <Text style={{ color: '#000000', fontWeight: 'bold' }}>157</Text>
                </View> 
                {/* <View style={styles.verticalLine} /> */}
              </View>

              <View style={{ display: 'flex', flexDirection: 'row'}}>
                <Image source={require('../assets/images/order.png')} style={{ width: 20, height: 20, objectFit: 'contain' }}/>
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5, marginRight: 50}}>
                  <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Đơn hàng</Text>
                  <Text style={{ color: '#000000', fontWeight: 'bold' }}>150</Text>
                </View> 
                  {/* <View style={styles.verticalLine} /> */}
              </View>

              <View style={{ display: 'flex', flexDirection: 'row'}}>
                <Image source={require('../assets/images/money-bag.png')} style={{ width: 20, height: 20, objectFit: 'contain' }}/>
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5}}>
                  <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Lợi nhuận</Text>
                  <Text style={{ color: '#000000', fontWeight: 'bold' }}>145</Text>
                </View> 
                  {/* <View style={styles.verticalLine} /> */}
              </View>       
            </View>
          </ScrollView>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{margin: 20, marginBottom: 10, color: '#000000', fontWeight: 'bold'}}>Quản lý thông minh cùng Sổ</Text>
          <View style={styles.centeredBox}>
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
          </View>

          <View style={[styles.centeredBox, { margin: 20 }]}>  
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 90 }}>                              
              <TouchableOpacity style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}
                onPress={() => navigation.navigate('Sell')} >
                <Image source={require('../assets/images/store.png')} style={{width: 30, height: 30, objectFit: 'contain' }} />
                <Text style={styles.text}>Bán hàng</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ProductManagement')} style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/package.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Sản phẩm</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Order')} style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/order_fill.png')} style={{width: 40, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Đơn hàng</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.centeredBox, { margin: 20, marginTop: 0 }]}>  
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 90 }}>                              
              <TouchableOpacity style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/increasing.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Báo cáo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/exchange.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Thu chi</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1, marginHorizontal: 5, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: 7}}>
                <Image source={require('../assets/images/plus.png')} style={{width: 30, height: 30, objectFit: 'contain'}} />
                <Text style={styles.text}>Thêm tính năng</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingHorizontal: 15 }}>
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  verticalLine: {
    width: 1, 
    height: 30, 
    backgroundColor: '#898888', 
    marginVertical: 5, 
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