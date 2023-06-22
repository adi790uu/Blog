import axios from 'axios';

const instance = axios.create({
  baseURL: 'blog-coral-one-77.vercel.app/api/v1',
});

export default instance;
