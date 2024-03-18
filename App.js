// Trong App.js (dự án Expo)
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { Provider as StoreProvider } from 'react-redux';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import store from './src/store';
import Home from './src/page/Home';
import Order from './src/page/Order';
import Paybook from './src/page/Paybook';
import Warehouse from './src/page/Warehouse';
import Sell from './src/page/Sell';
import Register from './src/page/Register';
import Login from './src/page/Login';
import UsernameInput from './src/page/UsernameInput';
import Profile from './src/page/Profile';
import OTP from './src/page/OTP';
import ChangePassword from './src/page/ChangePassword';
import SettingProfile from './src/page/SettingProfile';
import RecoveryPassword from './src/page/RecoveryPassword';
import CreateProduct from './src/page/CreateProduct';
import Search from './src/page/Search';
import OrderConfirmation from './src/page/OrderConfirmation';
import ProductManagement from './src/page/ProductManagement';
import ProductInCategory from './src/page/ProductInCategory';
import Customers from './src/page/Customers';
import SettingStore from './src/page/SettingStore';
import PaymentDetail from './src/page/PaymentDetail';
import Payment from './src/page/Payment';
import OrderDetail from './src/page/OrderDetail';
import QRScanner from './src/page/QRScanner';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomTabIcon = ({ route, focused }) => {
  let iconSource;
  if (route && route.name) { 
    switch (route.name) {
      case 'Quản lý':
        iconSource = focused
        ? require('./src/assets/images/bottom1_active.png')
        : require('./src/assets/images/bottom1.png');
        break;
      case 'Đơn hàng':
        iconSource = focused
          ? require('./src/assets/images/bottom2_active.png')
          : require('./src/assets/images/bottom2.png');
        break;
      case 'Sổ nợ':
        iconSource = focused
          ? require('./src/assets/images/bottom3_active.png')
          : require('./src/assets/images/bottom3.png');
        break;
      case 'Kho hàng':
        iconSource = focused
          ? require('./src/assets/images/bottom4_active.png')
          : require('./src/assets/images/bottom4.png');
        break;
      default:
        break;
    }
  }

  return (
    <Image
      source={iconSource}
      style={{ width: 25, height: 25, objectFit: 'contain' }}
    />
  );
};

const BottomNavigator = () => (
  <Tab.Navigator 
    screenOptions={{
      tabBarActiveTintColor: '#15803D',
      tabBarInactiveTintColor: '#6B7280',
      tabBarStyle: { height: 55, paddingBottom: 2 },
    }}
  >
    <Tab.Screen
      name="Quản lý"
      component={Home}
      options={({ route }) => ({
        tabBarLabel: 'Quản lý',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon route={route} focused={focused} />
        ),
      })}
    />
    <Tab.Screen
      name="Đơn hàng"
      component={Order}
      options={({ route }) => ({
        tabBarLabel: 'Đơn hàng',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon route={route} focused={focused} />
        ),
      })}
    />
    <Tab.Screen
      name="Sổ nợ"
      component={Paybook}
      options={({ route }) => ({
        tabBarLabel: 'Sổ nợ',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon route={route} focused={focused} />
        ),
      })}
    />
    <Tab.Screen
      name="Kho hàng"
      component={Warehouse}
      options={({ route }) => ({
        tabBarLabel: 'Kho hàng',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon route={route} focused={focused} />
        ),
      })}
    />
  </Tab.Navigator>
);

const HomeStack = () => (
  // <Stack.Navigator initialRouteName="BottomNavigator" screenOptions={{ headerShown: false }}>
  <Stack.Navigator initialRouteName="Order" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    <Stack.Screen name="SettingStore" component={SettingStore} options={{ headerShown: false }}/>
    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    <Stack.Screen name="Sell" component={Sell} options={{ headerShown: false }}/>
    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
    <Stack.Screen name="UsernameInput" component={UsernameInput} options={{ headerShown: false }}/>
    <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }}/>
    <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} options={{ headerShown: false }}/>
    <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }}/>
    <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
    <Stack.Screen name="CreateProduct" component={CreateProduct} options={{ headerShown: false }}/>
    <Stack.Screen name="ProductManagement" component={ProductManagement} options={{ headerShown: false }}/>
    <Stack.Screen name="ProductInCategory" component={ProductInCategory} options={{ headerShown: false }}/>
    <Stack.Screen name="Order" component={Order} options={{ headerShown: false }}/>
    <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} options={{ headerShown: false }}/>
    <Stack.Screen name="SettingProfile" component={SettingProfile} options={{ headerShown: false }}/>
    <Stack.Screen name="Customers" component={Customers} options={{ headerShown: false }}/>
    <Stack.Screen name="PaymentDetail" component={PaymentDetail} options={{ headerShown: false }}/>
    <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
    <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }}/>
    <Stack.Screen name="QRScanner" component={QRScanner} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const ProfileDrawer = () => (
  <Stack.Navigator initialRouteName="SettingProfile" >
      <Stack.Screen name="SettingProfile" component={SettingProfile} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const StoreDrawer = () => (
  <Stack.Navigator initialRouteName="SettingProfile" >
      <Stack.Screen name="SettingStore" component={SettingStore} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const CustomDrawerContent = ({ navigation }) => (
  <DrawerContentScrollView>
    {/* Custom Header */}
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <Image source={require('./src/assets/images/store.jpg')} style={{ width: 60, height: 60, borderRadius: 100, objectFit: 'cover', marginRight: 10, marginBottom: 10 }} />
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Cửa Hàng Tạp Hóa</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>Lý Hương</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Image source={require('./src/assets/images/improve_pro.jpg')} style={{ width: '100%', height: 90, objectFit: 'cover', marginVertical: 10 }} />
      </TouchableOpacity>
    </View>
    {/* Drawer Items */}
      <DrawerItem
        label="Trang chủ"
        icon={() => <FontAwesome5 name="home"  size={20} color='#15803D' />}
        onPress={() => navigation.navigate('Home')}
        labelStyle={{ color: '#474646'}}
      />
      <DrawerItem
        label="Cài đặt cửa hàng"
        labelStyle={{ color: '#474646'}}
        icon={() => <FontAwesome5 name="cogs" size={20} color='#15803D' />}
        onPress={() => navigation.navigate('SettingStore')}
      />
      <DrawerItem
        label="Cài đặt cá nhân"
        labelStyle={{ color: '#474646'}}
        icon={() => <FontAwesome5 name="user" size={20} color='#15803D' />}
        onPress={() => navigation.navigate('SettingProfile')}
      />
      {/* <DrawerItem
        label="Đăng xuất"
        icon={() => <FontAwesome5 name="user" size={20} color='#15803D' />}
      /> */}
    {/* Add other Drawer items as needed */}
  </DrawerContentScrollView>
);

function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <NavigationContainer>
          <Drawer.Navigator
              screenOptions={{
                drawerStyle: {
                  marginTop: 20,
                },
              }}
              drawerContent={(props) => <CustomDrawerContent {...props} />}
              
            >
              <Drawer.Screen name="Trang chủ" component={HomeStack} options={{ headerShown: false }}/>
              <Drawer.Screen name="Cài đặt cửa hàng" component={StoreDrawer} options={{ headerShown: false  }} />
              <Drawer.Screen name="Cài đặt cá nhân" component={ProfileDrawer} options={{ headerShown: false  }} />
              {/* <Drawer.Screen name="Đăng xuất" options={{ headerShown: false  }} /> */}
              {/* Add other Drawer screens as needed */}
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;

