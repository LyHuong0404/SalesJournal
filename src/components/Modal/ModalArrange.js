import { StyleSheet, View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import { memo } from "react";

const options = [
    {value: 'null', title: "Mới nhất"},
    {value: 'desc_totalSaleAmount', title: "Sản phẩm bán chạy"},
    {value: 'giamgia', title: "Sản phẩm giảm giá"},
    {value: 'desc_salePrice', title: "Giá từ cao đến thấp"},
    {value: 'salePrice', title: "Giá từ thấp đến cao"},
]

function ModalArrange({ value, onSelectedChange }) {

    return ( 
        <View style={styles.container}>
            <Text style={{ fontWeight: '600', textAlign: 'center' }}>Sắp xếp</Text>
            <RadioButton.Group 
                onValueChange={(newValue) => {
                        onSelectedChange(newValue)
                    } 
                } 
                value={value}>
                {options.map((option, index) => 
                    <View key={index} style={styles.display}>
                        <RadioButton value={option.value} color="#15803D" />
                        <Text>{option.title}</Text>
                    </View>)}
            </RadioButton.Group>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f4'
    }
})

export default memo(ModalArrange);