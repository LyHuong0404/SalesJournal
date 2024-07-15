import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { Button, ProgressBar } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { format } from 'date-fns';
import moment from 'moment';
import { useNavigation } from "@react-navigation/native";

import ModalCalendar from "../Modal/ModalCalendar";
import { convertTimeStamp, setDateFormat } from "../../utils/helper";
import { filterProduct } from "../../actions/seller/productActions";
import LoadingSpinner from "../LoadingSpinner";
import { revenueOfProduct } from "../../actions/seller/receiptActions";

const buttonAction = [
    {id: 1, label: 'Tổng quan'},
    {id: 2, label: 'Phân tích'}
];

function WarehouseTab() {
    const navigation = useNavigation();
    const refRBSheet = useRef();
    const [buttonType, setButtonType] = useState(1);
    const [active, setActive] = useState(1);
    const [buttonAnalysis, setButtonAnalysis] = useState(1);
    const [startDate, setStartDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));   
    const [endDate, setEndDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd')); 
    const [buttonTimeType, setButtonTimeType] = useState('homnay'); 
    const [products, setProducts] = useState([]);
    const [productToCount, setProductToCount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [revenue, setRevenue] = useState({totalImportProductMoney: 0, totalExportProductMoney: 0});


    useEffect(() => {
        try{      
            const getAllProduct = async() => {
                setLoading(true);
                const response = await filterProduct({ pageIndex: 0, pageSize: 1000, keySearch: null, productId: null, orderBy: null, fromDate: null, toDate: null });
                
                if(response?.content && response?.content.length > 0) {
                    setProductToCount(response?.content);
                }
                setLoading(false);
            }
            getAllProduct();
        } catch(e) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, [])

    useEffect(() => {
        try{      
            const getAllProduct = async() => {
                setLoading(true);
                const response = await filterProduct({ pageIndex: 0, pageSize: 1000, keySearch: null, productId: null, orderBy: null, fromDate: null, toDate: null});
                if (response?.content) {
                    let filteredContent = response.content;
                    if (active === 2) filteredContent = filteredContent.filter(item => item.stockAmount <= 20);
                    else if (active === 3) filteredContent = filteredContent.filter(item => item.stockAmount > 0);
                    else if (active === 4) filteredContent = filteredContent.filter(item => moment(item.expireAt).isBefore(moment()));
                    setProducts(filteredContent);
                }
                setLoading(false);
            }
            getAllProduct();
        } catch(e) {
            setLoading(false);
            ToastAndroid.show('Lỗi khi tải sản phẩm', ToastAndroid.SHORT);
        }
    }, [active])

    useEffect(() => {
        try{
            const fetchAPI = async()=> {
                setLoading(true);
                let totalImportProductMoney = 0;
                let totalExportProductMoney = 0;
                const response = await filterProduct({ pageIndex: 0, pageSize: 1000, keySearch: null, productId: null, orderBy: null, fromDate: startDate, toDate: endDate });
                if (response) {
                    totalImportProductMoney = response?.content?.reduce((total, item) => {
                        return total + (item?.product?.totalImportMoney)
                    }, 0);
                } else {
                    ToastAndroid.show('Lỗi tải không thành công', ToastAndroid.SHORT);
                }

                const result = await revenueOfProduct({ pageIndex: 0, pageSize: 1000, fromDate: startDate, toDate: endDate});
                if (result) {
                    totalExportProductMoney = result.reduce((total, item) => {
                        return total + (item.totalSpentMoney);
                    }, 0);
                    
                } else {
                    ToastAndroid.show('Lỗi tải không thành công', ToastAndroid.SHORT);
                }
                if (totalImportProductMoney > 0 || totalExportProductMoney > 0) {
                    setRevenue({totalImportProductMoney, totalExportProductMoney})
                }
                setLoading(false);
            }
            fetchAPI();
        } catch(e){
            setLoading(false);
            ToastAndroid.show('Lỗi tải không thành công', ToastAndroid.SHORT);
        }
    }, [startDate, endDate])

      
    const handleChangeTime = (data) => {
        const time = setDateFormat(data.buttonType, data.startDate, data.endDate);    
        setStartDate(time[0]);
        setEndDate(time[1]);
        setButtonTimeType(data.buttonType);
        refRBSheet.current?.close();
    };

    const handleSettingAgain = () => {
        setButtonTimeType('homnay');
        setStartDate(format(new Date(Date.now()), 'yyyy-MM-dd'));
        setEndDate(format(new Date(Date.now()), 'yyyy-MM-dd'));
        refRBSheet.current?.close();    
    }

    const labelOfTime = useCallback(() => {
        switch(buttonTimeType) {
            case 'homnay':
                return 'Hôm nay';
            case 'homqua':
                return 'Hôm qua';
            case 'tuannay':
                return 'Tuần này';
            case 'tuantruoc':
                return 'Tuần trước';
            case 'thangnay':
                return 'Tháng này';
            case 'thangtruoc':
                return 'Tháng trước';
            case 'none':
                return format(startDate, 'dd-MM-yyyy') + ' đến ' + format(endDate, 'dd-MM-yyyy');
            default:
                break;
        }
    }, [buttonTimeType])
    

    const labelOfOverview = useCallback(() => {
        switch (active) {
            case 1:
                return 'Tổng quan giá trị kho';
            case 2:
                return 'Tổng quan hàng sắp hết';
            case 3:
                return 'Tổng quan hàng còn bán';
            case 4:
                return 'Tổng quan hàng hết hạn';
            default: 
                return 'Tổng quan giá trị kho';
        }
    }, [active])

    const totalValue = useCallback(() => {
        const rs = productToCount?.reduce((total, item) => {
            return total + (item?.stockAmount * item.importPrice);
        }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return rs;
    }, [productToCount])

    return (  
        <View style={styles.container}>
            <View style={styles.button_action_container}>
                {buttonAction.map((button, index) => 
                    <View key={index} style={{ flex: 1 }}>
                        <Text style={[
                                styles.text_action,
                                {color: buttonType == button.id ? '#15803D' : '#727171',
                                backgroundColor: buttonType == button.id ? '#ffffff' : 'transparent',}]}
                                onPress={() => setButtonType(button.id)}>
                            {button.label}
                        </Text>
                    </View>
                )}
            </View>
            <ScrollView>
                {buttonType == 1 ? 
                    <>
                        <View style={styles.report_container}>
                            <View style={[styles.display, { marginBottom: 15 }]}>
                                <TouchableOpacity onPress={() => setActive(1)} 
                                                    style={[styles.item_report, 
                                                    { borderColor: active == 1 ? '#15803D' : 'transparent'},
                                                    { backgroundColor: active == 1 ? '#f2f8f4' : '#f6f7f8'}
                                                ]}>
                                    <Image source={require('../../assets/images/dollor.png')} style={styles.icon}/>
                                    <Text style={styles.text_bold}>
                                        {totalValue()}
                                    </Text>
                                    <Text style={styles.text_light}>Giá trị kho</Text>             
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setActive(2)} 
                                                style={[styles.item_report, 
                                                        { borderColor: active == 2 ? '#cb870b' : 'transparent'},
                                                        { backgroundColor: active == 2 ? '#FFFAFA' : '#f6f7f8'},]}>
                                    <Image source={require('../../assets/images/cubes.png')} style={styles.icon}/>
                                    <Text style={styles.text_bold}>{(productToCount.filter((item) => item.stockAmount <= 20)).length}</Text>
                                    <Text style={styles.text_light}>Sản phẩm sắp hết hàng</Text>             
                                </TouchableOpacity>
                            </View>
                            <View style={styles.display}>
                                <TouchableOpacity onPress={() => setActive(3)} 
                                                style={[styles.item_report, 
                                                        { borderColor: active == 3 ? '#2083c5' : 'transparent'},
                                                        { backgroundColor: active == 3 ? '#f8ffff' : '#f6f7f8'}
                                                    ]}>
                                    <Image source={require('../../assets/images/completed.png')} style={styles.icon}/>
                                    <Text style={styles.text_bold}>{(productToCount.filter((item) => item.stockAmount > 0)).length}</Text>
                                    <Text style={styles.text_light}>Sản phẩm còn bán</Text>             
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setActive(4)} 
                                                style={[styles.item_report, 
                                                { borderColor: active == 4 ? '#d61d1d' : 'transparent'},
                                                { backgroundColor: active == 4 ? '#fff2f2' : '#f6f7f8'}
                                            ]}>
                                    <Image source={require('../../assets/images/rejected.png')} style={styles.icon}/>
                                    <Text style={styles.text_bold}>{productToCount.filter(item => moment(item.expireAt).isBefore(moment())).length}</Text>
                                    <Text style={styles.text_light}>Sản phẩm hết hạn</Text>             
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.report_container, { marginVertical: 10, minHeight: 350 }]}>
                            <Text style={styles.text_bold}>{labelOfOverview()}</Text>
                            {products.length == 0 && 
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                    <Image source={require('../../assets/images/noresults.png')} style={{ width: 80, height: 80, objectFit: 'contain'}}/>
                                    <Text style={[styles.text_light, { fontSize: 13 }]}>Chưa có sản phẩm tồn kho</Text>
                                    <Text style={[styles.text_light, { fontSize: 13 }]}>Nhập tồn kho ngay!</Text>
                                    <Button 
                                        mode="outlined" 
                                        textColor="#298bcb" 
                                        buttonColor='transparent'
                                        onPress={() => navigation.navigate('ImportProduct')} 
                                        style={[styles.button, { borderColor: '#2083c5' }]}>
                                        Nhập hàng ngay
                                    </Button>
                                </View>
                            }
                            {products.length > 0 &&
                                <View style={[styles.display, { marginVertical: 5 }]}>
                                    <Text style={styles.text_light}>Sản phẩm</Text>
                                    <Text style={styles.text_light}>Giá trị</Text>
                                </View>
                            }
                            {products.map((product, index) => 
                                <View style={styles.row} key={index}>
                                    <Text style={styles.order}>{index + 1}</Text>
                                    <View style={styles.product_container}>
                                        <Image source={{ uri: product?.product?.avatar }} style={styles.image_product}  />
                                        <View style={{ flex: 1 }}>
                                            <View style={[styles.display, { flex: 1 }]}>
                                                <Text style={{ fontWeight: '500', color: '#3a3a3a' }}>{product.name}</Text>
                                                <Text style={styles.product_price}>{`${product.importPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                            </View>
                                            <View style={[styles.display, { flex: 1, marginTop: 10, marginBottom: 5 }]}>
                                                <View style={styles.row}>
                                                    <Image source={require('../../assets/images/product_light.png')} style={styles.icon}  />
                                                    <Text style={[styles.text_light, { fontSize: 13, marginHorizontal: 5 }]}>{`ID: ${product?.id}`}</Text>
                                                </View>
                                                <Text style={[styles.text_light, { fontSize: 12, fontWeight: 500 }]}>{`SL: ${product?.stockAmount}`}</Text>
                                            </View>
                                            {active == 4 && <Text style={[styles.text_light, { fontSize: 12, marginBottom: 5 }]}>HSD: {convertTimeStamp(product.expireAt, 'dd/MM')}</Text>}
                                            <ProgressBar progress={1 - (product?.stockAmount / product?.importAmount)} color='#15803D' style={{ borderRadius: 10, height: 6, marginBottom: 15  }}/>
                                        </View>
                                    </View>
                                </View>
                            )} 
                            {loading && <LoadingSpinner />}
                        </View>
                    </>
                    : 
                    <>
                        <View style={[styles.report_container, { paddingVertical: 0 }]}>
                            <TouchableOpacity style={styles.box_calender} onPress={() => refRBSheet.current?.open()}>
                                <Image source={require('../../assets/images/calendar_outline.png')} style={styles.icon_calendar}/>
                                <Text style={{ color: '#565555', fontWeight: '500', marginHorizontal: 8 }}>{labelOfTime()}</Text>
                                <Image source={require('../../assets/images/down_arrow.png')} style={{ width: 10, height: 10, marginTop: 5 }}/>
                            </TouchableOpacity>
                            <View style={styles.display}>
                                <TouchableOpacity style={[styles.item_report_container, { borderBottomColor: buttonAnalysis == 1 ? '#d61212' : 'transparent' }]} onPress={() => setButtonAnalysis(1)}>
                                    <Text style={{ color: '#565555', fontWeight: '500', marginBottom: 5 }}>Nhập kho</Text>
                                    <Text style={{ fontWeight: '500', color: buttonAnalysis == 1 ? '#6d1212' : '#7a7a7a'}}>{`${revenue?.totalImportProductMoney}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                </TouchableOpacity>
                                <View style={styles.verticalLine} />
                                <TouchableOpacity style={[styles.item_report_container, { borderBottomColor: buttonAnalysis == 2 ? '#15803D' : 'transparent' }]} onPress={() => setButtonAnalysis(2)}>
                                    <Text style={{ color: '#565555', fontWeight: '500', marginBottom: 5 }}>Xuất kho</Text>
                                    <Text style={{ fontWeight: '500', color: buttonAnalysis == 2 ? '#15803D' : '#7a7a7a'}}>{`${revenue?.totalExportProductMoney}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                </TouchableOpacity>
                            </View>          
                        </View>
                        <View style={[styles.report_container, { marginVertical: 10 }]}>
                            <Text style={styles.text_bold}>Tồn kho thay đổi</Text>
                            <Text style={{ color: '#15803D', fontWeight: 'bold', fontSize: 16 }}>
                                {`${revenue?.totalImportProductMoney - revenue?.totalExportProductMoney}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                            </Text>
                        </View>
                    </>
                }
            </ScrollView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: 
                    {
                        backgroundColor: "rgba(100, 100, 100, 0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: "grey"
                    },
                    container: {
                        height: 540
                    }
                }}
            >
                <ModalCalendar 
                    valueTimeFrom={startDate} 
                    valueTimeTo={endDate}
                    buttonTimeType={buttonTimeType}
                    onSelected={handleChangeTime}
                    handleSettingAgain={handleSettingAgain} />
            </RBSheet>
            {loading && <LoadingSpinner />}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#f0f0f0',
        paddingVertical: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    report_container: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'center',
        height: 'auto',
        width: '100%',
        padding: 15
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item_report: {
        backgroundColor: '#f6f7f8',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        minHeight: 100,
        borderRadius: 10,
        borderWidth: 1.5
    },
    button_action_container: {
        backgroundColor: '#e2e5ea',
        borderRadius: 7,
        width: '55%',
        height: 37,
        display: 'flex',
        flexDirection: 'row',
        padding: 2,
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginBottom: 10
    },
    text_action: {
        fontSize: 10,
        backgroundColor: 'red',
        textAlign: 'center',
        paddingVertical: 7,
        borderRadius: 7
    },
    order: {
        fontSize: 10,
        color: '#9a9a9a',
        marginHorizontal: 5, 
        justifyContent: 'center', 
        paddingVertical: 5
    },
    icon: {
        width: 24,
        height: 24,
        objectFit: 'contain'
    },
    icon_code: {
        width: 18,
        height: 18,
        objectFit: 'contain',
    },
    icon_calendar: {
        width: 15, 
        height: 15,
        tintColor: '#3a3a3a'
    },
    text_light: {
        fontSize: 10,
        color: '#9a9a9a'
    },
    text_bold: {
        fontWeight: '500',
        marginVertical: 5
    },
    image_product: {
        width: 50,
        height: 50,
        objectFit: 'contain',
        borderRadius: 15,
        marginHorizontal: 5
    },
    product_price: {
        fontWeight: '500', 
        color: '#f08800', 
    },
    product_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1, 
        borderBottomWidth: 1, 
        borderBottomColor: '#e2e5ea',
        marginBottom: 15
    },
    box_calender: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 10,
        borderBottomWidth: 0.8,
        borderBottomColor: '#e2e5ea'
    },
    item_report_container: {
        paddingVertical: 10,
        flex: 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent'
    },
    verticalLine: {
        width: 0.8, 
        height: 40, 
        backgroundColor: '#e2e5ea', 
        alignSelf: 'center'
    },
    button: {
        width: 'auto',
        borderWidth: 1,
        borderRadius: 7,
        marginVertical: 10, 
    }
})

export default memo(WarehouseTab);