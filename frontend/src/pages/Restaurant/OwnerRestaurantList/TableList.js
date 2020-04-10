import React from 'react';
import get from 'lodash/get';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';

import Table from '../../../components/Table';

const OwnerTableList = ({
  classes,
  setIsAllRates,
  restaurantsList,
  setIsRatesModalOpen,
  setRestaurantIdsForRates,
}) => {
  const sortByRate = (a, b, field) =>
    a.attributes[field] < b.attributes[field] ? 1 : -1;

  const handleRatesClick = (restaurant, isAll) => () => {
    const ids = get(restaurant, ['relationships', 'rates', 'data'], []).map(
      el => el.id,
    );
    setIsAllRates(isAll);
    setIsRatesModalOpen(true);
    setRestaurantIdsForRates(ids);
  };

  return (
    <div className={classes.ownerTableWrapper}>
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
            title: 'Pending Reviews',
            render: rowData => (
              <Button
                color="primary"
                variant="contained"
                onClick={handleRatesClick(rowData, false)}
              >
                Read
              </Button>
            ),
          },
          {
            title: 'All Reviews',
            render: rowData => (
              <Button
                color="primary"
                variant="contained"
                onClick={handleRatesClick(rowData, true)}
              >
                Read
              </Button>
            ),
          },
        ]}
        data={Object.values(restaurantsList)}
      />
    </div>
  );
};

export default OwnerTableList;
