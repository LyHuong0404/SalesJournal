import { View, StyleSheet, Text, Image, TouchableOpacity , ToastAndroid, ScrollView} from "react-native";
import { useNavigation, useRoute  } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import TextInputPrice from '../../components/TextInputPrice';
import { addCoupon } from "../../actions/couponActions";
import TextInputCustom from "../../components/TextInputCustom";
import TwoButtonBottom from "../../components/TwoButtonBottom";
import { filterCategory } from "../../actions/seller/categoryActions";
import LoadingSpinner from "../../components/LoadingSpinner";


const buttonType = [
    {id: 1, label: 'VNĐ'},
    {id: 2, label: '%'},
]

function CreateCoupon() {
    const route = useRoute();
    const navigation = useNavigation();
    const [provisoMinAmount, setProvisoMinAmount] = useState('');
    const [step, setStep] = useState(1);
    const [saleName, setSaleName] = useState('');
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
            if (proviso == "BY_PRODUCT") {
                fetchApi();
            }
        } catch(err) {
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, []);

    
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
    
    const handleBack = () => {
        if (step == 2) {
            setStep(1);
        } else {
            navigation.goBack();
        }
    }

    const handleContinues = () => {
        if (step == 1) {
            setStep(2);
        } else {
            try{
                const fetchAPI = async() => {
                    setLoading(true);
                    let response;
                    if(proviso == 'BY_PRODUCT') {
                        response = await addCoupon({
                            couponCode, 
                            description: saleName,
                            limitUse: limitUse.toString().includes('.') ? limitUse.toString().replace(/\./g, ""): limitUse, 
                            startDate, 
                            endDate, 
                            type: type == 1 ? 'NUMBER' : 'PERCENT', 
                            proviso, 
                            value: value.toString().includes('.') ? value.toString().replace(/\./g, ""): value, 
                            provisoMinPrice: null,
                            provisoMinAmount,
                            productIds
                        })
                    } else {
                        response = await addCoupon({
                            couponCode, 
                            description: saleName,
                            limitUse: limitUse.toString().includes('.') ? limitUse.toString().replace(/\./g, ""): limitUse, 
                            startDate, 
                            endDate, 
                            type: type == 1 ? 'NUMBER' : 'PERCENT', 
                            proviso, 
                            value: value.toString().includes('.') ? value.toString().replace(/\./g, ""): value, 
                            provisoMinPrice: provisoMinPrice.toString().includes('.') ? provisoMinPrice.toString().replace(/\./g, ""): provisoMinPrice,
                            provisoMinAmount: null,
                            productIds: null
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
    }
    
    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        </View>
      );
    };

    const handleChangeValue = (text) => {
        const numericValue = parseInt(text);
        if (type == 2 && numericValue > 100) {
          return;
        }
        setValue(text);
    };

    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.header}>
                    <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                    <View style={[styles.display, { flex: 1, marginLeft: 5 }]}>
                        <View style={[styles.step, { backgroundColor: '#15803D'}]}></View>
                        <View style={[styles.step, { backgroundColor: step == 2? '#15803D' : 'white'}]}></View>
                    </View>   
                </View>
            </TouchableOpacity>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                {step == 1 ? 
                    (<>
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#15803D' }}>Điều kiện </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>khuyến mãi</Text>
                        </View>
                        {proviso == 'BY_PRODUCT' ?
                            <>
                                <Text style={{ fontWeight: '500', color: '#6f6f6f', marginTop: 20, marginBottom: 5 }}>Khuyến mãi các sản phẩm</Text>
                                <MultiSelect
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={categories}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Chọn sản phẩm"
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
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Image source={require('../../assets/images/tick.png')} style={{ width: 17, height: 17, objectFit: 'contain', marginTop: 12 }}/>
                                        <Text style={styles.text_amount_category}>{productIds?.length} sản phẩm được chọn</Text>
                                    </View>
                                }
                                <View style={{ width: '52%', marginTop: 20 }}>
                                    <TextInputCustom 
                                        label='Số lượng mua tối thiểu' 
                                        placeholder='0'
                                        value={provisoMinAmount} 
                                        onChange={(text) => setProvisoMinAmount(text)} 
                                        required={true}
                                        keyboardType='numeric'
                                    />
                                </View>
                            </> : 
                            <View style={{ width: '65%', marginTop: 20 }}>
                                <TextInputPrice 
                                    label='Giá trị đơn hàng tối thiểu' 
                                    value={provisoMinPrice} 
                                    onChange={(text) => setProvisoMinPrice(text)} 
                                    required={true}
                                    keyboardType='numeric'
                                />
                            </View>
                        }
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginTop: 20  }}>
                            <View style={{ width: '52%' }}>
                                <TextInputCustom 
                                    label='Tổng khuyến mãi'
                                    placeholder='0'
                                    keyboardType='numeric'
                                    value={value} 
                                    onChange={handleChangeValue} 
                                    required={true}
                                />
                            </View>
                            <View style={[styles.button_type, { flex: 0.35 }]}>
                                {buttonType.map((button, index) => 
                                    <View key={index} style={{ flex: 1 }}>
                                        <Text style={[
                                            styles.text_button_type,
                                            {color: type == button.id ? '#15803D' : '#727171',
                                            backgroundColor: type == button.id ? '#ffffff' : 'transparent',}]}
                                            onPress={() => {
                                                setType(button.id)
                                                setValue('');
                                                }
                                            }>
                                        {button.label}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </>) : 
                    (<>
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10  }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#15803D' }}>Thông tin </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>khuyến mãi</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <TextInputCustom 
                                label='Tên khuyến mãi'
                                placeholder='Ví dụ: Mua X tặng Y'
                                value={saleName} 
                                onChange={(text) => setSaleName(text)} 
                                required={true}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <TextInputCustom 
                                label='Mã khuyến mãi'
                                placeholder='Ví dụ: MUAXTANGY'
                                value={couponCode} 
                                onChange={(text) => setCouponCode(text)}
                                autoCapitalizeCharacters={true} 
                                required={true}
                            />
                        </View>
                        <Text style={{ marginTop: 20, fontWeight: 'bold', color: '#3a3a3a'}}>Cài đặt nâng cao</Text>
                        <View style={[styles.display, { alignItems: 'flex-end',  }]}>
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
                            <Text style={{ color: '#5a5a5a'}}>Ngày kết thúc</Text>
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
                    </>)
                }
            </KeyboardAwareScrollView>
            <TwoButtonBottom 
                titleLeft="Quay lại" 
                titleRight="Tiếp tục" 
                buttonColorLeft='transparent' 
                textColorLeft='#8b8b8b' 
                buttonColorRight='#15803D' 
                borderColorLeft='#8b8b8b' 
                onBack={handleBack}
                onPressRight={handleContinues}
            />
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
        alignItems: 'center'
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
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        borderRadius: 7
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

export default CreateCoupon;