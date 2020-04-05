import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import useStyles from './styles';
import UserRestaurantList from './UserRestaurantList';

const Restaurant = ({
  user,
  fetchAllRestaurants,
  rateRestaurant,
  restaurantsList,
}) => {
  const classes = useStyles();
  const userKey = user.id;
  const isUser = user.attributes.role === 'user';
  const isOwner = user.attributes.role === 'owner';
  const isAdmin = user.attributes.role === 'admin';

  useEffect(() => {
    if (isUser) fetchAllRestaurants({ userKey });
  }, [user, fetchAllRestaurants]);

  const getComponent = () => {
    if (isUser)
      return (
        <UserRestaurantList
          classes={classes}
          userKey={userKey}
          rateRestaurant={rateRestaurant}
          restaurantsList={restaurantsList}
        />
      );
  };

  return <div className={classes.root}>{getComponent()}</div>;
};

const mapState = ({
  user: { user },
  restaurants: { list: restaurantsList },
}) => ({
  user,
  restaurantsList,
});

const mapDispatch = ({
  restaurants: { fetchAllRestaurants, rateRestaurant },
}) => ({
  fetchAllRestaurants,
  rateRestaurant,
});

export default connect(mapState, mapDispatch)(Restaurant);
