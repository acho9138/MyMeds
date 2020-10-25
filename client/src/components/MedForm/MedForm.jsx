// React libraries
import React, { useState } from 'react';

// Material UI libraries
import { Modal, Fade, Backdrop, Typography, TextField, MenuItem, Button } from '@material-ui/core';

// Material UI calendar imports
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// Styles
import { styles } from './MedForm.style';

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
    value: '1xweek',
    label: 'ONCE a WEEK',
  },
  {
    value: '1xmonth',
    label: 'ONCE a MONTH',
  },
];

// Component
const MedForm = (props) => {
  const classes = styles();
  const [frequency, setFrequency] = useState();
  const [selectedTime, setselectedTime] = useState();
  const [selectedStartDate, setselectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  return (
    <>
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
              Add a Medication
            </Typography>
            <form className={classes.root}>
              <div>
                <TextField
                  label='Medication name'
                  id='outlined-size-small'
                  variant='outlined'
                  size='small'
                />
                <TextField
                  label='Strength'
                  id='outlined-size-small'
                  variant='outlined'
                  size='small'
                />
              </div>
              <div>
                <TextField
                  id='outlined-select-currency'
                  select
                  label='Select frequency'
                  value={frequency}
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
                    value={selectedTime}
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
                    id='date-picker-inline'
                    label='Start date'
                    value={selectedStartDate}
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
                    id='date-picker-inline'
                    label='End date (OPTIONAL)'
                    value={selectedEndDate}
                    onChange={(date) => setSelectedEndDate(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <Button className={classes.addButton} onClick={props.onClick} variant="contained" color="primary">
                Add
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default MedForm;