import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera'; 
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';


function ModalCameraScreen( { onUpdateAvatar, actor }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  let cameraRef = null; 
  const takePicture = async () => {
    setLoading(true);
    if (cameraRef) {
        const photo = await cameraRef.takePictureAsync(); 
        const url = photo.uri;
        onUpdateAvatar(url);
        if (actor == 'vendor') {
            navigation.navigate('Profile');
        }
        else navigation.navigate('ProfileUser');
    }
    setLoading(false);
  };


  return (
    <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} ref={ref => (cameraRef = ref)}>
        </Camera>
        <View style={styles.bottomButtonContainer}>
            <TouchableOpacity onPress={takePicture}>
                <Image source={require('../../assets/images/camera-lens.png')} style={{ width: 55, height: 55, marginVertical: 10, alignSelf: 'center'}}/>
            </TouchableOpacity>          
        </View>
        {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    bottomButtonContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
})

export default ModalCameraScreen;
