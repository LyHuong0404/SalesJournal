import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import TwoButtonBottom from "../components/TwoButtonBottom";

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

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    return ( 
      <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/images/right_arrow.png')}  style={{ width: 17, height: 17, objectFit: 'contain', marginVertical: 15 }} />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Chi tiết đơn</Text>
        </View>
        {hasPermission === false && <Text>No access to camera</Text>}
        {hasPermission === null && <Text>Requesting for camera permission</Text>}
        {hasPermission === true && (
          <Camera
            style={styles.preview}
            type={Camera.Constants.Type.back}
            onBarCodeScanned={handleBarCodeScanned}
          />)}

          <TwoButtonBottom onBack={() => navigation.goBack()} title1="Tạo thêm" title2="Hoàn tất" />
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