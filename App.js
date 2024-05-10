import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import App from './index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function ReduxApp(){
    return(
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <App/>
            </GestureHandlerRootView>
        </Provider>
    );
}

export default ReduxApp