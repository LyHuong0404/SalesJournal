import { View, StyleSheet, Text } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";

const data = [
    { id: 1, label: 'Item 1', value: '1' },
    { id: 2, label: 'Item 2', value: '2' },
    { id: 3, label: 'Item 3', value: '3' },
    { id: 4, label: 'Item 4', value: '4' },
    { id: 5, label: 'Item 5', value: '5' },
    { id: 6, label: 'Item 6', value: '6' },
    { id: 7, label: 'Item 7', value: '7' },
    { id: 8, label: 'Item 8', value: '8' },
];

function ModalSelectCategory({onSetCategory}) {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: '600', textAlign: 'center', marginBottom: 10 }}>Danh mục</Text>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: '#15803D', borderWidth: 1 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Chọn danh mục' : '...'}
            searchPlaceholder="Tìm kiếm..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            onSetCategory(item)
            }}
            renderLeftIcon={() => (
            <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
            />
          )}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      marginHorizontal: 15
    },
    dropdown: {
      height: 45,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
      color: '#15803D'
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 14,
      color: '#888888'
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
export default ModalSelectCategory;