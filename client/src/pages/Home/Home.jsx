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

// utils
import API from '../../utils/API';


// Home component
const Home = (props) => {
  const classes = styles();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [strength, setStrength] = useState('');
  const [frequency, setFrequency] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.addMed({
      userId: localStorage.getItem('userId'),
      name: name,
      strength: strength,
      frequency: frequency,
      time: selectedTime,
      startDate: selectedStartDate,
      endDate: selectedEndDate
    }).then(() => {
      console.log('Successfully added new medication');
      window.location.reload();
    }).catch((error) => {
      console.error(error);
    })
  }

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
        action={'Add'}
        title={'Add a Medication'}
        onClick={handleSubmit}
        onChangeName={(e) => setName(e.target.value)}
        onChangeStrength={(e) => setStrength(e.target.value)}
        onChangeFrequency={(event) => setFrequency(event.target.value)}
        onChangeTime={(time) => setSelectedTime(time)}
        onChangeStartDate={(date) => setSelectedStartDate(date)}
        onChangeEndDate={(date) => setSelectedEndDate(date)}
        name={name}
        strength={strength}
        frequency={frequency}
        time={selectedTime}
        startDate={selectedStartDate}
        endDate={selectedEndDate}
      />
    </>
  )
}

export default Home;