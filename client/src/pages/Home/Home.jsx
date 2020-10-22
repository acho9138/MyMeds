// React library
import React, { useState } from 'react';

// Material UI libraries
import { Paper, Typography, Container, Grid, TextField, FormControl, Button } from '@material-ui/core';

// Components
import { Navbar } from '../../components';

// Custom styles
import { styles } from './Home.style';

// utils
import API from '../../utils/API';

const Home = () => {
  const classes = styles();

  return (
    <>
      <Navbar isLoggedIn={true} />
      <Container maxWidth="sm" className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h1" gutterBottom>
            Hello
          </Typography>
        </Paper>
      </Container>
    </>
  )
}

export default Home;