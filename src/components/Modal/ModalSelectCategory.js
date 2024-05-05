import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { filterCategory } from "../../actions/seller/categoryActions";

function ModalSelectCategory({ onSetCategory }) {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      try {
          const fetchApi = async() => {
              const response = await filterCategory({ pageIndex: 0, pageSize: 1000 });
              let convertFormat = [];
              if (response?.content) {
                response.content.map((cg) => convertFormat.push({ label: cg.name, value: cg.id}));
              }
              setCategories(convertFormat);
          }
          fetchApi();
      } catch(err) {
          ToastAndroid.show('Lỗi khi tải danh mục', ToastAndroid.SHORT);
      }
    }, []);

    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: '600', textAlign: 'center', marginBottom: 10 }}>Danh mục</Text>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: '#15803D', borderWidth: 1 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={categories}
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