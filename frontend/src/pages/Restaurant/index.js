import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import useStyles from './styles';
import UserRestaurantList from './UserRestaurantList';
import OwnerRestaurantList from './OwnerRestaurantList';

const Restaurant = ({
  user,
  rates,
  onReply,
  restaurantList,
  rateRestaurant,
  createRestaurant,
  fetchAllRestaurants,
}) => {
  const classes = useStyles();
  const isUser = user?.attributes?.isUser;
  const isOwner = user?.attributes?.isOwner;

  useEffect(() => {
    if (!restaurantList && (isOwner || isUser)) fetchAllRestaurants();
  }, [isOwner, isUser, restaurantList, fetchAllRestaurants]);

  const getComponent = () => {
    if (!restaurantList) return null;
    if (isOwner)
      return (
        <OwnerRestaurantList
          rates={rates}
          onReply={onReply}
          classes={classes}
          ownerList={restaurantList}
          createRestaurant={createRestaurant}
        />
      );
    return (
      <UserRestaurantList
        rates={rates}
        classes={classes}
        rateRestaurant={rateRestaurant}
        restaurantsList={restaurantList}
      />
    );
  };

  return <div className={classes.root}>{getComponent()}</div>;
};

const mapState = ({
  user: { user },
  restaurants: { restaurantList, rates },
}) => ({
  user,
  rates,
  restaurantList,
});

const mapDispatch = ({
  restaurants: {
    onReply,
    rateRestaurant,
    createRestaurant,
    fetchAllRestaurants,
  },
}) => ({
  onReply,
  rateRestaurant,
  createRestaurant,
  fetchAllRestaurants,
});

export default connect(mapState, mapDispatch)(Restaurant);
