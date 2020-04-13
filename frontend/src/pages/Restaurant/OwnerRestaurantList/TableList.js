import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';

import Table from 'components/Table';

const OwnerTableList = ({
  classes,
  setIsAllRates,
  restaurantsList,
  setIsRatesModalOpen,
  setRestaurantIdsForRates,
}) => {
  const sortByRate = field => (a, b) =>
    a.attributes[field] < b.attributes[field] ? 1 : -1;

  const handleRatesClick = (restaurant, isAll) => () => {
    const ids = (restaurant?.relationships?.rates?.data || []).map(el => el.id);
    setIsAllRates(isAll);
    setIsRatesModalOpen(true);
    setRestaurantIdsForRates(ids);
  };

  const renderRating = field => rowData => (
    <Rating readOnly precision={0.1} value={rowData.attributes[field]} />
  );

  const renderReviewButton = isAll => rowData => (
    <Button
      color="primary"
      variant="contained"
      onClick={handleRatesClick(rowData, isAll)}
    >
      Read
    </Button>
  );

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
            render: renderRating('rating'),
            customSort: sortByRate('rating'),
          },
          {
            title: 'Highest Rate',
            render: renderRating('highestRate'),
            customSort: sortByRate('highestRate'),
          },
          {
            title: 'Lowest Rate',
            render: renderRating('lowestRate'),
            customSort: sortByRate('lowestRate'),
          },
          {
            title: 'Pending Reviews',
            render: renderReviewButton(false),
          },
          {
            title: 'All Reviews',
            render: renderReviewButton(true),
          },
        ]}
        data={Object.values(restaurantsList)}
      />
    </div>
  );
};

export default OwnerTableList;
