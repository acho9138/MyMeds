import axios from 'axios';

export default {
  // Gets user
  login: (user) => {
    return axios.post('/api/user/login', user);
  },
  // Makes new user
  signup: (user) => {
    return axios.post('/api/user/signup', user);
  },
  logout: () => {
    return axios.get('/api/user/logout');
  },
  getMeds: (userId) => {
    return axios.get('/api/med/' + userId);
  },
  addMed: (med) => {
    return axios.post('/api/med', med);
  },
  editMed: (medId, res) => {
    return axios.put(`/api/med/${medId}`, res);
  },
  deleteMed: (medId) => {
    return axios.delete(`/api/med/${medId}`);
  }
};