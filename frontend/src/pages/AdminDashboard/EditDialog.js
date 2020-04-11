import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const EditDialog = ({
  data,
  type,
  onEdit,
  classes,
  closeDialog,
  isDialogOpen,
}) => {
  const [state, setState] = useState({ ...data.attributes });

  const onChangeHandler = key => ({ target: { value } }) =>
    setState({
      ...state,
      [key]: value,
    });

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogTitle disableTypography={false}>
        <Typography variant="h4"> {`Edit ${type} id:${data.id}`}</Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {Object.keys(data.attributes)
          .filter(
            key =>
              key !== 'owner' &&
              key !== 'active' &&
              key !== 'ratedTo' &&
              key !== 'repliedTo',
          )
          .map(key => (
            <div key={key} className={classes.fieldWrapper}>
              <Typography variant="h5">{key}</Typography>
              <TextField
                value={state[key]}
                onChange={onChangeHandler(key)}
                className={classes.textInput}
              />
            </div>
          ))}
        <div className={classes.buttonWrapper}>
          <Button
            color="primary"
            variant="contained"
            onClick={onEdit({ type, id: data.id, state })}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
