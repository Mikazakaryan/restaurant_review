import get from 'lodash/get';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import UserRestaurantList from './UserRestaurantList';

const Restaurant = ({
  user,
  rates,
  fetchUser,
  rateRestaurant,
  restaurantsList,
  fetchAllRestaurants,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const cookies = new Cookies();

  const isUser = get(user, ['attributes', 'role']) === 'user';
  const isOwner = get(user, ['attributes', 'role']) === 'owner';
  const isAdmin = get(user, ['attributes', 'role']) === 'admin';

  if (cookies.get('sid') === 'null') history.push('/');

  const fetch = async () => {
    await fetchUser();
    fetchAllRestaurants();
  };

  useEffect(() => {
    if (cookies.get('sid') && cookies.get('sid') !== 'null') {
      fetch();
    }
  }, [cookies.get('sid'), fetchUser]);

  // useEffect(() => {
  //   if (isUser && !restaurantsList.length) fetchAllRestaurants();
  // }, [isUser, restaurantsList, fetchAllRestaurants]);

  const getComponent = () => {
    if (isUser)
      return (
        <UserRestaurantList
          rates={rates}
          classes={classes}
          userKey={user.id}
          rateRestaurant={rateRestaurant}
          restaurantsList={restaurantsList}
        />
      );
    return null;
  };

  return <div className={classes.root}>{getComponent()}</div>;
};

const mapState = ({
  user: { user },
  restaurants: { list: restaurantsList, rates },
}) => ({
  user,
  rates,
  restaurantsList,
});

const mapDispatch = ({
  user: { fetchUser },
  restaurants: { fetchAllRestaurants, rateRestaurant },
}) => ({
  fetchUser,
  rateRestaurant,
  fetchAllRestaurants,
});

export default connect(mapState, mapDispatch)(Restaurant);
