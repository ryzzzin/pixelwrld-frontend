import axios from 'axios';

// export const baseURL = ' http://172.20.10.6:3000';  // todo: remove later
export const baseURL = 'http://localhost:3000';

axios.defaults.baseURL = baseURL

export default axios;
