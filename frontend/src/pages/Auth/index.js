import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const cookies = new Cookies();

const Login = ({ onLogin, onSignup, isLoginLoading, isSignupLoading }) => {
  const classes = useStyles();
  const history = useHistory();

  if (cookies.get('sid') && cookies.get('sid') !== 'null')
    history.push('/restaurant');

  return (
    <div className={classes.root}>
      <div className={clsx(classes.part, classes.border)}>
        <SignupForm {...{ classes, onSignup, isSignupLoading }} />
      </div>
      <div className={classes.part}>
        <LoginForm {...{ classes, onLogin, isLoginLoading }} />
      </div>
    </div>
  );
};

const mapState = ({
  loading: {
    effects: {
      user: { login: isLoginLoading, signup: isSignupLoading },
    },
  },
}) => ({ isLoginLoading, isSignupLoading });

const mapDispatch = ({ user: { login, signup } }) => ({
  onLogin: login,
  onSignup: signup,
});

export default connect(mapState, mapDispatch)(Login);
