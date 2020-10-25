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
  },
  getMeds: function (userId) {
    return axios.get('/api/med/' + userId);
  },
  addMed: function (med) {
    return axios.post('/api/med', med);
  },
  editMed: function (medId) {
    return axios.put(`/api/med/${medId}`);
  },
  deleteMed: function (medId) {
    return axios.delete(`/api/med/${medId}`);
  }
};