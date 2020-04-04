import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/styles/withStyles";
import { SelectValidator } from "react-material-ui-form-validator";

import styles from "./styles";

export default withStyles(styles)(
  ({
    classes,
    options,
    type = "text",
    margin = "dense",
    variant = "filled",
    ...rest
  }) => (
    <SelectValidator
      type={type}
      margin={margin}
      variant={variant}
      InputProps={{ classes }}
      {...rest}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.title}
        </MenuItem>
      ))}
    </SelectValidator>
  )
);
