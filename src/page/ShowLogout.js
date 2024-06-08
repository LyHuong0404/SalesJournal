import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { useEffect } from 'react';

export const ShowLogout = () => {
  const {isShowLogout} = useSelector(state => state.auth);
  useEffect(() => {
    console.log("ShowLogout", isShowLogout);
  }, [isShowLogout]);
  return ( 
    <>
        {isShowLogout && <View><Text>Go to login</Text></View>}
    </>

  )
}