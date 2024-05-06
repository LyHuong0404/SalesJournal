import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import TwoButtonBottom from "../components/TwoButtonBottom";
import { LogBox } from 'react-native';
import Loading from "../components/Loading";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function QRScanner({ route }) {
  const { onScanSuccess } = route.params;
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    navigation.navigate('CreateProduct');
    onScanSuccess(data);
  };


    return ( 
      <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Mã sản phẩm</Text>
        </View>
        {hasPermission === false && <Loading />}
        {hasPermission === null && <Loading />}
        {hasPermission === true && (
          <Camera
            style={styles.preview}
            type={Camera.Constants.Type.back}
            onBarCodeScanned={handleBarCodeScanned}
          >
            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
              <TouchableOpacity style={{ flex: 1, alignSelf: 'center', alignItems: 'center' }} >
                <Image source={require('../assets/images/screenshot.png')} style={{ width: 280, height: 280, tintColor: 'white'}}/>
              </TouchableOpacity>
            </View>
          </Camera>)}

          <TwoButtonBottom onBack={() => navigation.goBack()} titleLeft="Tạo thêm" titleRight="Hoàn tất" textColorLeft='#575757' buttonColorLeft='transparent' buttonColorRight='#15803D' borderColorLeft='#575757'/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  header: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },

})

export default QRScanner;