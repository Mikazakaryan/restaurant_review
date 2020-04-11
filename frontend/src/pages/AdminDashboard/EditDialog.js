import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const EditDialog = ({ data, type, onEdit, closeDialog, isDialogOpen }) => {
  const [state, setState] = useState({ ...data.attributes });

  const onChangeHandler = key => ({ target: { value } }) =>
    setState({
      ...state,
      [key]: value,
    });

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogTitle id="form-dialog-title" disableTypography={false}>
        {`Edit ${type} id:${data.id}`}
      </DialogTitle>
      <DialogContent>
        {Object.keys(data.attributes)
          .filter(
            key =>
              key !== 'owner' &&
              key !== 'active' &&
              key !== 'ratedTo' &&
              key !== 'repliedTo',
          )
          .map(key => (
            <div key={key}>
              <Typography variant="h5">{key}</Typography>
              <TextField value={state[key]} onChange={onChangeHandler(key)} />
            </div>
          ))}
        <Button
          color="primary"
          variant="contained"
          onClick={onEdit({ type, id: data.id, state })}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
