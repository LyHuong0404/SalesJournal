import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from '../page/Intro';
import RegisterStore from '../page/Auth/RegisterStore';
import Home from '../page/Home';
import Order from '../page/Order/Order';
import Warehouse from '../page/Warehouse';
import Sell from '../page/Sell';
import Register from '../page/Auth/Register';
import Login from '../page/Auth/Login';
import UsernameInput from '../page/Auth/UsernameInput';
import Profile from '../page/Auth/Profile';
import OTP from '../page/Auth/OTP';
import ChangePassword from '../page/Auth/ChangePassword';
import SettingProfile from '../page/Auth/SettingProfile';
import RecoveryPassword from '../page/Auth/RecoveryPassword';
import CreateProduct from '../page/Product/CreateProduct';
import Search from '../page/Search';
import OrderConfirmation from '../page/Order/OrderConfirmation';
import ProductManagement from '../page/Product/ProductManagement';
import ProductInCategory from '../page/Product/ProductInCategory';
import Customers from '../page/Customers/Customers';
import SettingStore from '../page/Auth/SettingStore';
import PaymentDetail from '../page/PaymentDetail';
import Payment from '../page/Payment';
import OrderDetail from '../page/Order/OrderDetail';
import TransactionDetails from '../page/TransactionDetails';
import Report from '../page/Report/Report';
import CreateCategory from '../page/Product/CreateCategory';
import ImportProduct from '../page/ImportProduct/ImportProduct';
import ImportProductInfo from '../page/ImportProduct/ImportProductInfo';
import SaleType from '../page/Coupon/SaleType';
import CreateCoupon from '../page/Coupon/CreateCoupon';
import SaleManagement from '../page/Coupon/SaleManagement';
import CouponDetail from '../page/Coupon/CouponDetail';
import ImportBook from '../page/ImportBook';
import ExportBook from '../page/ExportBook';
import ProfileUser from '../page/Auth/ProfileUser';
import Logout from '../page/Logout';
import ServicePackage from '../page/ServicePackage';
import Setting from '../page/Auth/Setting';
import AdminHome from '../page/Admin/AdminHome';
import AccountManagement from '../page/Admin/AccountManagement';
import TransactionManagement from '../page/Admin/TransactionManagement';
import ServicePackageManagement from '../page/Admin/ServicePackageManagement';
import AddServicePackage from '../page/Admin/AddServicePackage';
import OrderHistory from '../page/Auth/OrderHistory';
import MyQR from '../page/Auth/MyQR';
import { Image } from 'react-native';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const LoginNav = () => {

    return (
      <Stack.Navigator initialRouteName="UsernameInput" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="UsernameInput" component={UsernameInput} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }}/>
          <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} options={{ headerShown: false }}/>
          <Stack.Screen name="ProfileUser" component={ProfileUser} options={{ headerShown: false }}/>
          <Stack.Screen name="VendorNav" component={VendorNav} options={{ headerShown: false }}/>
          <Stack.Screen name="AdminNav" component={AdminNav} options={{ headerShown: false }}/>
          <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }}/>
          <Stack.Screen name="RegisterStore" component={RegisterStore} options={{ headerShown: false }} />
          <Stack.Screen name="MyQR" component={MyQR} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
}


export const UserLoggedNav = () => {

  return (
    <Stack.Navigator initialRouteName="ProfileUser" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UsernameInput" component={UsernameInput} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }}/>
        <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }}/>
        <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileUser" component={ProfileUser} options={{ headerShown: false }}/>
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <Stack.Screen name="VendorNav" component={VendorNav} options={{ headerShown: false }}/>
        <Stack.Screen name="RegisterStore" component={RegisterStore} options={{ headerShown: false }} />
        <Stack.Screen name="MyQR" component={MyQR} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export const AdminNav = () => {

  return (
    <Stack.Navigator initialRouteName="AdminHome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AdminHome" component={AdminHome} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>    
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }}/>
        <Stack.Screen name="SettingProfile" component={SettingProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }}/>
        <Stack.Screen name="AccountManagement" component={AccountManagement} options={{ headerShown: false }}/>
        <Stack.Screen name="TransactionManagement" component={TransactionManagement} options={{ headerShown: false }}/>
        <Stack.Screen name="ServicePackageManagement" component={ServicePackageManagement} options={{ headerShown: false }}/>
        <Stack.Screen name="AddServicePackage" component={AddServicePackage} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginNav" component={LoginNav}/>
        <Stack.Screen name="MyQR" component={MyQR} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}

export const VendorNav = () => {

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
        <Stack.Screen name="Report" component={Report} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateCategory" component={CreateCategory} options={{ headerShown: false }}/>
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
        <Stack.Screen name="ServicePackage" component={ServicePackage} options={{ headerShown: false }}/>
        <Stack.Screen name="SettingStore" component={SettingStore} options={{ headerShown: false }}/>
        <Stack.Screen name="SettingProfile" component={SettingProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }}/>
        <Stack.Screen name="AdminNav" component={AdminNav} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginNav" component={LoginNav}/>
        <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }}/>
        <Stack.Screen name="MyQR" component={MyQR} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}


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
      name="Hóa đơn"
      component={Order}
      options={({ route }) => ({
        tabBarLabel: 'Hóa đơn',
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

const CustomTabIcon = ({ route, focused }) => {
  let iconSource;
  if (route && route.name) { 
    switch (route.name) {
      case 'Quản lý':
        iconSource = focused
        ? require('../assets/images/bottom1_active.png')
        : require('../assets/images/bottom1.png');
        break;
      case 'Hóa đơn':
        iconSource = focused
          ? require('../assets/images/bottom2_active.png')
          : require('../assets/images/bottom2.png');
        break;
      case 'Kho hàng':
        iconSource = focused
          ? require('../assets/images/bottom4_active.png')
          : require('../assets/images/bottom4.png');
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