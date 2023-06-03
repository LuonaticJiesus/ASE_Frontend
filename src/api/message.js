import { get, post } from '/@/utils/request';

// const MOCK_BASE = 'http://127.0.0.1:4523/m1/2544583-0-default';

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

const confirmMessage = async (headers, message_ids, state) =>
  post({
    url: URL.confirm,
    headers: headers,
    data: {
      message_ids: message_ids,
      state: state,
    },
  });
export { getMessageList, confirmMessage };
