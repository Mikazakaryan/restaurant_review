import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import localStorage from '../../utils/localStorage';

const Login = ({ onLogin, onSignup, isLoginLoading, isSignupLoading }) => {
  const classes = useStyles();
  const history = useHistory();
  const user = localStorage.getObject('user');
  if (user.id) history.push('/home');

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
