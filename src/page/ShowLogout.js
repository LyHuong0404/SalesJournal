import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Modal } from "react-native-paper";
import { showLogout } from '../utils/httprequest';
import { logout } from '../actions/authActions';
import { useNavigation } from "@react-navigation/native";
import LoadingSpinner from '../components/LoadingSpinner';
const containerStyle = {backgroundColor: 'white', margin: 40, height: 'auto', borderRadius: 10 };


export const ShowLogout = () => {
  const { isShowLogout } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const goToLogin = async () => {
    setLoading(true);
    await dispatch(showLogout({value: false}));
    await dispatch(logout());
    setLoading(false);
    navigation.navigate("LoginNav");
  }
  useEffect(() => {
  }, [isShowLogout]);

  return ( 
    <>
        {isShowLogout && 
          <>
            <Modal visible={true} contentContainerStyle={containerStyle}>
              <View style={styles.container}>
                  <View style={{ borderBottomColor: '#e2e5ea', borderBottomWidth: 1 }}>
                      <Text style={{ fontWeight: 'bold', color: '#c10d0d', textAlign: 'center', fontSize: 16 }}>Thông báo</Text>
                      <Text style={styles.text_question}>Phiên làm việc đã hết hạn</Text>
                  </View>
                  <Text onPress={goToLogin} style={{ marginTop: 10, color: '#2083c5', fontWeight: '500', textAlign: 'center' }}>OK</Text>   
              </View>
            </Modal>
            {loading && <LoadingSpinner />}
          </>
        }
    </>

  )
}

const styles = StyleSheet.create({
  container: {
      padding: 20,
  },
  text_question: {
      marginBottom: 15, 
      color: '#575757',
      fontSize: 13,
      textAlign: 'center',
  },
})