import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import DateTimePicker from "react-native-modal-datetime-picker";
import { format, parse } from 'date-fns';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


import { applyProductForCoupon, getCouponById, stopCoupon, unapplyProductForCoupon, updateCoupon } from "../../actions/couponActions";
import TextInputCustom from "../../components/TextInputCustom";
import TwoButtonBottom from "../../components/TwoButtonBottom";
import { filterCategory } from "../../actions/seller/categoryActions";
import { convertTimeStamp } from "../../utils/helper";
import ModalConfirmation from "../../components/Modal/ModalConfirmation";
import LoadingSpinner from "../../components/LoadingSpinner";


function CouponDetail() {
    const route = useRoute();
    const [couponId, setCouponId] = useState(route.params?.couponId || '');
    const navigation = useNavigation();
    const [provisoMinAmount, setProvisoMinAmount] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [startDate, setStartDate] = useState('');   
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState(1)
    const [value, setValue] = useState('');
    const [provisoMinPrice, setProvisoMinPrice] = useState('');
    const [proviso, setProviso] = useState(route.params?.proviso || '');
    const [datePickerStartVisible, setDatePickerStartVisible] = useState(false);
    const [datePickerEndVisible, setDatePickerEndVisible] = useState(false);
    const [limitUse, setLimitUse] = useState('');
    const [loading, setLoading] = useState(false);
    const [productIds, setProductIds] = useState([]);
    const [productIdsInit, setProductIdsInit] = useState([]);
    const [categories, setCategories] = useState([]);
    const [usedAmount, setUsedAmount] = useState('');
    const [saleName, setSaleName] = useState('');
    const [couponApplyProductDTOs,setCouponApplyProductDTOs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activated, setActivated] = useState(false);
 

    const getDataCoupon = () => {
        try{
            const fetchAPI = async() => {
                setLoading(true);
                const response = await getCouponById(couponId);
                if (response?.code == 0) {
                    let data = response.data;
                    setProvisoMinAmount(data.provisoMinAmount.toString());
                    setCouponCode(data.couponCode);
                    setStartDate(convertTimeStamp(data.startDate, 'yyyy-MM-dd'));
                    setEndDate(convertTimeStamp(data.endDate, 'yyyy-MM-dd'));
                    setProvisoMinPrice(data.provisoMinPrice.toString());
                    setProviso(data.proviso);
                    setLimitUse(data.limitUse.toString());
                    setUsedAmount(data.usedAmount.toString());
                    setSaleName(data.description);
                    setActivated(data.activated);
                    setCouponApplyProductDTOs(data.couponApplyProductDTOs);
                    if (data.couponApplyProductDTOs.length > 0) {
                        let convertFormat = [];
                        data.couponApplyProductDTOs.map((cg) => convertFormat.push(cg.productId));
                        setProductIds(convertFormat);
                        setProductIdsInit(convertFormat);
                    }
                    if(data.type == 'NUMBER') {
                        setType(1);
                        setValue(data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
                    } else {
                        setType(2);
                        setValue((data.value * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
                    }
                }
                setLoading(false);
                
            }
            fetchAPI();
        } catch(e) {
            ToastAndroid.show('Lỗi khi tải mã khuyến mãi', ToastAndroid.SHORT);
        }
    }

    const getCategories = () => {
        const fetchApi = async() => {
            const response = await filterCategory({ pageIndex: 0, pageSize: 1000 });
            let convertFormat = [];
            if (response?.content) {
                response.content.map((cg) => convertFormat.push({ label: cg.name, value: cg.id}));
            }
            setCategories(convertFormat);
        }
        fetchApi();
    }

    useEffect(() => {
        getCategories();
        getDataCoupon();
    }, [])

    const hideDatePicker = () => {
        if (datePickerStartVisible) {
            setDatePickerStartVisible(!datePickerStartVisible);
        } else setDatePickerEndVisible(!datePickerEndVisible);
    };

    const handleConfirmDatePicker = (date) => {
        if (datePickerStartVisible) {
            setStartDate(format(new Date(date), 'yyyy-MM-dd'));
        } else {
            setEndDate(format(new Date(date), 'yyyy-MM-dd'));
        }
        hideDatePicker();
    };

    const handleCancelCoupon = () => {
        try {
            const fetchAPI = async() => {
                setLoading(true);
                const response = await stopCoupon({ couponId });
                if (response.code == 0) {
                    ToastAndroid.show('Dừng khuyến mãi thành công', ToastAndroid.SHORT);
                    navigation.navigate('SaleManagement');
                } else {
                    ToastAndroid.show('Dừng khuyến mãi thất bại', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
        } catch (err) {
            setLoading(false);
            ToastAndroid.show('Dừng khuyến mãi thất bại', ToastAndroid.SHORT);
        }
    }

    const handleApplyProductForCoupon = (addProductIdArray) => {
        try {
            const fetchAPI = async() => {
                for (const productId of addProductIdArray) {
                    const response = await applyProductForCoupon({couponId, productId});
                    if (response?.code == 1) {
                        ToastAndroid.show('Lỗi khi thêm sản phẩm vào khuyến mãi', ToastAndroid.SHORT);
                        return;
                    }
                }
            }
            fetchAPI();
        } catch(e) {
            ToastAndroid.show('Lỗi khi thêm sản phẩm vào khuyến mãi', ToastAndroid.SHORT);
        }
    }

    const handleUnapplyProductForCoupon = (couponOfProductIdArray) => {
        try {
            const fetchAPI = async() => {
                for (const couponOfProductId of couponOfProductIdArray) {
                    const response = await unapplyProductForCoupon({ couponOfProductId });
                    if (response?.code == 1) {
                        ToastAndroid.show('Lỗi khi xóa sản phẩm ra khuyến mãi', ToastAndroid.SHORT);
                        return;
                    }
                }
            }
            fetchAPI();
        } catch(e) {
            ToastAndroid.show('Lỗi khi xóa sản phẩm ra khuyến mãi', ToastAndroid.SHORT);
        }
    }

    const handleUpdate = () => {
        try{
            const fetchAPI = async() => {
                setLoading(true);
                let response;
                if (proviso == 'BY_PRODUCT') {
                    const addProductIdArray = productIds.filter(x => !productIdsInit.includes(x));
                    const deleteProductIdArray = productIdsInit.filter(x => !productIds.includes(x));
                    //apply
                    if (addProductIdArray.length > 0) {
                        handleApplyProductForCoupon(addProductIdArray);
                    }
                    //unapply
                    if (deleteProductIdArray.length > 0) {
                        let couponOfProductIdArray = [];
                        deleteProductIdArray.forEach((productId) => {
                            const item = couponApplyProductDTOs.find(x => x.productId == productId);
                            if (item) {
                                couponOfProductIdArray.push(item.id);
                            }
                        })
                        handleUnapplyProductForCoupon(couponOfProductIdArray);
                    }
                    response = await updateCoupon({
                        couponId,
                        couponCode, 
                        description: saleName,
                        limitUse, 
                        startDate, 
                        endDate, 
                        type: type == 1 ? 'NUMBER' : 'PERCENT', 
                        proviso: 'BY_PRODUCT', 
                        value: value.toString().includes('.') ? value.toString().replace(/\./g, ""): value, 
                        provisoMinPrice: null,
                        provisoMinAmount
                    })
                } else {
                    response = await updateCoupon({
                        couponId,
                        couponCode, 
                        description: saleName,
                        limitUse, 
                        startDate, 
                        endDate, 
                        type: type == 1 ? 'NUMBER' : 'PERCENT', 
                        proviso: 'BY_RECEIPT', 
                        value: value.toString().includes('.') ? value.toString().replace(/\./g, ""): value, 
                        provisoMinPrice,
                        provisoMinAmount: null
                    })
                }
                if (response?.code == 0) {
                    ToastAndroid.show('Lưu mã khuyến mãi thành công', ToastAndroid.SHORT);
                    navigation.navigate('SaleManagement');
                } else 
                {
                    ToastAndroid.show('Lưu mã khuyến mãi thất bại', ToastAndroid.SHORT);
                }
                setLoading(false);
            }
            fetchAPI();
        } catch(e) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tạo mã khuyến mãi', ToastAndroid.SHORT);
        }     
    }

    const renderItem = item => {
        return (
          <View style={styles.item}>
            <Text style={styles.selectedTextStyle}>{item.label}</Text>
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          </View>
        );
    };

    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.header}>
                    <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Chi tiết khuyến mãi</Text>             
                </View>
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <KeyboardAwareScrollView
                style={{ flex: 1, marginBottom: 15 }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ marginTop: 10 }}>
                    <TextInputCustom 
                        label='Tên khuyến mãi'
                        placeholder='Ví dụ: Mua X tặng Y'
                        value={saleName} 
                        onChange={(text) => setSaleName(text)} 
                        required={true}
                    />
                </View>
                <View style={{ marginVertical: 20 }}>
                    <TextInputCustom 
                        label='Mã khuyến mãi'
                        placeholder='Ví dụ: MUAXTANGY'
                        value={couponCode} 
                        onChange={(text) => setCouponCode(text)}
                        autoCapitalizeCharacters={true} 
                        required={true}
                    />
                </View>
                <View style={styles.horizontalLine}></View>
                <Text style={{ marginVertical: 10, fontWeight: 'bold', color: '#3a3a3a'}}>Chi tiết khuyến mãi</Text>
                {proviso == 'BY_PRODUCT' ?
                    <View>
                        <Text style={{ color: '#383838', marginBottom: 5 }}>• Mua sản phẩm bất kì thuộc danh mục</Text>
                        <View style={{ marginLeft: 15 }}>
                            <MultiSelect
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={categories}
                                labelField="label"
                                valueField="value"
                                placeholder="Chọn danh mục"
                                value={productIds}
                                search
                                searchPlaceholder="Tìm kiếm..."
                                onChange={item => {
                                    setProductIds(item);
                                }}
                                renderLeftIcon={() => (
                                    <AntDesign
                                        style={styles.icon}
                                        color="black"
                                        name="Safety"
                                        size={20}
                                    />
                                )}
                                renderItem={renderItem}
                                renderSelectedItem={(item, unSelect) => (
                                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                                        <View style={styles.selectedStyle}>
                                            <Text style={styles.textSelectedStyle}>{item.label}</Text>
                                            <AntDesign color="black" name="delete" size={17} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                            {productIds?.length > 0 && 
                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
                                    <Image source={require('../../assets/images/tick.png')} style={{ width: 17, height: 17, objectFit: 'contain', marginTop: 12 }}/>
                                    <Text style={styles.text_amount_category}>{productIds?.length} danh mục được chọn</Text>
                                </View>
                            }
                        </View>
                        {type == 1 ? 
                            <Text style={{ color: '#383838', marginBottom: 10 }}>{`• Mua từ ${provisoMinAmount} sản phẩm, mỗi sản phẩm giảm ${value}`}</Text>
                            :<Text style={{ color: '#383838', marginBottom: 10 }}>{`• Mua từ ${provisoMinAmount} sản phẩm, mỗi sản phẩm giảm ${value}%`}</Text> 
                        }
                    </View> 
                    : 
                        (type == 1 ? <Text style={{ color: '#383838', marginBottom: 5 }}>{`Giảm ${value} đơn tối thiểu ${provisoMinPrice}`}</Text>
                        : <Text style={{ color: '#383838', marginBottom: 5 }}>{`Giảm ${value}% đơn tối thiểu ${provisoMinPrice}`}</Text>)  
                }
                <View style={styles.horizontalLine} />
                <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#3a3a3a'}}>Hiệu suất</Text>
                <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10}}>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        <Image source={require('../../assets/images/shopping_bag.png')} style={{ width: 20, height: 20, objectFit: 'contain', tintColor: '#2083c5' }}/>
                        <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5, marginRight: 50}}>
                            <Text style={{ color: '#767676', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Lượt đổi</Text>
                            <Text style={{ color: '#000000', fontWeight: 'bold' }}>{`${usedAmount}/${limitUse}`}</Text>
                        </View> 
                    </View> 

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Image source={require('../../assets/images/marriage.png')} style={{ width: 18, height: 18, objectFit: 'contain' }}/>
                        <View style={{ display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 5, marginRight: 50}}>
                            <Text style={{ color: '#767676', fontWeight: 'bold', fontSize: 11, marginBottom: 10 }}>Trạng thái</Text>
                            <Text style={{ color: '#000000', fontWeight: 'bold' }}>{activated ? 'Đang chạy' : 'Đã dừng'}</Text>
                        </View> 
                    </View>

                </View>
                <View style={styles.horizontalLine} />
                <Text style={{ marginTop: 20, fontWeight: 'bold', color: '#3a3a3a'}}>Cài đặt nâng cao</Text>
                <View style={[styles.display, { alignItems: 'flex-end' }]}>
                    <Text style={{ color: '#5a5a5a' }}>Ngày bắt đầu</Text>
                    <View style={{ width: '40%'}}>
                        <TextInputCustom
                            required={false}
                            value={startDate} 
                            onPressIn={() => setDatePickerStartVisible(true)}
                            rightIcon={<TextInput.Icon icon="calendar-month-outline" style={{ marginRight: -30}}/>}
                        />
                    </View>
                    <DateTimePicker
                        isVisible={datePickerStartVisible}
                        mode="date"
                        onConfirm={handleConfirmDatePicker}
                        onCancel={hideDatePicker}
                    />
                </View>

                <View style={[styles.display, { alignItems: 'flex-end',  }]}>
                    <Text style={{  color: '#5a5a5a'}}>Ngày kết thúc</Text>
                    <View style={{ width: '40%'}}>
                        <TextInputCustom
                            required={false}
                            value={endDate} 
                            onPressIn={() => setDatePickerEndVisible(true)}
                            rightIcon={<TextInput.Icon icon="calendar-month-outline" style={{ marginRight: -30}}/>}
                        />
                    </View>
                    <DateTimePicker
                        isVisible={datePickerEndVisible}
                        mode="date"
                        onConfirm={handleConfirmDatePicker}
                        onCancel={hideDatePicker}
                    />
                </View>
                <View style={[styles.display, { alignItems: 'flex-end',  }]}>
                    <Text style={{ color: '#5a5a5a'}}>Số lượng khuyến mãi</Text>
                    <View style={{ width: '40%'}}>
                        <TextInputCustom
                            required={false}
                            value={limitUse} 
                            onChange={(text) => setLimitUse(text)}
                            keyboardType='numeric'
                            customStyle={{ textAlign: 'right'}}
                        />
                    </View>
                </View> 
            </KeyboardAwareScrollView>
            {activated && 
            <TwoButtonBottom 
                titleLeft="Dừng" 
                titleRight="Cập nhật" 
                buttonColorLeft='transparent' 
                textColorLeft='#8b8b8b' 
                buttonColorRight='#15803D' 
                borderColorLeft='#8b8b8b' 
                onBack={() => setShowModal(true)}
                onPressRight={handleUpdate}
            />}
            {showModal && 
                <ModalConfirmation 
                    title="Dừng khuyến mãi?" 
                    question="Bạn có chắc rằng dừng khuyến mãi?"
                    textYes="Dừng"
                    textNo="Quay lại"
                    onPressCancel={() => setShowModal(false)}
                    onPressConfirm={handleCancelCoupon}
                />
            }
            {loading && <LoadingSpinner />}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    step: {
        height: 5,
        width: '49%',
        borderRadius: 15
    },
    dropdown: {
        height: 35,
        borderBottomWidth: 1,
        borderBottomColor: '#d0d0d0',
        backgroundColor: "#ffffff"
    },
    selectedTextStyle: {
        fontSize: 13,
        color: "#3a3a3a"
    },
    button_type: {
        backgroundColor: '#e2e5ea',
        borderRadius: 7,
        height: 36,
        display: 'flex',
        flexDirection: 'row',
        padding: 2,
    },
    text_button_type: {
        fontSize: 12,
        textAlign: 'center',
        paddingVertical: 6,
        borderRadius: 7,
        color: '#15803D',
        backgroundColor: '#ffffff'
    },
    horizontalLine: {
        height: 7,
        backgroundColor: '#f4f4f4', 
        marginBottom: 5,
    },
    verticalLine: {
        width: 1, 
        height: 30, 
        backgroundColor: '#e2e5ea', 
        alignSelf: 'center',
      },
    dropdown: {
        marginVertical: 10,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 7,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        borderColor: '#e2e5ea',
        borderWidth: 1
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#888888'
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: '#c8cacd'
    },
    inputSearchStyle: {
        height: 40,
    },
    icon: {
        marginRight: 10,
        color: '#888888'
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
    },
    text_amount_category: {
        color: '#15803D',
        marginTop: 10,
        fontSize: 12,
        fontWeight: '500'
    }
})

export default CouponDetail;