// React library
import React, { useState } from 'react';

// Material UI libraries
import { Paper, Typography, Container, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

// Components
import Medform from '../../components/MedForm/MedForm';

// Custom styles
import { styles } from './Home.style';

// Calendar API
import { Calendar } from './_components'


// Home component
const Home = (props) => {
  const classes = styles();

  const [open, setOpen] = useState(false);

  return (
    <>
      <Container maxWidth='sm' className={classes.container}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant='h3' gutterBottom>
            My Schedule
          </Typography>
        </Paper>
      </Container>
      <Paper elevation={3}>
        <Calendar />
      </Paper>
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