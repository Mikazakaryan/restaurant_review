import React, { useState, useEffect } from 'react';

import TableList from './TableList';
import RateDialog from './RatesDialog';
import CreateNewRestaurant from './CreateNewRestaurant';

const OwnerRestaurantList = ({
  onReply,
  classes,
  ownerList,
  rates: allRates,
  createRestaurant,
}) => {
  const [name, setName] = useState('');
  const [rates, setRates] = useState([]);
  const [isAllRates, setIsAllRates] = useState(null);
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);
  const [restaurantIdsForRates, setRestaurantIdsForRates] = useState([]);

  useEffect(() => {
    const filteredByRestaurantsRates = Object.values(allRates).filter(
      el => restaurantIdsForRates.includes(el.id) && el,
    );
    setRates(
      isAllRates
        ? filteredByRestaurantsRates
        : filteredByRestaurantsRates.filter(el => !el.attributes.reply),
    );
  }, [allRates, isAllRates, restaurantIdsForRates]);

  const handleNameChange = ({ target: { value } }) => setName(value);

  const handleCreate = () => createRestaurant({ name });

  const closeDialog = () => {
    setIsAllRates(null);
    setIsRatesModalOpen(false);
    setRestaurantIdsForRates([]);
  };

  return (
    <>
      <RateDialog
        {...{
          rates,
          classes,
          onReply,
          closeDialog,
          open: isRatesModalOpen,
        }}
      />
      <div className={classes.ownerRoot}>
        <CreateNewRestaurant
          {...{
            name,
            classes,
            handleCreate,
            handleNameChange,
          }}
        />
        <TableList
          {...{
            classes,
            setIsAllRates,
            setIsRatesModalOpen,
            setRestaurantIdsForRates,
            restaurantsList: ownerList,
          }}
        />
      </div>
    </>
  );
};

export default OwnerRestaurantList;
