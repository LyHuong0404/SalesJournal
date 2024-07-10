import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { Checkbox } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";

import ButtonCustom from "../../components/ButtonCustom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { returnReceipt } from "../../actions/seller/receiptActions";

function ReturnOrderConfirmation() {
    const route = useRoute();
    const navigation = useNavigation();
    const [status, setStatus] = useState(false);
    const [receipt, setReceipt] = useState(route.params?.receipt || {});
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        if (result.every((item) => item.status)) {
            if (!status) setStatus(true);
        } else {
            if (status) setStatus(false);
        }
    }, [result])
    
    useEffect(() => {
        if (receipt?.receiptDetails?.length > 0 && receipt?.receiptDetails) {
            let newFormat = [];
            receipt.receiptDetails.map((item) => {
                newFormat.push({ status: false, productCode: item.productCode, amount: 0, price: 0 });
            })
            setResult(newFormat);
        }
    }, [])

    const handleIncrease = (index) => {
        if ((result[index].amount + 1) > receipt.receiptDetails[index].numberProduct) {
            return;
        } else {
            if ((result[index].amount + 1) == receipt.receiptDetails[index].numberProduct) {
                setResult(prev => {
                    const newArray = [...prev];
                    newArray[index] = {...newArray[index], status: true, amount: newArray[index].amount + 1, price: (receipt.receiptDetails[index].actualPrice * (newArray[index].amount + 1)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')};
                    return newArray;               
                });
            } else {
                setResult(prev => {
                    const newArray = [...prev];
                    newArray[index] = {...newArray[index], amount: newArray[index].amount + 1, price: (receipt.receiptDetails[index].actualPrice * (newArray[index].amount + 1)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')};
                    return newArray;               
                });
            }
        }
    }

    const handleDecrease = (index) => {
        if ((result[index].amount - 1) < 0) {
            return;
        } else {
            if ((result[index].amount - 1) < receipt.receiptDetails[index].numberProduct) {
                setResult(prev => {
                    const newArray = [...prev];
                    newArray[index] = {...newArray[index], status: false, amount: newArray[index].amount - 1, price: (receipt.receiptDetails[index].actualPrice * (newArray[index].amount - 1)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')};
                    return newArray;               
                });
            } else {
                setResult(prev => {
                    const newArray = [...prev];
                    newArray[index] = {...newArray[index], amount: newArray[index].amount - 1, price: (receipt.receiptDetails[index].actualPrice * (newArray[index].amount - 1)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')};
                    return newArray;               
                });
            }
        }
    }

    const handleCalTotalMoney = useCallback(() => {
        if (result.length > 0) {
            const rs = result?.reduce((total, item) => {
                return total + parseInt(item?.price?.toString().replace('.', '').trim());
            }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
            return rs;
        } else return 0;
    }, [result])

    const handleTotalAmountReturn = useCallback(() => {
        const rs = result?.reduce((total, item) => {
            return total + item.amount;
        }, 0);
        return rs;
    }, [result])

    const handleChooseAProduct = (index) => {
        if (!result[index].status) {
            setResult(prev => {
                const newArray = [...prev];
                newArray[index] = {...newArray[index], status: true, amount: receipt.receiptDetails[index].numberProduct, price: (receipt.receiptDetails[index].actualPrice * (receipt.receiptDetails[index].numberProduct)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')};
                return newArray;               
            });
        } else {
            setResult(prev => {
                const newArray = [...prev];
                newArray[index] = {...newArray[index], status: false, amount: 0, price: 0 }; 
                return newArray;               
            });
        }
    }

    const handleChooseAll = () => {
        if (!status) {
            if (receipt?.receiptDetails?.length > 0 && receipt?.receiptDetails) {
                let newFormat = [];
                receipt.receiptDetails.map((item) => {
                    newFormat.push({ status: true, productCode: item.productCode, amount: item.numberProduct, price: (item.actualPrice * item.numberProduct).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '') });
                })
                setResult(newFormat);
            }
        } else {
            if (receipt?.receiptDetails?.length > 0 && receipt?.receiptDetails) {
                let newFormat = [];
                receipt.receiptDetails.map((item) => {
                    newFormat.push({ status: false, productCode: item.productCode, amount: 0, price: 0 });
                })
                setResult(newFormat);
            }
        }
        setStatus(!status);
    }

    const submitForm = () => {
            try{      
                let newArray = [];
                result.map((item) => {
                    if (item.amount > 0) {
                        newArray.push({ productCode: item.productCode, amount: item.amount });
                    }
                })
                const fetchAPI = async() => {
                    setLoading(true);
                    const response = await returnReceipt({ receiptId: receipt.id, productInfos: newArray });
                    if (response?.code == 0) {
                        navigation.navigate('ReturnOrderDetail', { receipt: response.data })
                    } else {
                        ToastAndroid.show('Lỗi khi trả hàng', ToastAndroid.SHORT);
                    }
                    setLoading(false);
                }
                fetchAPI();
        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi trả hàng', ToastAndroid.SHORT);
        }
    }

    return ( 
        <View style={styles.container}>          
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
                <Image source={require('../../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Xác nhận trả hàng</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.horizontalLine} />
                <TouchableOpacity style={[styles.display, { paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#ffffff'}]} onPress={handleChooseAll}>
                    <Checkbox color='#15803D' uncheckedColor='#a6a6a6' status={status ? 'checked' : 'unchecked'}/>
                    <Text>Chọn tất cả</Text>
                </TouchableOpacity>
                <View style={styles.horizontalLine} />
                {receipt?.receiptDetails?.length > 0 && 
                    receipt?.receiptDetails.map((item, index) => 
                        <View key={index} style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 15, backgroundColor: '#ffffff', minHeight: 90, borderBottomWidth: 0.8, borderColor: '#e5e5ea' }}>
                            <Checkbox color='#15803D' uncheckedColor='#a6a6a6' status={result[index]?.status ? 'checked' : 'unchecked'} onPress={() => handleChooseAProduct(index)} />
                            <Image source={{ uri: item?.productAvatar }} style={{ width: 70, height: '100%', marginRight: 10, objectFit: 'cover', borderRadius: 10 }} />
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                <Text style={{ color: '#252424' }}>{item.productName}: {item.productCode}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                    <View style={{ display: 'flex', width: '38%', flexDirection: 'row', paddingVertical: 2, alignItems: 'center', justifyContent: 'space-around', borderColor: '#e5e5e2', borderWidth: 1, borderRadius: 5 }}>
                                        <TouchableOpacity onPress={() => handleDecrease(index)}>
                                            <Image source={require('../../assets/images/minus.png')} style={{ width: 10, height: 15, objectFit: 'contain', tintColor: '#7a7a7a' }}/>
                                        </TouchableOpacity>
                                        <Text style={{ fontWeight: '500', paddingHorizontal: 2, fontSize: 12 }}>{result[index]?.amount} / {item.numberProduct}</Text>
                                        <TouchableOpacity onPress={() => handleIncrease(index)}>
                                            <Image source={require('../../assets/images/plus.png')} style={{ width: 12, height: 15, objectFit: 'contain', tintColor: '#15803D' }}/>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ color: '#d81f1f', fontWeight: '500' }}>{result[index]?.price}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
                
                <View style={styles.horizontalLine} />
                <View style={{ padding: 15, backgroundColor: '#ffffff' }}>
                    <View style={[styles.display, { justifyContent: 'space-between' }]}>
                        <Text style={{ color: '#858585' }}>Tổng {handleTotalAmountReturn()} sản phẩm</Text>  
                    </View> 
                    <View style={[styles.display, { justifyContent: 'space-between', marginTop: 15 }]}>
                        <Text style={{ color: '#858585', fontWeight: '500' }}>Tổng tiền trả khách</Text>  
                        <Text style={{ color: '#d81f1f', fontWeight: '500' }}>{handleCalTotalMoney()}</Text>
                    </View>        
                </View>
                <View style={styles.horizontalLine} />
            </View>
            <View style={{ paddingHorizontal: 15, backgroundColor: '#ffffff' }}>
                <ButtonCustom 
                    disabled={result.every((item) => item.amount == 0)}
                    title="Hoàn trả"
                    onPress={submitForm}
                >
                </ButtonCustom>
            </View>
            {loading && <LoadingSpinner />}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8fa',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        alignItems: 'center',
        borderBottomColor: '#e2e5ea',
        backgroundColor: '#ffffff'
    },
    horizontalLine: { 
        height: 10, 
        backgroundColor: '#f8f8fa' 
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#3a3a3a'
    }
});

export default ReturnOrderConfirmation;