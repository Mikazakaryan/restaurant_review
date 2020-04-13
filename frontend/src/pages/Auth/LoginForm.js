import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import Form from 'config/Form';
import Loader from 'components/Loader';
import Input from 'components/FormInput';

const LoginForm = ({ classes, onLogin, isLoginLoading }) => {
  const [state, setState] = useState({
    password: '',
    username: '',
  });

  const onEditField = (field, value) => setState({ ...state, [field]: value });

  const onSubmit = () => onLogin(state);

  return (
    <Form className={classes.form} id="log-in-form" onSubmit={onSubmit}>
      <Typography className={classes.header}>
        Login with existing user
      </Typography>
      <Input
        autoFocus
        id="username"
        label="Username"
        value={state.username}
        autoComplete="username"
        className={classes.input}
        validators={['required']}
        errorMessages={['This field is required']}
        onChange={event => onEditField('username', event.target.value)}
      />
      <Input
        type="password"
        label="Password"
        value={state.password}
        validators={['required']}
        className={classes.input}
        autoComplete="current-password"
        errorMessages={['This field is required']}
        onChange={event => onEditField('password', event.target.value)}
      />
      <button type="submit" className={classes.input}>
        <Typography className={classes.buttonText} variant="subtitle1">
          {isLoginLoading ? <Loader color="black" /> : 'Continue'}
        </Typography>
      </button>
    </Form>
  );
};

export default LoginForm;
