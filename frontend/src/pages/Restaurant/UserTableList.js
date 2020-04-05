import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Arrow from '@material-ui/icons/ArrowUpward';

const tableIcons = {
  SortArrow: forwardRef((props, ref) => <Arrow {...props} ref={ref} />),
};

const UserTableList = ({
  isDialogOpen,
  setIsDialogOpen,
  restaurantsList,
  setRestaurantToRate,
}) => {
  const openRateModal = id => () => {
    setIsDialogOpen(!isDialogOpen);
    setRestaurantToRate(restaurantsList[id]);
  };

  return (
    <MaterialTable
      columns={[
        {
          title: 'Name',
          field: 'attributes.name',
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
        },
        {
          title: 'Rate',
          render: rowData => (
            <Button
              color="primary"
              variant="contained"
              onClick={openRateModal(rowData.id)}
              disabled={rowData.attributes.isRated}
            >
              Continue
            </Button>
          ),
        },
      ]}
      icons={tableIcons}
      data={Object.values(restaurantsList)}
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

export default UserTableList;
