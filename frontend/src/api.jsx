import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blogg-am2o.onrender.com/api/v1',
});

export default instance;
