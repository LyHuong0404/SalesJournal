import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView} from "react-native";
import { useNavigation, useFocusEffect  } from "@react-navigation/native";
import { FAB, Searchbar } from 'react-native-paper';
import { useCallback, useEffect, useRef, useState } from "react";
import * as Animatable from 'react-native-animatable';

import { filterCoupon } from "../../actions/couponActions";
import useDebounce from "../../hooks";
import { convertTimeStamp } from "../../utils/helper";
import LoadingSpinner from "../../components/LoadingSpinner";

function SaleManagement() {
    const navigation = useNavigation();
    const [coupons, setCoupons] = useState([]);
    const [searchbarVisible, setSearchbarVisible] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const debounceValue = useDebounce(searchValue, 500);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [resetPageIndex, setResetPageIndex] = useState(0);
    const previousOffsetY = useRef(0);

    const getAllCoupon = async () => {
        try {
            setLoading(true);
            const response = await filterCoupon({ pageIndex, pageSize: 40, keySearch: debounceValue, orderBy: null });
            if(response) {
                if (response?.content.length > 0) {
                    response?.content?.map((element) => {
                        element.startDate = convertTimeStamp(element.startDate, 'dd/MM/yyyy');
                        element.endDate = convertTimeStamp(element.endDate, 'dd/MM/yyyy');
                    });
                }
                if (pageIndex === 0) {
                    setCoupons(response?.content);
                } else {
                    setCoupons(prev => [...prev, ...response?.content]);
                }
            }    
            setLoading(false);
        } catch (err) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải mã khuyến mãi', ToastAndroid.SHORT);
        }
    };

    useEffect(() => {  
        getAllCoupon();
    }, [debounceValue, resetPageIndex, pageIndex]);

    useFocusEffect(
        useCallback(() => {
            setResetPageIndex(prevResetIndex => prevResetIndex + 1);
        }, [])
    );
   
    const statusOfCoupon = (status) => {
        if (status) {
            return 'Đang chạy';
        } else {
            return 'Đã dừng';
        }
    }
    
    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isScrollingDown = contentOffset.y > previousOffsetY.current;
        previousOffsetY.current = contentOffset.y;
    
        if (isScrollingDown) {
            const isEndOfList = layoutMeasurement.height + contentOffset.y >= contentSize.height-25;
            if (isEndOfList) {
                setPageIndex(prevPageIndex => prevPageIndex + 1)
            };
        }
    }

    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.header}>
                    <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    <Text style={{ fontWeight: 'bold' }}>Quản lý khuyến mãi</Text>            
                    {!searchbarVisible ? 
                        (<TouchableOpacity onPress={() => setSearchbarVisible(true)}>
                            <Image source={require('../../assets/images/search.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                        </TouchableOpacity>) : 
                        (<TouchableOpacity onPress={() => {
                                setSearchbarVisible(false);
                                setSearchValue(null);
                            }}>
                            <Image source={require('../../assets/images/close.png')} style={{ width: 25, height: 20, objectFit: 'contain', marginRight: 15, tintColor: '#000000' }}/>
                        </TouchableOpacity>
                    )} 
                </View>
            </TouchableOpacity>
            {searchbarVisible &&(<Animatable.View animation="zoomIn" duration={50} style={{ backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 15, borderRadius: 5, backgroundColor: '#f8f9fa', borderColor: '#15803D', borderWidth: 1, height: 40, flexDirection: 'row', alignItems: 'center' }}>
                    <Searchbar
                        autoFocus
                        placeholder="Tìm kiếm theo tên khuyến mãi"
                        iconColor='#8e8e93'
                        value={searchValue}
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent', 
                        }}
                        inputStyle={{
                            fontSize: 13, 
                        }}
                        placeholderTextColor="#8e8e93" 
                        onChangeText={(text) => {
                            setSearchValue(text);
                            setPageIndex(0);
                            }
                        }
                        clearIcon='close-circle-outline'
                        onClearIconPress={() => {
                            setSearchValue(null);
                            setPageIndex(0);
                            }
                        }
                    />
                </View>
            </Animatable.View>)}
            {coupons?.length > 0 && 
                <ScrollView style={{ marginHorizontal: 15 }} onScroll={handleScroll} scrollEventThrottle={16}>
                    {coupons.map((coupon, index) => {
                        return (<View key={index} style={{ marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('CouponDetail', { couponId: coupon?.couponId })}>
                                        <Text style={{ fontWeight: '500', color: '#6f6f6f', marginTop: 15, marginBottom: 5, color: coupon.status ? '#15803D' : '#d81f1f' }}>{statusOfCoupon(coupon.status)}</Text>
                                        <View style={[styles.coupon_item_container, { borderColor: coupon.status ? '#15803D' : '#d81f1f' }]}> 
                                            <View style={styles.display}>
                                                <Text style={styles.coupon_code}>{coupon?.couponCode}</Text>
                                                <Text style={styles.text_light}>{`${coupon?.startDate} - ${coupon?.endDate}`}</Text>
                                            </View>
                                            <Text style={{ fontWeight: '500', marginVertical: 5 }}>{coupon?.description}</Text>
                                            {coupon?.proviso == 'BY_PRODUCT' ? 
                                                (coupon?.type == 'NUMBER' ? 
                                                <Text style={[styles.text_light, { marginBottom: 5 }]}>
                                                    {`Giảm ${coupon?.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} khi mua từ ${coupon?.provisoMinAmount} sản phẩm`}
                                                </Text>                                               : 
                                                    <Text style={[styles.text_light, { marginBottom: 5 }]}>{`Giảm ${coupon?.value * 100}% khi mua từ ${coupon?.provisoMinAmount} sản phẩm`}</Text>
                                                ) :
                                                (coupon?.type == 'NUMBER' ? 
                                                    <Text style={[styles.text_light, { marginBottom: 5 }]}>{`Giảm ${coupon?.value} khi mua đơn từ ${coupon?.provisoMinPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}</Text> : 
                                                    <Text style={[styles.text_light, { marginBottom: 5 }]}>{`Giảm ${coupon?.value *100}% khi mua đơn từ ${coupon?.provisoMinPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}</Text>
                                                ) 
                                            }
                                            <View style={styles.display}>
                                                <Image source={require('../../assets/images/shopping_bag.png')} style={{ width: 17, height: 17, objectFit: 'contain', marginRight: 10, tintColor: '#a3a3a3' }}/>
                                                <Text style={styles.text_light}>{`Đã dùng: ${coupon?.usedAmount}/${coupon?.limitUse}`}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>)
                            })  
                        }                                
                </ScrollView>
            }
            {coupons?.length == 0 && searchbarVisible && 
                <View style={styles.content}>
                    <Image source={require('../../assets/images/noresult.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginTop: 25 }}>Không có kết quả tìm kiếm phù hợp.</Text>
                </View>
            }
            {coupons?.length == 0 && !searchbarVisible &&
                <View style={styles.content}>
                    <Image source={require('../../assets/images/noresult.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
                    <Text style={{ color: '#8e8e93', textAlign: 'center', marginTop: 25 }}>Cửa hàng chưa có mã khuyến mãi</Text>
                    <Text style={{ color: '#8e8e93', textAlign: 'center' }}>Hãy tạo ngay mã khuyến mãi đầu tiên nhé!</Text>
                </View>
            }
            {loading && <LoadingSpinner />}
            <FAB
                icon="plus"
                label="Tạo khuyến mãi"
                style={styles.fab}
                onPress={() => navigation.navigate('SaleType')} 
                variant='secondary'
            />
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7f8',
    },
    display: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        flex: 1
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 100,
        borderRadius: 50,
    },
    coupon_item_container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1, 
    },
    coupon_code: {
        fontSize: 10,
        color: '#0e7bc5',
        fontWeight: '500',
        paddingHorizontal: 4,
        paddingVertical: 2,
        backgroundColor: '#c2e2f8',
        borderRadius: 5,
        marginRight: 10
    },
    text_light: {
        fontSize: 10,
        color: '#6f6f6f'
    }
    
})

export default SaleManagement;