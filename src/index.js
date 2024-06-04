import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { store } from './redux/Store.js'
import { Provider } from 'react-redux' 
import swDev from './swDev'
const root = ReactDOM.createRoot(document.getElementById('root')) 
root.render(
    <React.StrictMode>
        <Provider store={store}>  
            <App />
        </Provider>
    </React.StrictMode>
);
swDev()