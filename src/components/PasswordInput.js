import { useState, forwardRef, useImperativeHandle } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, DefaultTheme, HelperText } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#888888', 
    },
};

const PasswordInput = forwardRef(({ label, value, isHide, onPress, onChange, checkInput }, ref) => {
    const [focus, setFocus] = useState(false);

    const hasErrors = () => {
        let errors = [];
    
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            errors.push('Mật khẩu phải có ít nhất một kí tự đặc biệt.');
            return errors;
        }
    
        if (!/\d/.test(value)) {
            errors.push('Mật khẩu phải có ít nhất một chữ số.');
            return errors;
        }
    
        if (!/[A-Z]/.test(value)) {
            errors.push('Mật khẩu phải có ít nhất một kí tự viết hoa.');
            return errors;
        }
    
        if (!/[a-z]/.test(value)) {
            errors.push('Mật khẩu phải có ít nhất một kí tự thường.');
            return errors;
        }

        if (value.length < 8) {
            errors.push('Mật khẩu phải có ít nhất 8 kí tự.');
            return errors;
        }
    };

    useImperativeHandle(ref, () => ({
        hasErrors: () => hasErrors(),
    }));

    return ( 
        <View style={{ marginVertical: 20 }}>
            <Text style={{ color: focus ? '#15803D' : '#7a7a7a', fontWeight: '600', display: label ? 'flex' : 'none' }}>{label}<Text style={{color: 'red'}}> *</Text></Text>
            <TextInput
                secureTextEntry={isHide}
                theme={theme}
                style={styles.input_style}
                placeholderTextColor='#abaaaa'
                right={<TextInput.Icon icon={isHide ? "eye-off" : "eye"} onPress={onPress}/>}
                value={value}
                onChangeText={onChange}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />

            { value?.trim() != '' && checkInput ? 
                hasErrors()?.map((error, index) => (
                    <HelperText type="error" key={index} visible={true} style={{ marginLeft: -10 }}>
                        {error}
                    </HelperText>
                )) : null 
            }
        </View>
    );
});

const styles = StyleSheet.create({
    input_style:{
        height: 40, 
        backgroundColor: 'transparent', 
        paddingHorizontal: 0, 
        fontSize: 14, 
        paddingVertical: 5
    },
})

export default PasswordInput;