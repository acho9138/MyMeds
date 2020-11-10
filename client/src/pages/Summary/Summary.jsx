// React library
import React, { useState, useEffect } from 'react';

// Material Ui Components
import { Paper, Typography, Container } from '@material-ui/core';

// utils
import API from '../../utils/API';

// Custom styles
import { styles } from './Summary.style';

// Components
import { Table } from '../../components';

// NPM package
import moment from 'moment';


// Summary page component
const Summary = (props) => {
  const classes = styles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    API.getMeds(localStorage.getItem('userId'))
      .then((res) => {
        setRows(getMedsArray(res.data))
      })
  });

  const getMedsArray = (data) => {
    let meds = [];

    for (let i = 0; i < data.length; i++) {
      const med = data[i];

      if (med.endDate) {
        meds.push({
          id: i + 1,
          Medication: med.name,
          Strength: med.strength,
          Frequency: med.frequency,
          Time: moment(med.time).format('hh:mm A'),
          StartDate: moment(med.startDate).format('DD/MM/YYYY'),
          EndDate: med.endDate,
        })
      } else if (!med.endDate) {
        meds.push({
          id: i + 1,
          Medication: med.name,
          Strength: med.strength,
          Frequency: med.frequency,
          Time: moment(med.time).format('hh:mm A'),
          StartDate: moment(med.startDate).format('DD/MM/YYYY'),
          EndDate: '-',
        })
      }

    }

    return meds;
  }

  return (
    <>
      <Container maxWidth='sm' className={classes.container}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant='h3' gutterBottom>
            My Summary
          </Typography>
        </Paper>
      </Container>
      <Table
        rows={rows}
        autoPageSize={true}
      />
    </>
  )
}

export default Summary;