import React, { useState } from 'react';

import UserTableList from './UserTableList';
import UserRateDialog from './UserRateDialog';

const defaultFeedback = {
  rating: 0,
  comment: '',
  date: new Date(),
};

const UserRestaurantList = ({
  userKey,
  classes,
  rateRestaurant,
  restaurantsList,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState(defaultFeedback);
  const [restaurantToRate, setRestaurantToRate] = useState({});

  const closeDialog = () => {
    setIsDialogOpen(false);
    setRestaurantToRate({});
    setFeedback(defaultFeedback);
  };

  return (
    <>
      <UserRateDialog
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
      <UserTableList
        {...{
          isDialogOpen,
          setIsDialogOpen,
          restaurantsList,
          setRestaurantToRate,
        }}
      />
    </>
  );
};

export default UserRestaurantList;
