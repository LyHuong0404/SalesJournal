import { StyleSheet, View, Text } from "react-native";
import { TextInput, DefaultTheme } from "react-native-paper";
import { memo, useState } from "react";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#abaaaa', 
    },
};

function TextInputCustom({ label, rightIcon, required, placeholder, value, onChange, customStyle, keyboardType, onPressIn, autoCapitalizeCharacters, disabled }) {
    const [focus, setFocus] = useState(false);

    return ( 
        <View>
            <Text style={{ color: focus ? '#15803D' : '#7a7a7a', fontWeight: '600' }}>{label}
                {required && <Text style={{color: 'red' }}> *</Text>}
            </Text>

            <TextInput
                right={rightIcon}
                theme={theme}
                placeholder={placeholder}
                placeholderTextColor='#abaaaa'
                style={[styles.input_style, customStyle]}
                value={value}
                onChangeText={onChange}
                underlineColor="#abaaaa"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                keyboardType={keyboardType}
                onPressIn={onPressIn}
                autoCapitalize={autoCapitalizeCharacters ? "characters" : "none"}
                disabled={disabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input_style:{
        height: 40, 
        backgroundColor: 'transparent', 
        fontSize: 14, 
        paddingHorizontal: 0, 
        paddingBottom: 5
    },
})

export default memo(TextInputCustom);