// React libraries
import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Pages
import { Login, Signup, Home } from './pages';

// Components
import { Navbar, Footer } from './components';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userId') ? true : false);
  return (
    <>
      <Router basename='/'>
        <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Switch>
          <NormalRoute isLoggedIn={isLoggedIn} exact path='/login'><Login setIsLoggedIn={setIsLoggedIn} /></NormalRoute>
          <NormalRoute isLoggedIn={isLoggedIn} exact path='/signup'><Signup setIsLoggedIn={setIsLoggedIn} /></NormalRoute>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path='/home'><Home /></PrivateRoute>
          <Route path="*"><h1>404: Page Not Found</h1></Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

const PrivateRoute = ({ children, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


const NormalRoute = ({ children, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location }
            }}
          />
        ) : (
            children
          )
      }
    />
  );
}

export default App;
