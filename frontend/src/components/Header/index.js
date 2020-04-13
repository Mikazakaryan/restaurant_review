import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import useStyles from './styles';

const Header = ({ logOut }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button color="primary" variant="contained" onClick={logOut}>
        Log out
      </Button>
    </div>
  );
};

const mapDispatch = ({ user: { logOut } }) => ({
  logOut,
});

export default connect(null, mapDispatch)(Header);
