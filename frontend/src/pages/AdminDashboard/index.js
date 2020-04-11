import get from 'lodash/get';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import AdminTable from './AdminTable';
import EditDialog from './EditDialog';

const cookies = new Cookies();

const AdminDashboard = ({
  user,
  logOut,
  userList,
  rateList,
  editUser,
  editRate,
  replyList,
  editReply,
  deleteRate,
  deleteUser,
  deleteReply,
  restaurantList,
  editRestaurant,
  fetchAllAsAdmin,
  deleteRestaurant,
}) => {
  const classes = useStyles();

  const [objToEdit, setObjToEdit] = useState({});
  const [typeToEdit, setTypeToEdit] = useState('');
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(() => {
    if (cookies.get('sid') && cookies.get('sid') !== 'null') {
      if (user.id && get(user, ['attributes', 'role']) !== 'admin') {
        return logOut();
      }
      fetchAllAsAdmin();
    }
  }, [user, fetchAllAsAdmin]);

  const editFunctions = {
    user: editUser,
    rate: editRate,
    reply: editReply,
    restaurant: editRestaurant,
  };

  const deleteFunctions = {
    user: deleteUser,
    rate: deleteRate,
    reply: deleteReply,
    restaurant: deleteRestaurant,
  };

  const dataByType = {
    user: userList,
    rate: rateList,
    reply: replyList,
    restaurant: restaurantList,
  };

  const closeDialog = () => {
    setObjToEdit({});
    setTypeToEdit('');
    setIsOpenEdit(false);
  };

  const onEdit = ({ id, type }) => () => {
    setIsOpenEdit(true);
    setTypeToEdit(type);
    setObjToEdit(dataByType[type][id]);
  };

  const onDelete = ({ id, type }) => () => deleteFunctions[type]({ id });

  const onSaveEdit = ({ id, type, state }) => () => {
    closeDialog();
    editFunctions[type]({ id, ...state });
  };

  const tables = [
    {
      type: 'user',
      name: 'Users',
    },
    {
      type: 'rate',
      name: 'Rates',
    },
    {
      type: 'reply',
      name: 'Replies',
    },
    {
      type: 'restaurant',
      name: 'Restaurants',
    },
  ];

  return (
    <div>
      {objToEdit.id && (
        <EditDialog
          data={objToEdit}
          classes={classes}
          type={typeToEdit}
          onEdit={onSaveEdit}
          closeDialog={closeDialog}
          isDialogOpen={isOpenEdit}
        />
      )}
      {tables.map(table => (
        <div key={table.name} className={classes.tableWrapper}>
          <Typography variant="h2" className={classes.header}>
            {table.name}
          </Typography>
          <AdminTable
            onEdit={onEdit}
            onDelete={onDelete}
            data={Object.values(dataByType[table.type])}
          />
        </div>
      ))}
    </div>
  );
};

const mapState = ({
  user: { user },
  dashboard: { userList, rateList, replyList, restaurantList },
}) => ({
  user,
  userList,
  rateList,
  replyList,
  restaurantList,
});

const mapDispatch = ({
  user: { logOut },
  dashboard: {
    editUser,
    editRate,
    editReply,
    deleteUser,
    deleteRate,
    deleteReply,
    editRestaurant,
    fetchAllAsAdmin,
    deleteRestaurant,
  },
}) => ({
  logOut,
  editUser,
  editRate,
  editReply,
  deleteUser,
  deleteRate,
  deleteReply,
  editRestaurant,
  fetchAllAsAdmin,
  deleteRestaurant,
});

export default connect(mapState, mapDispatch)(AdminDashboard);
