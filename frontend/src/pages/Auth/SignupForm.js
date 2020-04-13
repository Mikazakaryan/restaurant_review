import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import Form from 'config/Form';
import Loader from 'components/Loader';
import Select from 'components/Select';
import Input from 'components/FormInput';

const ROLES = [
  {
    title: 'User',
    value: 'user',
  },
  {
    title: 'Owner',
    value: 'owner',
  },
  {
    title: 'Admin',
    value: 'admin',
  },
];

const SignupForm = ({ classes, onSignup, isSignupLoading }) => {
  const [state, setState] = useState({
    role: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const onEditField = (field, value) => setState({ ...state, [field]: value });

  const onSubmit = () =>
    onSignup({
      role: state.role,
      username: state.username,
      password: state.password,
    });

  return (
    <Form className={classes.form} onSubmit={onSubmit}>
      <Typography className={classes.header}>Signup a new user</Typography>
      <Input
        label="User Name"
        value={state.username}
        className={classes.input}
        validators={[
          'required',
          'minStringLength:4',
          'maxStringLength:20',
          'isAlphaNumeric',
        ]}
        errorMessages={[
          'This field is required',
          'Username should contain at least 4 characters',
          'Username should contain at most 20 characters',
          'Username should be only alphanumeric',
        ]}
        onChange={event => onEditField('username', event.target.value)}
      />
      <Select
        label="Role"
        options={ROLES}
        value={state.role}
        className={classes.input}
        validators={['required']}
        errorMessages={['This field is required']}
        onChange={event => onEditField('role', event.target.value)}
      />
      <Input
        key="password"
        type="password"
        label="Password"
        value={state.password}
        className={classes.input}
        validators={['required', 'isPasswordStrong']}
        onChange={event => onEditField('password', event.target.value)}
        errorMessages={[
          'This field is required',
          'Password must contain at least 6 characters including at least 1 uppercase letter, 1 number and 1 symbol',
        ]}
      />
      <Input
        type="password"
        label="Confirm Password"
        className={classes.input}
        value={state.confirmPassword}
        validators={['isPasswordMatch', 'required']}
        onChange={event => onEditField('confirmPassword', event.target.value)}
        errorMessages={[
          'Password and Confirm Password should be the same',
          'This field is required',
        ]}
      />
      <button type="submit" className={classes.input}>
        <Typography className={classes.buttonText} variant="subtitle1">
          {isSignupLoading ? <Loader color="black" /> : 'Create and Continue'}
        </Typography>
      </button>
    </Form>
  );
};

export default SignupForm;
