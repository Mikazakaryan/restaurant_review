import React from 'react';
import ReactLoading from 'react-loading';

const Loader = ({ height = 50, width = 50, color = 'black' }) => (
  <ReactLoading type="bars" color={color} height={height} width={width} />
);

export default Loader;
