// React library
import React from 'react';

// Material Ui Components
import { Paper, Typography, Container } from '@material-ui/core';

// utils
// import API from '../../utils/API';

// Custom styles
import { styles } from './Summary.style';

// Components
import { Table } from '../../components';


// Summary page component
const Summary = () => {
  const classes = styles();

  return (
    <>
      <Container maxWidth='sm' className={classes.container}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant='h3' gutterBottom>
            My Summary
          </Typography>
        </Paper>
      </Container>
      <Table />
    </>
  )
}

export default Summary;