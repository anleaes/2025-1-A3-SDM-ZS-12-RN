import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  //baseURL: 'http://192.168.15.6:8000/',
});

export default api;