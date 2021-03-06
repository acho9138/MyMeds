// React libraries
import React from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router";

// Material UI libraries
import { AppBar, Toolbar, Button } from '@material-ui/core';

// Custom styles
import { styles } from './Navbar.style';

// Components
import SideNav from '../SideNav'

// utils
import API from '../../utils/API';

// Navbar component
const Navbar = (props) => {
  const classes = styles();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    API.logout()
      .then(() => {
        localStorage.clear()
        props.setIsLoggedIn(false)
        history.push('/login');
        console.log('Successfully logged out');
      }).catch((error) => {
        console.error(error);
      })
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.background}>
        <Toolbar>
          <SideNav />
          <img className={classes.logo} src={process.env.PUBLIC_URL + '/assets/logo.png'} alt='logo' />
          <div className={classes.title}></div>
          <div>
            {props.isLoggedIn ? <Button color='inherit' onClick={handleLogout}>Logout</Button> : ''}
            {props.location.pathname === "/login" ? <Button color='inherit' onClick={() => history.push('/signup')} >Signup</Button> : ''}
            {props.location.pathname === "/signup" ? <Button color='inherit' onClick={() => history.push('/login')} >Login</Button> : ''}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Navbar);