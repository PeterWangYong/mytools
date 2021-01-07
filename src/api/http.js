import axios from 'axios';
const SERVER = 'http://47.97.69.142:12005';

async function get(path) {
  return await axios.get(`${SERVER}${path}`);
}

export { get };
