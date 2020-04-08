import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';

const OwnerRestaurantList = ({
  rates,
  classes,
  ownerList,
  createRestaurant,
}) => {
  const [name, setName] = useState('');

  return (
    <div>
      <Input
        value={name}
        onChange={({ target: { value } }) => setName(value)}
      />
      <Button onClick={() => createRestaurant({ name })}>Create</Button>
    </div>
  );
};

export default OwnerRestaurantList;
