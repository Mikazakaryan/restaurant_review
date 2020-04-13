import React from 'react';
import { TextField, Button } from '@material-ui/core';

const CreateNewRestaurant = ({
  name,
  classes,
  handleCreate,
  handleNameChange,
}) => (
  <div className={classes.ownerCreateWrapper}>
    <TextField
      value={name}
      variant="outlined"
      label="Restaurant Name"
      onChange={handleNameChange}
    />
    <Button color="primary" variant="contained" onClick={handleCreate}>
      Create
    </Button>
  </div>
);

export default CreateNewRestaurant;
