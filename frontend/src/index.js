import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import App from './App';
import store from './store';

const Layout = () => (
  <ThemeProvider>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>
);

ReactDOM.render(<Layout />, document.getElementById('root'));
