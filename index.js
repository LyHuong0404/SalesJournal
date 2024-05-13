// Trong App.js (dự án Expo)
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import RegisterStore from './src/page/Auth/RegisterStore';
import Home from './src/page/Home';
import Order from './src/page/Order/Order';
import Warehouse from './src/page/Warehouse';
import Sell from './src/page/Sell';
import Register from './src/page/Auth/Register';
import Login from './src/page/Auth/Login';
import UsernameInput from './src/page/Auth/UsernameInput';
import Profile from './src/page/Auth/Profile';
import OTP from './src/page/Auth/OTP';
import ChangePassword from './src/page/Auth/ChangePassword';
import SettingProfile from './src/page/Auth/SettingProfile';
import RecoveryPassword from './src/page/Auth/RecoveryPassword';
import CreateProduct from './src/page/Product/CreateProduct';
import Search from './src/page/Search';
import OrderConfirmation from './src/page/Order/OrderConfirmation';
import ProductManagement from './src/page/Product/ProductManagement';
import ProductInCategory from './src/page/Product/ProductInCategory';
import Customers from './src/page/Customers/Customers';
import SettingStore from './src/page/Auth/SettingStore';
import PaymentDetail from './src/page/PaymentDetail';
import Payment from './src/page/Payment';
import OrderDetail from './src/page/Order/OrderDetail';
import TransactionDetails from './src/page/TransactionDetails';
import UnderPayment from './src/page/UnderPayment';
import Report from './src/page/Report/Report';
import CreateCategory from './src/page/Product/CreateCategory';
import CameraScreen from './src/page/CameraScreen';
import ImportProduct from './src/page/ImportProduct/ImportProduct';
import ImportProductInfo from './src/page/ImportProduct/ImportProductInfo';
import SaleType from './src/page/Coupon/SaleType';
import CreateCoupon from './src/page/Coupon/CreateCoupon';
import SaleManagement from './src/page/Coupon/SaleManagement';
import CouponDetail from './src/page/Coupon/CouponDetail';
import ImportBook from './src/page/ImportBook';
import ExportBook from './src/page/ExportBook';
import ProfileUser from './src/page/Auth/ProfileUser';
import Logout from './src/page/Logout';
import ServicePackage from './src/page/ServicePackage';
import Setting from './src/page/Auth/Setting';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { updateUser } from './src/actions/authActions';
import { addNotifyToken } from './src/actions/otherActions';
import { Linking } from 'react-native';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



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


