import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import {
  Switch,
  Redirect,
  Route as RouterRoute,
  BrowserRouter as Router,
} from 'react-router-dom';

import store from './store';
import * as Pages from './pages';
import theme from './utils/theme';
import localStorage from './utils/localStorage';

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      {children}
    </Provider>
  </ThemeProvider>
);

const ProtectedRoute = ({ path, component: Component }) => {
  const user = localStorage.getObject('user');

  return (
    <RouterRoute
      exact
      path={path}
      render={({ location }) =>
        user.id ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
};

const Route = ({ path, component: Component }) => (
  <RouterRoute exact path={path}>
    <Component />
  </RouterRoute>
);

const RouterWrapper = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Pages.Auth} />
        <ProtectedRoute exact path="/restaurant" component={Pages.Restaurant} />
      </Switch>
    </Layout>
  </Router>
);

ReactDOM.render(<RouterWrapper />, document.getElementById('root'));
