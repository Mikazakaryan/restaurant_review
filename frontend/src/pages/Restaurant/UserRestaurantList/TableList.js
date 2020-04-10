import get from 'lodash/get';
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';

import Table from '../../../components/Table';

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
    <Table
      columns={[
        {
          title: 'Name',
          field: 'attributes.name',
        },
        {
          title: 'Rating',
          render: rowData => (
            <Rating
              readOnly
              precision={0.1}
              value={rowData.attributes.rating}
            />
          ),
          customSort: (a, b) => sortByRate(a, b, 'rating'),
        },
        {
          title: 'Highest Rate',
          render: rowData => (
            <Rating
              readOnly
              precision={0.1}
              value={rowData.attributes.highestRate}
            />
          ),
          customSort: (a, b) => sortByRate(a, b, 'highestRate'),
        },
        {
          title: 'Lowest Rate',
          render: rowData => (
            <Rating
              readOnly
              precision={0.1}
              value={rowData.attributes.lowestRate}
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
      data={Object.values(restaurantsList)}
    />
  );
};

export default UserTableList;
