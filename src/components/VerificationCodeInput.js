import React, { memo, useRef } from 'react';
import { View } from 'react-native';
import { TextInput, DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15803D', 
      underlineColor: '#888888', 
    },
};

function VerificationCodeInput({ length, onCodeChange }) {
  const refs = Array.from({ length }, () => useRef());

  const handleCodeChange = (text, index) => {
    onCodeChange(index, text);

    if (text.length === 1 && index < length - 1) {
      refs[index + 1].current.focus();
    }
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', alignItems: 'flex-start', width: '80%' }}>
        {Array.from({ length }, (_, index) => (
            <TextInput
                theme={theme}
                key={index}
                ref={refs[index]}
                value={onCodeChange[index]}
                style={{ width: '14%', height: 40, backgroundColor: 'transparent', paddingHorizontal: 0, fontSize: 16 }}
                onChangeText={(text) => handleCodeChange(text, index)}
            />
        ))}
    </View>
  );
};

export default memo(VerificationCodeInput);

