import { useState, useEffect, useRef, memo } from "react";
import { View, StyleSheet, Image, Dimensions, Text, ScrollView, ToastAndroid, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { DataTable } from "react-native-paper";
import { BarChart } from 'react-native-gifted-charts';
import { format } from 'date-fns';
import RBSheet from "react-native-raw-bottom-sheet";

import { filterReceipt, filterReport, revenueOfProduct } from "../../actions/seller/receiptActions";
import ModalCalendar from "../Modal/ModalCalendar";
import { convertTimeStamp, setDateFormat } from "../../utils/helper";
import LoadingSpinner from "../LoadingSpinner";

const screenWidth = Dimensions.get('window').width;

const chartOptions = [
    { label: 'Doanh thu', value: '1' },
    { label: 'Hóa đơn', value: '2' },
];
const revenueOptions = [
    { label: 'Danh mục', value: '1' },
    { label: 'Hóa đơn', value: '2' },
    { label: 'Ngày', value: '3' },
];

function SellTab() {
    const refRBSheet = useRef();
    const [chartOption, setChartOption] = useState('1');
    const [revenueOption, setRevenueOption] = useState('1');
    const [fromDate, setFromDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'));
    const [data, setData] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [revenueByTable, setRevenueByTable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);
    const [buttonTimeType, setButtonTimeType] = useState('homnay'); 
    
    useEffect(() => {
        try{
            const fetchAPI = async()=> {
                setLoading(true)
                const response = await filterReport({ fromDate, toDate});
                if (response) {
                    let newArray = [];
                    setRevenue(response);
                    if (chartOption == '1') {
                        response.map((data) => {
                            let time = convertTimeStamp(data.date, 'dd-MM');
                            newArray.push({ value: parseFloat(data.totalSaleMoney), label: time })
                        })
                    } else if (chartOption == '2') {
                        response.map((data) => {
                            let time = convertTimeStamp(data.date, 'dd-MM');
                            newArray.push({ value: data.totalReceipt, label: time })
                        })
                    }
                    setData(newArray);
                    setLoading(false);

                } else {
                    setLoading(false);
                    ToastAndroid.show('Lỗi tải không thành công', ToastAndroid.SHORT);
                }
            }
            fetchAPI();
        } catch(e){
            ToastAndroid.show('Lỗi tải không thành công', ToastAndroid.SHORT);
        }
    }, [fromDate, toDate, chartOption])
    
    useEffect(() => {
        try{
            const fetchAPI = async()=> {
                setLoadingTable(true);
                if (revenueOption == "1") {
                    const response = await revenueOfProduct({ pageIndex: 0, pageSize: 1000, fromDate, toDate});
                    if (response) {
                        setRevenueByTable(response);
                    } else {
                        ToastAndroid.show('Lỗi tải không thành công', ToastAndroid.SHORT);
                    }
                }
                else if (revenueOption == "2") {
                    const response = await filterReceipt({ pageIndex: 0, pageSize: 1000, fromDate, toDate, paymentMethod: null});
                    if (response) {
                        setRevenueByTable(response.data.content);
                    } else {
                        ToastAndroid.show('Lỗi tải không thành công', ToastAndroid.SHORT);
                    }
                }
                else if (revenueOption == "3") {
                    const response = await filterReport({ fromDate, toDate});
                    if (response) {
                        setRevenueByTable(response);
                    } else {
                        ToastAndroid.show('Lỗi tải không thành công', ToastAndroid.SHORT);
                    }
                }
                setLoadingTable(false);
            }
            fetchAPI();
        } catch(e){
            setLoadingTable(false);
            ToastAndroid.show('Lỗi tải không thành công', ToastAndroid.SHORT);
        }
    }, [fromDate, toDate, revenueOption])


    const handleChangeTime = (data) => {
        const time = setDateFormat(data.buttonType, data.startDate, data.endDate);
    
        setFromDate(time[0]);
        setToDate(time[1]);
        setButtonTimeType(data.buttonType);
        refRBSheet.current?.close();
    };

    const handleSettingAgain = () => {
        setButtonTimeType('homnay');
        setStartDate(format(new Date(Date.now()), 'yyyy-MM-dd'));
        setEndDate(format(new Date(Date.now()), 'yyyy-MM-dd'));
        refRBSheet.current?.close();    
    }

    const labelOfTime = () => {
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
                return 'Tùy chỉnh: ' + format(fromDate, 'dd-MM-yyyy') + ' đến ' + format(toDate, 'dd-MM-yyyy');
            default:
                break;
        }
    }

    const handeTotalSaleMoney = () => {
        let amount = 0;
        if (buttonTimeType == 'homnay') {
            if (revenue.length > 0) {
                if (revenue[1]?.totalSaleMoney) {
                    amount = revenue[1]?.totalSaleMoney?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
                } else if (revenue[0]?.totalSaleMoney) {
                    amount = revenue[0]?.totalSaleMoney?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
                }
            }
        } else {
            amount = revenue?.reduce((total, item) => {
                return total + (item?.totalSaleMoney);
            }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')
        }
        return amount;
    }
console.log('xqwe  ', revenueByTable)
    return (  
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={[styles.display, { marginBottom: 15 }]}>
                            <TouchableOpacity onPress={() => refRBSheet.current?.open()}>
                                <Image source={require('../../assets/images/calendar.png')} style={styles.icon_calender}/>
                            </TouchableOpacity>
                            <View style={styles.button_action_container}>   
                                <Text style={styles.text_action}>
                                    {labelOfTime()}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.box_container}>
                            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e2e5ea' }}>
                                <Text style={{ fontWeight: '500', fontSize: 11, color: '#abaaaa', textAlign: 'center'}}>Doanh thu</Text>                
                                <Text style={styles.text_price}>{handeTotalSaleMoney()}</Text>                   
                            </View>  
                            <View style={[styles.display_gap, { justifyContent: 'space-around' }]}>
                                <View>
                                    <Text style={styles.text}>Hóa đơn</Text>
                                    <Text style={{ color: '#3a3a3a'}}>
                                        {revenue?.reduce((total, item) => {
                                            return total + item?.totalReceipt;
                                        }, 0)}
                                    </Text>
                                </View>
                                <View style={styles.verticalLine}></View>
                                {/* <View>
                                    <Text style={styles.text}>Khách hàng</Text>
                                    <Text style={{ color: '#3a3a3a'}}>20</Text>
                                </View>
                                <View style={styles.verticalLine}></View> */}
                                <View>
                                    <Text style={styles.text}>Sản phẩm</Text>
                                    <Text style={{ color: '#3a3a3a'}}>
                                        {revenue?.reduce((total, item) => {
                                            return total + item?.totalSaleAmount;
                                        }, 0)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.display, { alignItems: 'center', marginVertical: 15 }]}>
                            <Text style={{ color: '#6f6f6f', fontWeight: '500', marginRight: 10 }}>Biểu đồ xu hướng theo<Text style={{ color: '#3a3a3a' }}> Doanh thu</Text></Text>
                            {/* <Dropdown
                                style={styles.dropdown}
                                selectedTextStyle={styles.selectedTextStyle}
                                itemTextStyle={{ fontSize: 12 }}
                                // activeColor
                                iconColor='#2083c5'
                                data={chartOptions}
                                labelField="label"
                                valueField="value"
                                value={chartOption}
                                onChange={(item) => {
                                    setChartOption(item.value);
                                }}
                            /> */}
                        </View>   
                    </View>
                    <View style={{ marginHorizontal: 15 }}>
                        <BarChart
                            data={data}
                            width={screenWidth-70}
                            height={300}
                            noOfSections={6}
                            scrollAnimation={true}
                            barWidth={10}
                            barBorderRadius={10}
                            // labelWidth={60}
                            yAxisTextStyle={{ color: '#abaaaa', fontSize: 11 }}
                            xAxisLabelTextStyle={{ color: '#abaaaa', fontSize: 7 }}
                            frontColor={'#2083c5'}
                            rotateLabel={true}
                            xAxisLabelsHeight={30}
                            xAxisType='dashed'
                            xAxisThickness={2}
                            xAxisColor={'#cb870b'}
                            yAxisColor={'white'}
                            spacing={25}
                        />
                    </View>
                    <View style={[styles.display, { alignItems: 'center', paddingVertical: 15, backgroundColor: '#f1f3f5' }]}>
                        <Text style={{ color: '#6f6f6f', fontWeight: '500', marginRight: 10, paddingLeft: 15 }}>Doanh thu theo</Text>
                        <Dropdown
                            style={styles.dropdown}
                            selectedTextStyle={styles.selectedTextStyle}
                            itemTextStyle={{ fontSize: 12 }}
                            // activeColor
                            iconColor='#2083c5'
                            data={revenueOptions}
                            labelField="label"
                            valueField="value"
                            value={revenueOption}
                            onChange={(item) => {
                                setRevenueOption(item.value);
                            }}
                        />
                    </View> 
                    {revenueByTable.length > 0 ?
                        <DataTable>
                            {loadingTable && <LoadingSpinner />}  
                            {revenueOption == "1" && 
                                <>
                                    <DataTable.Header>
                                        <DataTable.Title style={styles.cell}><Text style={styles.header_table}>DANH MỤC</Text></DataTable.Title>
                                        <DataTable.Title style={[styles.cell, {paddingRight: 10 }]} numeric><Text style={styles.header_table}>SL</Text></DataTable.Title>
                                        <DataTable.Title style={styles.cell} numeric><Text style={styles.header_table}>D.THU</Text></DataTable.Title>
                                    </DataTable.Header>
                                    {revenueByTable.map((product, index) => 
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell style={styles.cell}><Text style={styles.cell_text_number}>{product?.product?.name}</Text></DataTable.Cell>
                                            <DataTable.Cell style={[styles.cell, {paddingRight: 10 }]} numeric><Text style={[styles.cell_text_number, { marginRight: 10 }]}>{product.product.totalSaleAmount}</Text></DataTable.Cell>
                                            <DataTable.Cell numeric><Text style={styles.cell_text_number}>{`${product.product.totalSaleMoney}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    )}
                                </>             
                            }
                            {revenueOption == "2" && 
                            <>
                                <DataTable.Header>
                                    <DataTable.Title style={styles.cell}><Text style={styles.header_table}>ĐƠN HÀNG</Text></DataTable.Title>
                                    <DataTable.Title style={styles.cell} numeric><Text style={styles.header_table}>D.THU</Text></DataTable.Title>
                                </DataTable.Header>
                                {revenueByTable.map((item, index) => 
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell style={styles.cell}>
                                            <View style={{ paddingVertical: 8 }}>
                                                <Text style={styles.cell_text_number}>{`DH${item.id}`}</Text>
                                                <Text style={{ color: '#9a9a9a', fontSize: 11 }}>{`${item.createdAtTime} ${convertTimeStamp(item.createdAtDate, 'dd/MM/yyyy')}`}</Text>
                                            </View>
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric><Text style={styles.cell_text_number}>{`${item?.totalSalePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text></DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            </>}
                            {revenueOption == "3" && 
                            <>
                                <DataTable.Header>
                                    <DataTable.Title style={styles.cell}><Text style={styles.header_table}>NGÀY</Text></DataTable.Title>
                                    <DataTable.Title style={[styles.cell, {paddingRight: 10 }]} numeric><Text style={styles.header_table}>ĐƠN</Text></DataTable.Title>
                                    <DataTable.Title style={[styles.cell, {paddingRight: 10 }]} numeric><Text style={styles.header_table}>KHÁCH</Text></DataTable.Title>
                                    <DataTable.Title numeric><Text style={styles.header_table}>D.THU</Text></DataTable.Title>
                                </DataTable.Header>
                                {revenueByTable.map((item, index) => 
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell style={styles.cell}><Text style={styles.cell_text_number}>{convertTimeStamp(item.date, 'dd/MM/yyyy')}</Text></DataTable.Cell>
                                        <DataTable.Cell style={[styles.cell, {paddingRight: 10 }]} numeric><Text style={[styles.cell_text_number, { marginRight: 10 }]}>{item.totalReceipt}</Text></DataTable.Cell>
                                        <DataTable.Cell style={[styles.cell, {paddingRight: 10 }]} numeric><Text style={[styles.cell_text_number, { marginRight: 10 }]}>2</Text></DataTable.Cell>
                                        <DataTable.Cell numeric><Text style={styles.cell_text_number}>{`${item.totalSaleMoney}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text></DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            </>}
                        </DataTable>
                        : 
                        <View style={styles.no_content}>
                            <Image source={require('../../assets/images/notes.png')} style={{ width: 80, height: 80, objectFit: 'contain', marginVertical: 10 }}/>
                            <Text style={{ color: '#767676' }}>Bạn chưa có báo cáo nào được ghi lại.</Text>
                        </View>
                    }
                        
                        
                    <View style={{ height: 40, backgroundColor: '#f1f3f5'}}></View>
                </View>
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
                    valueTimeFrom={fromDate} 
                    valueTimeTo={toDate}
                    buttonTimeType={buttonTimeType}
                    onSelected={handleChangeTime}
                    handleSettingAgain={handleSettingAgain} />
            </RBSheet>
            </ScrollView>
            {loading && <LoadingSpinner />}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cell: {
        borderRightWidth: 0.8,
        borderColor: '#e2e5ea',
    },
    cell_text_number: {
        color: '#585858',
        fontSize: 12
    },
    header_table: {
        fontWeight: '500'
    },
    text_cell: {
        color: '#9a9a9a',
        fontSize: 13
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
    },
    header: {
        backgroundColor: '#f1f3f5',
        height: 'auto',
        padding: 15,
    },
    icon_calender: {
        width: 28,
        height: 28,
        objectFit: 'contain',
        tintColor: '#3a3a3a',
        marginRight: 10,
        alignSelf: 'center',
    },
    button_action_container: {
        backgroundColor: '#e2e5ea',
        borderRadius: 7,
        // width: '75%',
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        padding: 3,
        justifyContent: 'space-around',
    },
    text_action: {
        fontSize: 10,
        backgroundColor: 'red',
        textAlign: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 7,
        color: '#15803D',
        backgroundColor: 'white'
    },
    box_container: {
        paddingHorizontal: 20,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 7,
        width: screenWidth - 30,
        height: 'auto',
    },
    text_price: {
        textAlign: 'center',
        fontSize: 24,
        color:'#15803D',
        fontWeight: '500',
        marginTop: 5
    },
    display_gap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    text: {
        color: "#abaaaa",
        fontSize: 11,
        marginBottom: 5
    },
    verticalLine: {
        alignSelf: 'center',
        width: 1,
        height: '50%',
        backgroundColor: '#e2e5ea'
    },
    dropdown: {
        width: '37%',
        height: 35,
        borderColor: '#2083c5',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        backgroundColor: "#ffffff"
    },
    selectedTextStyle: {
        fontSize: 13,
        color: "#2083c5"
    },
    no_content: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    }
})

export default memo(SellTab);