import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Platform, Linking } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import Intro from './src/page/Intro';
import * as Router from './src/routers/Route';
import { profileInfo, updateUser } from './src/actions/authActions';
import { ShowLogout } from './src/page/ShowLogout';
import { GlobalPopup } from './src/page/GlobalPopup';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


        
function App() {
  const dispatch = useDispatch();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef(); 
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const getData = async(expireAt) => {
    if(!expireAt) return;
    const data = await AsyncStorage.getItem('user');
    if (data) {
      const parsedUserData = JSON.parse(data);
      parsedUserData.user.profile.expireAt = expireAt; 
      dispatch(updateUser(parsedUserData.user)); 
    }
  }

  useEffect(() => {
    const getData = async() => {
      setLoading(true);
      const data = await AsyncStorage.getItem('user');
      if (data) {
        const parsedUserData = JSON.parse(data);
        if (
          ((parsedUserData?.roles.some((item) => item == 'ROLE_BUYER') || 
          parsedUserData?.roles.some((item) => item == 'ROLE_VENDOR')) &&
          !parsedUserData?.roles.some((item) => item == 'ROLE_ADMIN'))
        ) {
            const rs = await profileInfo();
            parsedUserData.user.profile = rs; 
        }

        
        
        setData(parsedUserData);
        dispatch(updateUser(parsedUserData.user)); 
      }
      setLoading(false); 
    }
    getData();

    setTimeout(() => {
      SplashScreen?.hide();
    }, 900);
  }, []);
      
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      const setNotifyToken = async() => {
        const notifyToken = await AsyncStorage.getItem('notifyToken');
        if (!notifyToken) {
          await AsyncStorage.setItem('notifyToken', token);
        }
      }
      setNotifyToken();
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
    // initialRouteName: "ProfileUser",
    screens: {
            Home: 'Home',
            ServicePackage: 'ServicePackage',
            ImportProduct: 'ImportProduct',
            // OrderHistory: 'OrderHistory'
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
        const onReceiveURL = ({url}) => listener(url);
    
        // Listen to incoming links from deep linking
        const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
    
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
          const url = `com.lyhuong.SoBanHang://${response.notification.request.content.data.url}`;
          if(response.notification.request.content.data.url == 'Home') {
            const dateExpire = response?.notification?.request?.content?.data?.dateExpire;
            getData(dateExpire);
          }
          if(navigationRef.current) {
            navigationRef.current.navigate(url);
          }
          else {
            listener(url);
          }
        });
    
        return () => {
          linkingSubscription.remove();
          subscription.remove();
        };
      },
  };
  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer ref={navigationRef} linking={linking}>
        {loading ? (
          <Intro /> 
        ) : data?.roles?.some((item) => item == "ROLE_ADMIN") ? 
          <Router.AdminNav /> : (data?.roles?.some((item) => item == "ROLE_VENDOR") ?
          <Router.VendorNav /> : (data ? <Router.UserLoggedNav /> : <Router.LoginNav /> ))
        }
        <ShowLogout/>
        <GlobalPopup/>
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

    // token = (await Notifications.getDevicePushTokenAsync({ projectId: '02b29ea0-5b32-4138-babf-8f739813e5a6' })).data; //lyhuong2002@gmail.com
    // token = (await Notifications.getDevicePushTokenAsync({ projectId: '01af01a1-f80b-4ad9-9fc1-87771bba6e12' })).data; //tienhkdev
    token = (await Notifications.getDevicePushTokenAsync({ projectId: '0e674e53-ee33-403b-bb4b-7eac26af598e' })).data; //hokimtien2002@gmail.com
    // token = (await Notifications.getDevicePushTokenAsync({ projectId: 'b6a9ea24-72c4-4797-92ae-f2f408de0cf1' })).data;
    //https://docs.expo.dev/push-notifications/fcm-credentials/
    //https://docs.expo.dev/versions/latest/sdk/notifications/
    //https://docs.expo.dev/push-notifications/sending-notifications-custom/

  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default App;

