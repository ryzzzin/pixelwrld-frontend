import axios from 'axios';

export const baseURL = 'http://localhost:3000';

axios.defaults.baseURL = baseURL

export default axios;
