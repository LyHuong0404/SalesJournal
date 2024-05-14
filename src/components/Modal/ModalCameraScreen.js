import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions  } from 'expo-camera/next'; 
import { useNavigation } from '@react-navigation/native';

import LoadingSpinner from '../LoadingSpinner';


function ModalCameraScreen( { onUpdateAvatar, actor, close }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <LoadingSpinner />
    }

    if (!permission.granted) {
        const checkCameraPermission = async () => {
            try {
            const status = await requestPermission();
            if (status?.status === 'denied') {
                close();
            }
            } catch (error) {
                console.error('camera', error);
            }
        };        
        checkCameraPermission();
    }


    let cameraRef = null; 
    const takePicture = async () => {
        setLoading(true);
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync(); 
            const url = photo.uri;
            if (actor == 'CreateCategory') {
                navigation.navigate('CreateCategory', { url });
                close();
            }
            else if (actor == 'vendor') {
                onUpdateAvatar(url);
                navigation.navigate('Profile');
            }
            else {
                onUpdateAvatar(url);
                navigation.navigate('ProfileUser');
            }
        }
        setLoading(false);
    };


    return (
        <View style={{ flex: 1 }}>
            <CameraView style={{ flex: 1 }} ref={ref => (cameraRef = ref)}>
            </CameraView>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={takePicture}>
                    <Image source={require('../../assets/images/camera-lens.png')} style={{ width: 55, height: 55, marginVertical: 10, alignSelf: 'center'}}/>
                </TouchableOpacity>          
            </View>
            {loading && <LoadingSpinner />}
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
