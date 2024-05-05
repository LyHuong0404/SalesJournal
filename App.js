import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import App from './index';

function ReduxApp(){
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    );
}

export default ReduxApp