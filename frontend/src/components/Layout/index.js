import Cookies from 'universal-cookie';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import store from 'store';
import theme from 'utils/theme';

const Layout = ({ children }) => {
  const cookies = new Cookies();
  const cookie = cookies.get('sid');

  const { user } = store.getState().user;
  const { fetchUser } = store.dispatch.user;

  useEffect(() => {
    if (!user.id && cookie && cookie !== 'null') fetchUser();
  }, [user, cookie, fetchUser]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        {children}
      </Provider>
    </ThemeProvider>
  );
};

export default Layout;
