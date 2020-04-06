import React, { useState } from 'react';

import TableList from './TableList';
import RateDialog from './RateDialog';

const defaultFeedback = {
  rating: 0,
  comment: '',
  date: new Date(),
};

const UserRestaurantList = ({
  rates,
  userKey,
  classes,
  rateRestaurant,
  restaurantsList,
}) => {
  const [lastReviewId, setLastReviewId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState(defaultFeedback);
  const [isLastRateOpen, setIsLastRateOpen] = useState(false);
  const [restaurantToRate, setRestaurantToRate] = useState({});

  const closeDialog = () => {
    setIsDialogOpen(false);
    setRestaurantToRate({});
    setFeedback(defaultFeedback);
  };

  const closeLastRateDialog = () => {
    setLastReviewId('');
    setIsLastRateOpen(false);
  };

  return (
    <>
      {lastReviewId && (
        <RateDialog
          {...{
            userKey,
            classes,
            readOnly: true,
            isDialogOpen: isLastRateOpen,
            closeDialog: closeLastRateDialog,
            restaurantToRate: rates[lastReviewId],
          }}
        />
      )}

      <RateDialog
        {...{
          userKey,
          classes,
          feedback,
          setFeedback,
          closeDialog,
          isDialogOpen,
          rateRestaurant,
          restaurantToRate,
        }}
      />
      <TableList
        {...{
          setLastReviewId,
          setIsDialogOpen,
          restaurantsList,
          setIsLastRateOpen,
          setRestaurantToRate,
        }}
      />
    </>
  );
};

export default UserRestaurantList;
