import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import { useState, useEffect,useCallback, memo } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFocusEffect } from "@react-navigation/native";

import { filterCategory } from "../../actions/seller/categoryActions";
import LoadingSpinner from "../LoadingSpinner";

function ModalSelectCategory({ onSetCategory }) {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCategories = async() => {
      setLoading(true);
      const response = await filterCategory({ pageIndex: 0, pageSize: 1000 });
      let convertFormat = [];
      if (response?.content) {
        response.content.map((cg) => convertFormat.push({ label: cg.name, value: cg.id, price: cg.salePrice }));
      }
      setCategories(convertFormat);
      setLoading(false);
    }

    useEffect(() => {
      try {
        getCategories();
          
      } catch(err) {
        setLoading(false);
          ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
      }
    }, []);

    useFocusEffect(
      useCallback(() => {
        getCategories();
      }, [])
    );

    return (
      <>
        <View style={styles.container}>
          <Text style={{ fontWeight: '600', textAlign: 'center', marginBottom: 10 }}>Sản phẩm</Text>
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
              placeholder={!isFocus ? 'Chọn sản phẩm' : '...'}
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
          {loading && <LoadingSpinner />}
      </>
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
export default memo(ModalSelectCategory);