import getLunar from '../../../backend/src/service/getDate';
import { get } from './http';

function handleResp(resp) {
  if (resp.status && resp.status === 200) {
    return resp.data;
  } else {
    throw new Error('request failed from backend');
  }
}

async function getBgImage() {
  const resp = await get('/getBgImage');
  return handleResp(resp);
}

async function getDate() {
  const resp = await get('/getDate');
  return handleResp(resp);
}

export { getBgImage, getDate };
