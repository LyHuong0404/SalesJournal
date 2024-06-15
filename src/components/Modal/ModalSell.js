import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { memo, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";


import QRDemo from "../../page/QRDemo";
import LoadingSpinner from "../LoadingSpinner";

function ModalSell({ onClose }) {
    const navigation = useNavigation();
    const refRBSheetScan = useRef();
    const [loading, setLoading] = useState(false);

    const handleChooseScanCode = () => {
        refRBSheetScan.current?.open();
    }

    const handleChooseInputCode = () => {
        setLoading(true);
        onClose();
        navigation.navigate('OrderConfirmation', { open: true });
        setLoading(false);
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleChooseScanCode} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Image source={require('../../assets/images/scanner.png')} style={{ width: 40, height: 40, marginRight: 15 }}/>
                <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 15 }}>Quét mã sản phẩm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChooseInputCode} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/images/font.png')} style={{ width: 40, height: 40, marginRight: 15 }}/>
                <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 15 }}>Nhập mã sản phẩm</Text>
            </TouchableOpacity>

            <RBSheet
                ref={refRBSheetScan}
                customStyles={{               
                    container: {
                    height: '100%'
                    }
                }}
            >
                <QRDemo onScanSuccess={() => {
                        refRBSheetScan.current?.close(); 
                        onClose();
                    }} 
                    close={() => refRBSheetScan.current?.close()}/>
            </RBSheet>
            {loading && <LoadingSpinner />}
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
export default memo(ModalSell);