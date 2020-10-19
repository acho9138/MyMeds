// React libraries
import React from 'react';
// import logo from '../../public/assets/logo.png';

// Material UI libraries
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Custom styles
import { styles } from "./Navbar.style";

// Navbar component
const Navbar = () => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.background}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img className={classes.logo} src={process.env.PUBLIC_URL + '/assets/logo.png'} alt='logo' />
          <div className={classes.title}></div>
          <div>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Signup</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;