import { View, StyleSheet, ScrollView } from "react-native";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { useState } from "react";
import VerticalProduct from "./VerticalProduct";
import { FAB } from 'react-native-paper';



function ProductTab() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleIndexChange = (index) => {
        setSelectedIndex(index);
    };
    return (  
        <View style={styles.container}>
            <View style={styles.header}>
                <SegmentedControlTab
                    values={['Tất cả', 'Bán chạy', 'Mới nhất']}
                    selectedIndex={selectedIndex}
                    onTabPress={handleIndexChange}
                    tabStyle={{ backgroundColor: 'white', borderColor: '#e5e5ea', borderWidth: 1.5, borderRadius: 8, marginRight: 10, minWidth: 70 }}
                    activeTabStyle={{ backgroundColor: 'white', borderColor: '#4173bc', borderWidth: 1.5, borderRadius: 8 }}
                    tabTextStyle={{ color: '#8e8e93' }}
                    activeTabTextStyle={{ color: '#4173bc' }}
                />
            </View>
            <FAB
                icon="plus"
                label="Tạo sản phẩm"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
                color='white'
            />
            <ScrollView>
                <View style={styles.container_product}>
                    <VerticalProduct />
                    <VerticalProduct />
                    <VerticalProduct />
                    <VerticalProduct />
                    <VerticalProduct />
                    <VerticalProduct />
                    <VerticalProduct />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    header: {
        backgroundColor: '#ebeced',
        paddingHorizontal: 5,
        paddingVertical: 7
    },
    container_product: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: '#0e7bc5',
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1.5
    },
})

export default ProductTab;