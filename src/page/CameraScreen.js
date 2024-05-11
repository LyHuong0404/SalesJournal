import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera'; 
import { useNavigation } from '@react-navigation/native';

import Loading from '../components/Loading';

function CameraScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  let cameraRef = null; 
  const takePicture = async () => {
    if (cameraRef) {
        setLoading(true);
        const photo = await cameraRef.takePictureAsync(); 
        const url = photo.uri;
        navigation.navigate('CreateCategory', { url });
    }
  };


  return (
    <View style={{ flex: 1, paddingTop: 25 }}>
        <Camera style={{ flex: 1 }} ref={ref => (cameraRef = ref)}>
        </Camera>
        <View style={styles.bottomButtonContainer}>
            <TouchableOpacity onPress={takePicture}>
                <Image source={require('../assets/images/camera-lens.png')} style={{ width: 55, height: 55, marginVertical: 10, alignSelf: 'center'}}/>
            </TouchableOpacity>          
        </View>
        {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea'
    },
    title_header: {
        fontWeight: 'bold', 
        flex: 1,
        textAlign: 'center',
    },
    image_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center space-between',
        alignItems: 'center',
        height: 120,
        backgroundColor: '#f2f2f5',
        marginHorizontal: 15,
    },
    button_upload: {
        borderRadius: 10,
        padding: 0,
        borderWidth: 1,
        borderColor: '#22539e',
    },
    image_category: {
        width: '100%',
        height: '85%',
        objectFit: 'contain',
        flex: 0.6
    },
    bottomButtonContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
})

export default CameraScreen;
