// React libraries
import React from 'react';

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

const frequencies = [
  {
    value: 'ONCE daily',
    label: 'ONCE daily',
  },
  {
    value: 'ONCE a WEEK',
    label: 'ONCE a WEEK',
  },
  {
    value: 'ONCE a MONTH',
    label: 'ONCE a MONTH',
  },
];

// Component
const MedForm = (props) => {
  const classes = styles();

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
                name='name'
                onChange={props.onChangeName}
                value={props.name}
              />
              <TextField
                label='Strength'
                variant='outlined'
                size='small'
                name='strength'
                onChange={props.onChangeStrength}
                value={props.strength}
              />
            </div>
            <div>
              <TextField
                select
                label='Select frequency'
                name='frequency'
                onChange={props.onChangeFrequency}
                variant='outlined'
                size='small'
                value={props.frequency}
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
                  name='time'
                  onChange={props.onChangeTime}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  value={props.time}
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
                  name='startDate'
                  onChange={props.onChangeStartDate}
                  value={props.startDate}
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
                  name='endDate'
                  onChange={props.onChangeEndDate}
                  value={props.endDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <Button className={classes.addButton} onClick={props.onClick} variant="contained" color="primary">
              {props.action}
            </Button>
          </FormControl>
        </div>
      </Fade>
    </Modal>
  );
}

export default MedForm;