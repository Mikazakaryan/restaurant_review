import React from 'react';
import get from 'lodash/get';
import { ValidatorForm } from 'react-material-ui-form-validator';

import owasp from '../../config/owasp';

const ValidatorFormComponent = props => {
  ValidatorForm.addValidationRule(
    'isPasswordMatch',
    value =>
      value ===
      props.children.find(elem => elem.key === 'password').props.value,
  );

  ValidatorForm.addValidationRule(
    'isPasswordStrong',
    value => !get(owasp.test(value), ['errors', 'length']),
  );

  ValidatorForm.addValidationRule('isAlphaNumeric', value =>
    new RegExp(/^[A-Za-z0-9_]+$/).test(value),
  );

  return <ValidatorForm {...props} />;
};

export default ValidatorFormComponent;
