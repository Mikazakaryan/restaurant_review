import React from 'react';
import Edit from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import Table from 'components/Table';

const AdminTable = ({ data, onEdit, onDelete }) => {
  if (!data.length) return null;

  return (
    <Table
      columns={[
        {
          title: 'id',
          field: 'id',
        },
      ].concat(
        ...Object.keys(data[0].attributes)
          .filter(key => key !== 'active')
          .map(key => ({
            title: key,
            field: `attributes.${key}`,
          })),
        {
          title: 'Edit',
          render: rowData => (
            <IconButton
              onClick={onEdit({ id: rowData.id, type: rowData.type })}
            >
              <Edit color="primary" fontSize="large" />
            </IconButton>
          ),
        },
        {
          title: 'Delete',
          render: rowData => (
            <IconButton
              onClick={onDelete({ id: rowData.id, type: rowData.type })}
            >
              <Delete color="primary" fontSize="large" />
            </IconButton>
          ),
        },
      )}
      data={data}
    />
  );
};

export default AdminTable;
