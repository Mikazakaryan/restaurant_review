import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';

import Table from 'components/Table';

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

  const sortByRate = field => (a, b) =>
    a.attributes[field] < b.attributes[field] ? 1 : -1;

  const renderLastReviewButton = rowData => {
    const id = rowData?.relationships?.lastRate?.data?.id;
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
  };

  const renderRating = field => rowData => (
    <Rating readOnly precision={0.1} value={rowData.attributes[field]} />
  );

  const renderRateButton = rowData => (
    <Button
      color="primary"
      variant="contained"
      onClick={openRateModal(rowData.id)}
      disabled={rowData.attributes.isRated}
    >
      Continue
    </Button>
  );

  return (
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
          title: 'Last Review',
          render: renderLastReviewButton,
        },
        {
          title: 'Rate',
          render: renderRateButton,
        },
      ]}
      data={Object.values(restaurantsList)}
    />
  );
};

export default UserTableList;
