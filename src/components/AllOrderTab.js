import { View, StyleSheet, ScrollView } from "react-native";
import OrderItem from "./OrderItem";


function AllOrderTab() {
    return (  
        <View style={styles.container}>
            <ScrollView>
                <OrderItem />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 7,
    },
});

export default AllOrderTab;