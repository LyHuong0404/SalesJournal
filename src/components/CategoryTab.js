import { View, StyleSheet, ScrollView } from "react-native";
import HorizontalCategory from "./HorizontalCategory";
import { FAB } from 'react-native-paper';


function CategoryTab() {
    return (  
        <View style={styles.container}>
            <FAB
                icon="plus"
                label="Tạo danh mục"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
                color='white'
            />
            <ScrollView>
                <HorizontalCategory />
                <HorizontalCategory />
                <HorizontalCategory />
                <HorizontalCategory />
                <HorizontalCategory />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 7,
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

export default CategoryTab;