const LoginNav = () => {

  return (
    <Stack.Navigator initialRouteName="UsernameInput" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UsernameInput" component={UsernameInput} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }}/>
        <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileUser" component={ProfileUser} options={{ headerShown: false }}/>
        <Stack.Screen name="VendorNav" component={VendorNav} options={{ headerShown: false }}/>
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterStore" component={RegisterStore} options={{ headerShown: false }} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const UserLoggedNav = () => {

  return (
    <Stack.Navigator initialRouteName="ProfileUser" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UsernameInput" component={UsernameInput} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }}/>
        <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileUser" component={ProfileUser} options={{ headerShown: false }}/>
        <Stack.Screen name="VendorNav" component={VendorNav} options={{ headerShown: false }}/>
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterStore" component={RegisterStore} options={{ headerShown: false }} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const VendorNav = () => {

  return (
    <Stack.Navigator initialRouteName="BottomNavigatorPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomNavigatorPage" component={BottomNavigator} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Order" component={Order} options={{ headerShown: false }}/>
        <Stack.Screen name="Warehouse" component={Warehouse} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Stack.Screen name="Sell" component={Sell} options={{ headerShown: false }}/>
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateProduct" component={CreateProduct} options={{ headerShown: false }}/>
        <Stack.Screen name="ProductManagement" component={ProductManagement} options={{ headerShown: false }}/>
        <Stack.Screen name="ProductInCategory" component={ProductInCategory} options={{ headerShown: false }}/>
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} options={{ headerShown: false }}/>
        <Stack.Screen name="Customers" component={Customers} options={{ headerShown: false }}/>
        <Stack.Screen name="PaymentDetail" component={PaymentDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
        <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="TransactionDetails" component={TransactionDetails} options={{ headerShown: false }}/>
        <Stack.Screen name="UnderPayment" component={UnderPayment} options={{ headerShown: false }}/>
        <Stack.Screen name="Report" component={Report} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateCategory" component={CreateCategory} options={{ headerShown: false }}/>
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ImportProduct" component={ImportProduct} options={{ headerShown: false }}/>
        <Stack.Screen name="ImportProductInfo" component={ImportProductInfo} options={{ headerShown: false }}/>
        <Stack.Screen name="SaleManagement" component={SaleManagement} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateCoupon" component={CreateCoupon} options={{ headerShown: false }}/>
        <Stack.Screen name="SaleType" component={SaleType} options={{ headerShown: false }}/>
        <Stack.Screen name="CouponDetail" component={CouponDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }}/>
        <Stack.Screen name="ImportBook" component={ImportBook} options={{ headerShown: false }}/>
        <Stack.Screen name="ExportBook" component={ExportBook} options={{ headerShown: false }}/>
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginNav" component={LoginNav}/>
        <Stack.Screen name="ServicePackage" component={ServicePackage} options={{ headerShown: false }}/>
        <Stack.Screen name="SettingStore" component={SettingStore} options={{ headerShown: false }}/>
        <Stack.Screen name="SettingProfile" component={SettingProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }}/>
      </Stack.Navigator>
  )
}

        
function App() {
  const dispatch = useDispatch();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef(); 
  const [data, setData] = useState('');
  

  useEffect(() => {
    const getData = async() => {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        const parsedUserData = JSON.parse(data);
        setData(parsedUserData);
        dispatch(updateUser(parsedUserData.user)); 
      }
    }
    getData();

    setTimeout(() => {
      SplashScreen?.hide();
    }, 900);
  }, []);
      
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      const getNotifyToken = async() => {
        const notifyToken = await AsyncStorage.getItem('notifyToken');
        if (!notifyToken) {
          const response = await addNotifyToken({ notifyToken: token });
          if (response?.code !== 0) {
            console.log('Exception');
          }
        }
      }
      getNotifyToken();
      setExpoPushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const navigationRef = useRef(null);
  const linking = {
    prefixes: ["com.lyhuong.SoBanHang://"],
    config: {
    initialRouteName: "BottomNavigatorPage",
    screens: {
            Home: 'Home',
            ServicePackage: 'ServicePackage',
            Report: 'Report'
    },
    },
    async getInitialURL() {
      // First, you may want to do the default deep link handling
      // Check if app was opened from a deep link
      const url = await Linking.getInitialURL();

      if (url != null) {
        return url;
      }

      // Handle URL from expo push notifications
      const response = await Notifications.getLastNotificationResponseAsync();
      return `com.lyhuong.SoBanHang://${response?.notification.request.content.data.url}`;
    },
      subscribe(listener) {
        const onReceiveURL = ({url}) => {
          listener(url);
        };
    
        // Listen to incoming links from deep linking
        const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
    
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
          const url = `com.lyhuong.SoBanHang://${response.notification.request.content.data.url}`;
          listener(url);
        });
    
        return () => {
          linkingSubscription.remove();
          subscription.remove();
        };
      },
  };
  return (
      <PaperProvider theme={DefaultTheme}>
        <NavigationContainer ref={navigationRef}
          linking={linking}
        >
          {data?.user?.profile ? <VendorNav /> : data ? <UserLoggedNav /> : <LoginNav />}
        </NavigationContainer>
      </PaperProvider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

    // token = (await Notifications.getExpoPushTokenAsync({ projectId: '02b29ea0-5b32-4138-babf-8f739813e5a6' })).data;
    token = (await Notifications.getDevicePushTokenAsync({ projectId: '0e674e53-ee33-403b-bb4b-7eac26af598e' })).data;

  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default App;

