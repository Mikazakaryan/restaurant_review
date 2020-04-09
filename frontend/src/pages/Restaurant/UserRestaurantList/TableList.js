import get from 'lodash/get';
import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Arrow from '@material-ui/icons/ArrowUpward';

const tableIcons = {
  SortArrow: forwardRef((props, ref) => <Arrow {...props} ref={ref} />),
};

const UserTableList = ({
  setLastReviewId,
  setIsDialogOpen,
  restaurantsList,
  setIsLastRateOpen,
  setRestaurantToRate,
}) => {
  const openRateModal = id => () => {
    setIsDialogOpen(true);
    setRestaurantToRate(restaurantsList[id]);
  };

  const openLastRateModal = id => () => {
    setLastReviewId(id);
    setIsLastRateOpen(true);
  };

  const sortByRate = (a, b, field) =>
    a.attributes[field] < b.attributes[field] ? 1 : -1;

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
          customSort: (a, b) => sortByRate(a, b, 'rating'),
        },
        {
          title: 'Highest Rate',
          render: dowData => (
            <Rating
              readOnly
              precision={0.1}
              value={dowData.attributes.highestRate}
            />
          ),
          customSort: (a, b) => sortByRate(a, b, 'highestRate'),
        },
        {
          title: 'Lowest Rate',
          render: dowData => (
            <Rating
              readOnly
              precision={0.1}
              value={dowData.attributes.lowestRate}
            />
          ),
          customSort: (a, b) => sortByRate(a, b, 'lowestRate'),
        },
        {
          title: 'Last Review',
          render: rowData => {
            const id = get(rowData, [
              'relationships',
              'lastRate',
              'data',
              'id',
            ]);
            return (
              <Button
                color="primary"
                disabled={!id}
                variant="contained"
                onClick={openLastRateModal(id)}
              >
                Read
              </Button>
            );
          },
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
