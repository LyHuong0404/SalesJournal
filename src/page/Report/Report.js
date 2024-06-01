import { View, StyleSheet, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';

import SellTab from "../../components/Report/SellTab";
import ProfitTab from "../../components/Report/ProfitTab";
import RevenueTab from "../../components/Report/RevenueTab";
import WarehouseTab from "../../components/Report/WarehouseTab";


const renderScene = SceneMap({
    first: ProfitTab,
    second: SellTab,
    third: WarehouseTab,
    // four: RevenueTab,
});

const CustomTabBar = (props) => {
    return (
        <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
            renderLabel={({ route, focused, color }) => (
            <Text style={[styles.tabText, focused ? styles.tabTextFocused : {}]}>
                {route.title}
            </Text>
            )}
        />
    );
};

function Report() {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Lãi lỗ' },
        { key: 'second', title: 'Bán hàng' },
        { key: 'third', title: 'Kho hàng' },
        // { key: 'four', title: 'Thu chi' },
    ]);


    return ( 
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Báo cáo</Text>
            </TouchableOpacity>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => <CustomTabBar {...props} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {       
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 15, 
        height: 'auto', 
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e5ea'
    },
    tabBar: {
        backgroundColor: '#ffffff', 
        
    },
    indicator: {
        backgroundColor: '#15803D', 
    },
    tabText: {
        color: '#6f6f6f', 
        fontSize: 12,       
    },
    tabTextFocused: {
        color: '#15803D', 
    },
})

export default Report;