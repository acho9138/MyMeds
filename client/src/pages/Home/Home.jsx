// React library
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI libraries
import { Paper, Typography, Container, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

// Components
import { Navbar } from '../../components';
import Medform from '../../components/MedForm/MedForm';

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

  const [open, setOpen] = useState(false);

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
            My Schedule
          </Typography>
        </Paper>
      </Container>
      <Scheduler />
      <Fab className={classes.button} onClick={() => setOpen(true)} color='primary' aria-label='add'>
        <AddIcon />
      </Fab>
      <Medform
        open={open}
        onClose={() => setOpen(false)}
        in={open}
      />
    </>
  )
}

export default Home;