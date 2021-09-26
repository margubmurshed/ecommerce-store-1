import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Store from './Redux/Store';
import ThemeProvider from './MaterialTheme';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <ThemeProvider>
        <Provider store={Store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ThemeProvider>
    , document.getElementById('root'));
reportWebVitals();
