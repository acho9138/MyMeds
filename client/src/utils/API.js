import axios from 'axios';

export default {
  // Gets user
  login: function (user) {
    return axios.post('/api/user/login', user);
  },
  // Makes new user
  signup: function (user) {
    return axios.post('/api/user/signup', user);
  },
  logout: function () {
    return axios.get('/api/user/logout');
  }
};