import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { TextValidator } from 'react-material-ui-form-validator';

import styles from './styles';

export default withStyles(
  styles,
)(
  ({
    classes,
    type = 'text',
    margin = 'dense',
    variant = 'filled',
    ...rest
  }) => (
    <TextValidator
      type={type}
      margin={margin}
      variant={variant}
      InputProps={{ classes }}
      {...rest}
    />
  ),
);
