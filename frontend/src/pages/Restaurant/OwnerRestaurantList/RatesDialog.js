import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Dialog from '@material-ui/core/Dialog';
import { TextField, Button } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';

import Table from 'components/Table';

const RateDialog = ({ classes, onReply, closeDialog, open, rates }) => {
  const [replies, setReplies] = useState({});

  const setReply = (value, id) =>
    setReplies({
      ...replies,
      [id]: value,
    });

  const onReplyHandler = id => () => onReply({ id, text: replies[id] });

  const renderReply = rowData => {
    if (rowData.attributes.reply) return rowData.attributes.reply;

    return (
      <div className={classes.replyWrapper}>
        <TextField
          value={replies[rowData.id]}
          label="Reply"
          variant="outlined"
          onChange={({ target: { value } }) => setReply(value, rowData.id)}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={onReplyHandler(rowData.id)}
        >
          Create
        </Button>
      </div>
    );
  };

  const renderRating = rowData => (
    <Rating readOnly precision={0.1} value={rowData.attributes.rating} />
  );

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      classes={{
        paper: classes.paper,
      }}
    >
      <DialogContent>
        <Table
          columns={[
            {
              title: 'date',
              field: 'attributes.date',
            },
            {
              title: 'Rating',
              render: renderRating,
              customSort: (a, b) =>
                a.attributes.rating < b.attributes.rating ? 1 : -1,
            },
            {
              title: 'comment',
              field: 'attributes.comment',
            },
            {
              title: 'Reply',
              render: renderReply,
            },
          ]}
          data={rates}
        />
      </DialogContent>
    </Dialog>
  );
};
export default RateDialog;
