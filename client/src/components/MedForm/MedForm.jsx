// React libraries
import React, { useState } from 'react';

// Material UI libraries
import { Modal, Fade, Backdrop, Typography, TextField, MenuItem, Button, FormControl } from '@material-ui/core';

// Material UI calendar imports
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// Styles
import { styles } from './MedForm.style';

// utils
import API from '../../utils/API';

const frequencies = [
  {
    value: '1xdaily',
    label: 'ONCE daily',
  },
  {
    value: '2xdaily',
    label: 'TWICE daily',
  },
  {
    value: '3xdaily',
    label: 'THREE times daily',
  },
  {
    value: '4xdaily',
    label: 'FOUR times daily',
  },
  {
    value: '1xweekly',
    label: 'ONCE a WEEK',
  },
  {
    value: '1xmonthly',
    label: 'ONCE a MONTH',
  },
];

// Component
const MedForm = (props) => {
  const classes = styles();
  const [name, setName] = useState('');
  const [strength, setStrength] = useState('');
  const [frequency, setFrequency] = useState('');
  const [selectedTime, setselectedTime] = useState(new Date());
  const [selectedStartDate, setselectedStartDate] = useState(new Date());
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
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={props.open}
      onClose={props.onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.in}>
        <div className={classes.paper}>
          <Typography variant='h5' gutterBottom>
            {props.title}
          </Typography>
          <FormControl className={classes.root}>
            <div>
              <TextField
                label='Medication name'
                variant='outlined'
                size='small'
                value={props.name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label='Strength'
                variant='outlined'
                size='small'
                value={props.strength}
                onChange={(e) => setStrength(e.target.value)}
              />
            </div>
            <div>
              <TextField
                select
                label='Select frequency'
                value={props.frequency}
                onChange={(event) => setFrequency(event.target.value)}
                variant='outlined'
                size='small'
              >
                {frequencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  size='small'
                  margin='normal'
                  id='time-picker'
                  label='Set time of dose'
                  value={props.selectedTime}
                  onChange={(time) => setselectedTime(time)}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='dd/MM/yyyy'
                  margin='normal'
                  label='Start date'
                  value={props.selectedStartDate}
                  onChange={(date) => setselectedStartDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='dd/MM/yyyy'
                  margin='normal'
                  label='End date (OPTIONAL)'
                  value={props.selectedEndDate}
                  onChange={(date) => setSelectedEndDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <Button className={classes.addButton} onClick={handleSubmit} variant="contained" color="primary">
              {props.action}
            </Button>
          </FormControl>
        </div>
      </Fade>
    </Modal>
  );
}

export default MedForm;