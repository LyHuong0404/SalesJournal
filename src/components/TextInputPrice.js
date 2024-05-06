import { TextInputMask } from 'react-native-masked-text';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

function TextInputPrice({ value, onChange, required, label, customStyle }) {
    const [focus, setFocus] = useState(false);


    return (  
        <View>
            {label && <Text style={{ color: focus ? '#15803D' : '#7a7a7a', fontWeight: '600' }}>{label}
                {required && <Text style={{color: 'red' }}> *</Text>}
            </Text>}

            <TextInputMask
                placeholder="0.000" 
                type={'money'}
                options={{
                    precision: 0,
                    separator: ',',
                    delimiter: '.',
                    unit: '',
                    suffixUnit: ''
                }}
                value={value} 
                onChangeText={onChange}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                style={[styles.primary, customStyle]}
            />

            <View style={focus ? styles.lineFocus : styles.line}/>
        </View>
    );
}

const styles = StyleSheet.create({
    lineFocus:{
        width: '100%', 
        height: 2, 
        backgroundColor: '#15803D'
    },
    line: {
        width: '100%', 
        height: 1, 
        backgroundColor: '#abaaaa'
    },
    primary: {
        marginVertical: 8
    }
})

export default TextInputPrice;