import get from 'lodash/get';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import AdminTable from './AdminTable';
import EditDialog from './EditDialog';

const cookies = new Cookies();

const AdminDashboard = ({
  user,
  logOut,
  userList,
  rateList,
  editUser,
  replyList,
  deleteUser,
  restaurantList,
  fetchAllAsAdmin,
}) => {
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
    user: (id, state) => editUser({ id, ...state }),
    rate: (id, state) => () => () => {},
    reply: (id, state) => () => () => {},
    restaurant: (id, state) => () => () => {},
  };

  const deleteFunctions = {
    user: id => () => deleteUser({ id }),
    rate: id => () => () => {},
    reply: id => () => () => {},
    restaurant: id => () => () => {},
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

  const onDelete = ({ id, type }) => deleteFunctions[type](id);

  const onSaveEdit = ({ id, type, state }) => () => {
    closeDialog();
    editFunctions[type](id, state);
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
          type={typeToEdit}
          onEdit={onSaveEdit}
          closeDialog={closeDialog}
          isDialogOpen={isOpenEdit}
        />
      )}
      {tables.map(table => (
        <div key={table.name}>
          <Typography variant="h2">{table.name}</Typography>
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
  dashboard: { fetchAllAsAdmin, editUser, deleteUser },
}) => ({
  logOut,
  editUser,
  deleteUser,
  fetchAllAsAdmin,
});

export default connect(mapState, mapDispatch)(AdminDashboard);
