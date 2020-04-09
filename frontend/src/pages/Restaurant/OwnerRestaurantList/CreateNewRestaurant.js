import React from 'react';
import { TextField, Button } from '@material-ui/core';

const CreateNewRestaurant = ({ classes, name, setName, createRestaurant }) => (
  <div className={classes.ownerCreateWrapper}>
    <TextField
      value={name}
      label="Restaurant Name"
      variant="outlined"
      onChange={({ target: { value } }) => setName(value)}
    />
    <Button
      color="primary"
      variant="contained"
      onClick={() => createRestaurant({ name })}
    >
      Create
    </Button>
  </div>
);

export default CreateNewRestaurant;
