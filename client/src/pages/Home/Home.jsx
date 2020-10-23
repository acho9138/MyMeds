// React library
import React from 'react';
import { useHistory } from 'react-router-dom';
// Material UI libraries
import { Paper, Typography, Container } from '@material-ui/core';
// Components
import { Navbar } from '../../components';
// Custom styles
import { styles } from './Home.style';
// utils
import API from '../../utils/API';
// Calendar API
import Scheduler from './calendarIndex'


// Home component
const Home = (props) => {
  const classes = styles();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    API.logout()
      .then(() => {
        history.push('/');
        console.log('Successfully logged out');
      }).catch((error) => {
        console.error(error);
      })
  };

  return (
    <>
      <Navbar onClick={handleLogout} />
      <Container maxWidth='sm' className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant='h3' gutterBottom>
            Welcome Back
          </Typography>
        </Paper>
      </Container>
      <Scheduler />
    </>
  )
}

export default Home;