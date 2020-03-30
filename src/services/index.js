import axios from 'axios';
const baseUrl = require('../config').default.url;

// const baseurl = 'http://ayana-actiontracking.mobinius.net/api';
let headers = {'Content-Type': 'application/json'};
// const token =
// 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODA4OTIzMTk0NzB9.uGn9zilh-gstLoDOv2middf4rPLsuLgceyww1jwqE2k';
// let token;
// AsyncStorage.getItem('user_token').then(res => {
//   token = res;
// });
export const postService = async (url, data = {}, isTokenRequired = true) => {
  const token = await sessionStorage.getItem('user_token');
  if (token && isTokenRequired) {
    headers['x-access-token'] = token;
  }
  return await axios.post(`${baseUrl}${url}`, data, {headers: headers});
};

export const getService = async url => {
  const token = await sessionStorage.getItem('user_token');
  if (token) {
    headers['x-access-token'] = token;
  }
  return await axios.get(`${baseUrl}${url}`, {headers});
};

export const putService = async (url, data = {}) => {
    const token = await  sessionStorage.getItem('user_token');
  if (token) {
    headers['x-access-token'] = token;
  }
  return await axios.put(`${baseUrl}${url}`, data, {headers});
};

export const deleteService = async url => {
    const token = await  sessionStorage.getItem('user_token');
  if (token) {
    headers['x-access-token'] = token;
  }
  return await axios.delete(`${baseUrl}${url}`, {headers});
};
