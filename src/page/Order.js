import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import { useState } from "react";

import AllOrderTab from "../components/AllOrderTab";
import OrderWaitingConfirm from "../components/OrderWaitingConfirm";
import ProcessingOrder from "../components/ProcessingOrder";
import DeliveredOrder from "../components/DeliveredOrder";
import ReturnsOrder from "../components/ReturnsOrder";
import OrderCancel from "../components/OrderCancel";

const renderScene = SceneMap({
  first: AllOrderTab,
  second: OrderWaitingConfirm,
  third: ProcessingOrder,
  four: DeliveredOrder,
  five: ReturnsOrder,
  six: OrderCancel
});

const CustomTabBar = (props) => {
  return (
      <TabBar
          {...props}
          style={styles.tabBar}
          scrollEnabled={true}
          indicatorStyle={styles.indicator}
          renderLabel={({ route, focused, color }) => (
          <Text style={[styles.tabText, focused ? styles.tabTextFocused : {}]}>
              {route.title}
          </Text>
          )}
      />
  );
};

function Order() {
  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
      { key: 'first', title: 'Tất cả' },
      { key: 'second', title: 'Chờ xác nhận' },
      { key: 'third', title: 'Đang xử lý' },
      { key: 'four', title: 'Đã giao' },
      { key: 'five', title: 'Trả hàng' },
      { key: 'six', title: 'Hủy' },
  ]);

  return ( 
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
          </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Đơn hàng</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => <CustomTabBar {...props} />}
      />
      {/* Don't have order */}
      {/* <View style={styles.content}>
        <Image source={require('../assets/images/checklist.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
        <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Để có doanh thu cho cửa hàng, bạn hãy tạo ngay đơn hàng đầu tiên nhé</Text>
        <Button mode="contained" onPress={() => navigation.navigate('Sell')} buttonColor="#15803D" style={{ borderRadius: 7, paddingHorizontal: 20 }}>
          Tạo đơn hàng
        </Button>
      </View> */}

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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,  
    borderBottomColor: '#e5e5ea',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
    paddingHorizontal: 15,
  },
  content: {
    flex: 0.9,
    justifyContent: 'center',  
    alignItems: 'center', 
    paddingHorizontal: 8,
  },
  tabBar: {
    backgroundColor: '#fff', 
  },
  indicator: {
    backgroundColor: '#15803D', 
  },
  tabText: {
    color: '#a3a3a3',
    fontWeight: 'bold' 
  },
  tabTextFocused: {
    color: '#15803D', 
    fontWeight: 'bold' 
  },
});

export default Order;