/* eslint-disable camelcase */
import { get, post } from '/@/utils/request';

const URL = {
  list: '/four_s/message/queryRec/',
  confirm: '/four_s/message/confirm/',
  confirmAll: '/four_s/message/confirmAll/',
};

const getMessageList = async (headers) =>
  get({
    url: URL.list,
    headers: headers,
  });

const confirmOneMessage = async (headers, data) =>
  post({
    url: URL.confirm,
    headers: headers,
    data: data,
  });
export { getMessageList, confirmOneMessage };
