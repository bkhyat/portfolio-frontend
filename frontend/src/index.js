import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './rtk/store'
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    </HashRouter>,
    document.getElementById('root')
);
reportWebVitals();
