import axios from 'axios';
const SERVER = 'http://120.27.244.128:12005';

async function get(path) {
  return await axios.get(`${SERVER}${path}`);
}

export { get };
