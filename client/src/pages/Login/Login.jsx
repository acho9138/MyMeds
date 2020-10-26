// React library
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI libraries
import { Paper, Typography, Container, Grid, TextField, FormControl, Button } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

// Custom styles
import { styles } from './Login.style';

// Components
import { Navbar } from '../../components';

// utils
import API from '../../utils/API';

const Login = ({ setIsLoggedIn }) => {
  const classes = styles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    API.login({
      username: email,
      password: password,
    }).then((res) => {
      setIsLoggedIn(true)
      history.push('/home');
      localStorage.setItem('userId', res.data.userId);
      console.log('Successfully logged in');
    }).catch((error) => {
      console.error(error);
    })
  };

  return (
    <>
      <Navbar isLoggedIn={false} login={true} />
      <Container maxWidth='sm' className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.title}>
              <Typography variant='h4' gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant='h6'>
                Let's Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.form}>
                <div className={classes.margin}>
                  <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item><EmailIcon /></Grid>
                    <Grid item>
                      <TextField
                        className={classes.inputField}
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.margin}>
                  <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item><LockIcon /></Grid>
                    <Grid item>
                      <TextField
                        className={classes.inputField}
                        type='password'
                        label='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </div>
                <Button onClick={handleSubmit} variant='contained' color='primary'>
                  Login
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default Login;