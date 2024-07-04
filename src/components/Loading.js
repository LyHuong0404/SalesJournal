import { memo } from 'react';
import { StyleSheet, View, Image } from 'react-native';

function Loading() {
    return (  
    <View style={styles.loadingOverlay}>
        <View style={{ backgroundColor: 'white', paddingHorizontal: 30, borderRadius: 7 }}>
            <Image source={require('../assets/images/loading.gif')} style={{ width: 45, height: 45, marginVertical: 10, alignSelf: 'center'}}/>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default memo(Loading);