import axios from 'axios';
const SERVER = 'http://114.215.192.37:12005';

async function get(path) {
  return await axios.get(`${SERVER}${path}`);
}

export { get };
