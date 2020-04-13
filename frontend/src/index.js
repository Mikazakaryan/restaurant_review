import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import {
  Switch,
  Redirect,
  Route as RouterRoute,
  BrowserRouter as Router,
} from 'react-router-dom';

import * as Pages from 'pages';
import Header from 'components/Header';
import Layout from 'components/Layout';

const cookies = new Cookies();

const ProtectedRoute = ({ path, component: Component }) => {
  const cookie = cookies.get('sid');

  return (
    <>
      <Header />
      <RouterRoute
        exact
        path={path}
        render={({ location }) =>
          cookie && cookie !== 'null' ? (
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
    </>
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
        <ProtectedRoute
          exact
          path="/admin-dashboard"
          component={Pages.AdminDashboard}
        />
      </Switch>
    </Layout>
  </Router>
);

ReactDOM.render(<RouterWrapper />, document.getElementById('root'));
