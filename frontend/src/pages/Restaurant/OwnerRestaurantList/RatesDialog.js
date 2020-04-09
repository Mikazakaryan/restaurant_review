import React, { forwardRef, useState } from 'react';
import MaterialTable from 'material-table';
import Rating from '@material-ui/lab/Rating';
import Dialog from '@material-ui/core/Dialog';
import Arrow from '@material-ui/icons/ArrowUpward';
import { TextField, Button } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';

const tableIcons = {
  SortArrow: forwardRef((props, ref) => <Arrow {...props} ref={ref} />),
};

const sortByRate = (a, b, field) =>
  a.attributes[field] < b.attributes[field] ? 1 : -1;

const RateDialog = ({ classes, onReply, closeDialog, open, rates }) => {
  const [replies, setReplies] = useState({});

  const setReply = (value, id) =>
    setReplies({
      ...replies,
      [id]: value,
    });

  const onReplyHandler = id => () => onReply({ id, text: replies[id] });

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      classes={{
        paper: classes.paper,
      }}
    >
      <DialogContent>
        <MaterialTable
          columns={[
            {
              title: 'date',
              field: 'attributes.date',
            },
            {
              title: 'Rating',
              render: dowData => (
                <Rating
                  readOnly
                  precision={0.1}
                  value={dowData.attributes.rating}
                />
              ),
              customSort: (a, b) => sortByRate(a, b, 'rating'),
            },
            {
              title: 'comment',
              field: 'attributes.comment',
            },
            {
              title: 'Reply',
              render: rowData => {
                if (rowData.attributes.reply) {
                  return rowData.attributes.reply;
                } else {
                  return (
                    <div className={classes.replyWrapper}>
                      <TextField
                        value={replies[rowData.id]}
                        label="Reply"
                        variant="outlined"
                        onChange={({ target: { value } }) =>
                          setReply(value, rowData.id)
                        }
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
                }
              },
            },
          ]}
          data={rates}
          icons={tableIcons}
          options={{
            header: true,
            search: false,
            paging: false,
            sorting: true,
            toolbar: false,
            selection: false,
            showTitle: false,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
export default RateDialog;
