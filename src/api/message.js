/* eslint-disable camelcase */
import { get, post } from '/@/utils/request';

const MOCK_BASE = 'http://127.0.0.1:4523/m1/2544583-0-default';

const URL = {
  list: '/four_s/message/queryRec/',
  confirm: '/four_s/message/confirm/',
  confirmAll: '/four_s/message/confirmAll/',
};

const getMessageList = async (headers) =>
  get({
    url: MOCK_BASE + URL.list,
    headers: headers,
  });

const confirmOneMessage = async (headers, data) =>
  post({
    url: URL.confirm,
    headers: headers,
    data: data,
  });
export { getMessageList, confirmOneMessage };
