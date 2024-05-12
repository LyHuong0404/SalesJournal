import { View, StyleSheet, Text, Image, TouchableOpacity  } from "react-native";
import { useState } from "react";
import { Button, TextInput, DefaultTheme } from "react-native-paper";
import { format } from 'date-fns';
import DateTimePicker from "react-native-modal-datetime-picker";
import TwoButtonBottom from "../TwoButtonBottom";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#abaaaa', 
    },
};


const buttonTimeArray = [
    { label: 'Hôm nay', value: 'homnay'},
    { label: 'Hôm qua', value: 'homqua' },
    { label: 'Tuần này', value: 'tuannay' },
    { label: 'Tuần trước', value: 'tuantruoc' },
    { label: 'Tháng này', value: 'thangnay' },
    { label: 'Tháng trước', value: 'thangtruoc' },
];

function ModalCalendar({ valueTimeFrom, valueTimeTo, buttonTimeType, onSelected, handleSettingAgain }) {
    const [active, setActive] = useState(buttonTimeType);
    const [startDate, setStartDate] = useState(valueTimeFrom);   
    const [endDate, setEndDate] = useState(valueTimeTo);   
    const [datePickerStartVisible, setDatePickerStartVisible] = useState(false);
    const [datePickerEndVisible, setDatePickerEndVisible] = useState(false);

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
        setActive('none');
        hideDatePicker();
    };

    const handleChangeButtonTime = (button) => {
        setActive(button.value);
        onSelected({buttonType: button.value, startDate: startDate, endDate: endDate});
    }

    const handleChangeTimeRange = () => {
        onSelected({buttonType: 'none', startDate: startDate, endDate: endDate});
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontWeight: '600', textAlign: 'center', flex: 1 }}>Bộ lọc</Text>
                <TouchableOpacity style={{ flex: 0.5}}>
                    <Image source={require('../../assets/images/close.png')} style={{ width: 15, height: 15 }}/>
                </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: '600', marginVertical: 10 }}>Thời gian</Text>
            <View style={styles.button_container}>
                {buttonTimeArray.map((button, index) => 
                    <Button 
                        key={index}
                        mode="outlined"  
                        style={[styles.button_calendar, { borderColor: active == button.value ? '#2083c5' : '#cecfd2'}]}
                        textColor={ active == button.value ? '#2083c5' : '#949494'} 
                        buttonColor={ active == button.value ? '#e3f0f8' : '#f4f2f2'} 
                        onPress={() => handleChangeButtonTime(button)}
                    >
                        {button.label}
                    </Button>   
                )} 
            </View>
            <Text style={{ fontWeight: '500', marginTop: 10, color: '#949494' }}>Hoặc tùy chỉnh thời gian</Text>
            <View style={{ marginVertical: 20 }}>
                <View style={styles.display}>
                    <Text style={{ color: '#5a5a5a', marginRight: 30 }}>Từ</Text>
                    <TextInput
                        theme={theme}
                        value={startDate} 
                        onPressIn={() => setDatePickerStartVisible(true)}
                        style={styles.text_input_day}
                        underlineColor='#e2e5ea'
                        textColor="#656565"
                        rightIcon={<TextInput.Icon icon="chevron-down" />}
                    />
                    
                    <DateTimePicker
                        isVisible={datePickerStartVisible}
                        mode="date"
                        onConfirm={handleConfirmDatePicker}
                        onCancel={hideDatePicker}
                    />
                </View>
                
                <View style={[styles.display, { marginVertical: 20 }]}>
                    <Text style={{ color: '#5a5a5a', marginRight: 20 }}>Đến</Text>
                    <TextInput
                        theme={theme}
                        value={endDate} 
                        onPressIn={() => setDatePickerEndVisible(true)}
                        style={styles.text_input_day}
                        underlineColor='#e2e5ea'
                        textColor="#656565"
                        rightIcon={<TextInput.Icon icon="chevron-down" />}
                    />
                    
                    <DateTimePicker
                        isVisible={datePickerEndVisible}
                        mode="date"
                        onConfirm={handleConfirmDatePicker}
                        onCancel={hideDatePicker}
                    />
                </View>
            </View>
            <TwoButtonBottom 
                titleLeft="Thiết lập lại" 
                titleRight="Áp dụng" 
                buttonColorLeft='transparent' 
                textColorLeft='#8b8b8b' 
                buttonColorRight='#15803D' 
                borderColorLeft='#8b8b8b' 
                onPressRight={handleChangeTimeRange}
                onBack={handleSettingAgain}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      marginHorizontal: 15
    },
    display: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e5ea',
        paddingBottom: 10
    },
    button_container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    button_calendar: {
        width: '48%',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1
    },
    text_input_day: {
        flex: 1,
        paddingVertical: 0,
        height: 35,
        backgroundColor: 'transparent',
        fontSize: 13,
        paddingHorizontal: 0
    }
    
  });
export default ModalCalendar;