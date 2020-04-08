import get from 'lodash/get';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import React, { useEffect, useState } from 'react';

import useStyles from './styles';
import UserRestaurantList from './UserRestaurantList';
import OwnerRestaurantList from './OwnerRestaurantList';

const Restaurant = ({
  user,
  rates,
  fetchUser,
  ownerList,
  rateRestaurant,
  restaurantsList,
  createRestaurant,
  fetchAllRestaurants,
  fetchOwnedRestaurants,
}) => {
  const classes = useStyles();
  const cookies = new Cookies();
  const [role, setRole] = useState(get(user, ['attributes', 'role']));

  useEffect(() => {
    setRole(get(user, ['attributes', 'role']));
  }, [user]);

  useEffect(() => {
    if (!user.id && cookies.get('sid') && cookies.get('sid') !== 'null') {
      fetchUser();
    }
  }, [user, cookies, cookies.get('sid'), fetchUser]);

  useEffect(() => {
    if (role === 'user' && !Object.values(restaurantsList).length) {
      fetchAllRestaurants();
    }
    if (role === 'owner' && !Object.values(ownerList).length) {
      fetchOwnedRestaurants();
    }
  }, [
    role,
    ownerList,
    restaurantsList,
    fetchAllRestaurants,
    fetchOwnedRestaurants,
  ]);

  const getComponent = () => {
    if (role === 'user')
      return (
        <UserRestaurantList
          rates={rates}
          classes={classes}
          userKey={user.id}
          rateRestaurant={rateRestaurant}
          restaurantsList={restaurantsList}
        />
      );

    if (role === 'owner')
      return (
        <OwnerRestaurantList
          rates={rates}
          classes={classes}
          ownerList={ownerList}
          createRestaurant={createRestaurant}
        />
      );

    return null;
  };

  return <div className={classes.root}>{getComponent()}</div>;
};

const mapState = ({
  user: { user },
  restaurants: { userList: restaurantsList, ownerList, rates },
}) => ({
  user,
  rates,
  ownerList,
  restaurantsList,
});

const mapDispatch = ({
  user: { fetchUser },
  restaurants: {
    rateRestaurant,
    createRestaurant,
    fetchAllRestaurants,
    fetchOwnedRestaurants,
  },
}) => ({
  fetchUser,
  rateRestaurant,
  createRestaurant,
  fetchAllRestaurants,
  fetchOwnedRestaurants,
});

export default connect(mapState, mapDispatch)(Restaurant);
