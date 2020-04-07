import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const UserRateDialog = ({
  classes,
  userKey,
  readOnly,
  feedback,
  setFeedback,
  closeDialog,
  isDialogOpen,
  rateRestaurant,
  restaurantToRate,
}) => {
  const handleFeedbackChange = field => value =>
    setFeedback({ ...feedback, [field]: value });

  const submitRate = () => {
    rateRestaurant({ feedback, restaurantId: restaurantToRate.id });
    closeDialog();
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      classes={{
        paper: classes.paper,
      }}
    >
      {restaurantToRate.id ? (
        <>
          <DialogTitle id="form-dialog-title" disableTypography={false}>
            {`Rate ${restaurantToRate.attributes.name}`}
          </DialogTitle>
          <DialogContent className={classes.contentWrapper}>
            <div>
              <div className={classes.dateAndRating}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    readOnly={readOnly}
                    label="Date"
                    disableToolbar
                    margin="normal"
                    variant="inline"
                    format="MM/dd/yyyy"
                    onChange={handleFeedbackChange('date')}
                    value={
                      readOnly
                        ? restaurantToRate.attributes.date
                        : feedback.date
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Rating
                  readOnly={readOnly}
                  name="Rating"
                  value={
                    readOnly
                      ? restaurantToRate.attributes.rating
                      : feedback.rating
                  }
                  onChange={({ target: { value } }) =>
                    handleFeedbackChange('rating')(value)
                  }
                />
              </div>
              {readOnly ? (
                <Typography>{restaurantToRate.attributes.comment}</Typography>
              ) : (
                <TextField
                  rows="4"
                  multiline
                  rowsMax="10"
                  label="comment"
                  value={feedback.comment}
                  className={classes.commentField}
                  id="standard-multiline-flexible"
                  onChange={({ target: { value } }) =>
                    handleFeedbackChange('comment')(value)
                  }
                />
              )}
            </div>
            {!readOnly && (
              <div className={classes.buttonWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={submitRate}
                >
                  Submit
                </Button>
              </div>
            )}
          </DialogContent>
        </>
      ) : null}
    </Dialog>
  );
};

export default UserRateDialog;
