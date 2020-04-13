import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import Arrow from '@material-ui/icons/ArrowUpward';

const tableIcons = {
  SortArrow: forwardRef((props, ref) => <Arrow {...props} ref={ref} />),
};

const Table = ({ data, columns }) => {
  return (
    <MaterialTable
      {...{ data, columns }}
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
  );
};

export default Table;
