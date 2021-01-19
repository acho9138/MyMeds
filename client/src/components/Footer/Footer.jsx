// React Libraries
import React from 'react';

// Material UI
import { Grid, Container, Typography } from '@material-ui/core';

// Custom Styles
import { styles } from './Footer.styles';


const Footer = () => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Container maxWidth='sm'>
        <Grid container spacing={3}>
          <Grid item xs={12} align='center'>
            <Typography variant='h6' gutterBottom>
              &copy; MyMeds 2021
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div >
  );
}

export default Footer;