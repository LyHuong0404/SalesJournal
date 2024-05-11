import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";


import ModalCameraScreen from "../../components/Modal/ModalCameraScreen";

function ModalConfirmCamera({ onUpdateAvatar }) {
    const navigation = useNavigation();
    const refRBSheet = useRef();

    const handleChooseImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if (result.canceled === false) {
            await onUpdateAvatar(result.assets[0].uri);
            navigation.navigate('ProfileUser');
        } else  {}
    };

    const handleUpdateAvatar = (url) => {
        onUpdateAvatar(url);
        refRBSheet.current.close();
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => refRBSheet?.current.open()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Image source={require('../../assets/images/image_circle.png')} style={{ width: 40, height: 40, marginRight: 15 }}/>
                <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 15 }}>Chụp ảnh đại diện</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChooseImage} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/images/camera_circle.png')} style={{ width: 40, height: 40, marginRight: 15 }}/>
                <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 15 }}>Tải ảnh đại diện</Text>
            </TouchableOpacity>

            <RBSheet
                ref={refRBSheet}
                customStyles={{               
                    container: {
                      height: '100%'
                    }
                }}
            >
                <ModalCameraScreen onUpdateAvatar={handleUpdateAvatar} />
            </RBSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3a3a3a',
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e5ea',
        paddingBottom: 10
    },
    button_container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    button_calendar: {
        width: '48%',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1
    },
    text_input_day: {
        flex: 1,
        paddingVertical: 0,
        height: 35,
        backgroundColor: 'transparent',
        fontSize: 13,
        paddingHorizontal: 0
    }
    
  });
export default ModalConfirmCamera;