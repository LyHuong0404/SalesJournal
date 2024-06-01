import { View, StyleSheet, ScrollView, ToastAndroid, Image, Text } from "react-native";
import { FAB } from 'react-native-paper';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState, memo } from "react";


import HorizontalCategory from "./HorizontalCategory";
import { filterCategory } from "../actions/seller/categoryActions";
import LoadingSpinner from "../components/LoadingSpinner";

function CategoryTab({ onSearchValue }) {
    const navigation = useNavigation();
    const [pageIndex, setPageIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [resetPageIndex, setResetPageIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPageIndex(0);
        setCategories([]);
    }, [resetPageIndex, onSearchValue]);

    useEffect(() => {
        try {
            const fetchCategories = async () => {
                setLoading(true);
                try {
                    const response = await filterCategory({ pageIndex, pageSize: 20, keySearch: onSearchValue });                   
                    if (pageIndex == 0) {
                        setCategories(response?.content);
                    } else {
                        setCategories(prevCategories => [...prevCategories, ...response?.content]);
                    }
                } catch (err) {
                    ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
                }
                setLoading(false);
            };
            fetchCategories();
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, [pageIndex, resetPageIndex, onSearchValue]);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndOfList = layoutMeasurement.height + contentOffset.y >= contentSize.height-25;
        if (isEndOfList) {
            setPageIndex(prevPageIndex => prevPageIndex + 1);
        }
    };
    

    useFocusEffect(
        useCallback(() => {
            setResetPageIndex(prevResetIndex => prevResetIndex + 1);
        }, [])
    );
    
    return (  
        <View style={styles.container}>
            <FAB
                icon="plus"
                label="Tạo sản phẩm"
                style={styles.fab}
                onPress={() => navigation.navigate('CreateCategory')} 
                variant='secondary'
            />
            {(!categories || categories?.length == 0) && (!onSearchValue) &&
                <View style={styles.content_noitem}>
                    <Image source={require('../assets/images/noresults.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginBottom: 15, marginTop: 25 }}>Bạn chưa có sản phẩm nào, hãy tạo ngay sản phẩm đầu tiên nhé</Text>
                </View>
            }

            {(!categories || categories?.length == 0) && (onSearchValue) &&
                <View style={styles.content_noitem}>
                    <Image source={require('../assets/images/noresults.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginTop: 25 }}>Không có kết quả tìm kiếm phù hợp.</Text>
                </View>
            }
            
            {categories?.length > 0 &&
                <ScrollView onScroll={handleScroll}>
                    {categories?.map((category, index) => <HorizontalCategory key={index} category={category} />)}
                </ScrollView>
            }
            {loading && <LoadingSpinner />}
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
        borderRadius: 50,
    },
    content_noitem: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center', 
        paddingHorizontal: 8,
    },
})

export default memo(CategoryTab);