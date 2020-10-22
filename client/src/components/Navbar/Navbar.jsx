// React libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Material UI libraries
import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Custom styles
import { styles } from './Navbar.style';

// Navbar component
const Navbar = (props) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.background}>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <img className={classes.logo} src={process.env.PUBLIC_URL + '/assets/logo.png'} alt='logo' />
          <div className={classes.title}></div>
          <div>
            {props.isLoggedIn ? <Button color='inherit'><Link className={classes.links} to='/logout'>Log Out</Link></Button>
              : props.login ? <Button color='inherit'><Link className={classes.links} to='/signup'>Signup</Link></Button>
                : props.signup ? <Button color='inherit'><Link className={classes.links} to='/login'>Login</Link></Button>
                  : (
                    <>
                      <Button color='inherit'><Link className={classes.links} to='/login'>Login</Link></Button>
                      <Button color='inherit'><Link className={classes.links} to='/signup'>Signup</Link></Button>
                    </>
                  )
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;