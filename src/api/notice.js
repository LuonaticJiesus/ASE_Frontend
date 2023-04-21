/* eslint-disable camelcase */
import { get, post } from '/@/utils/request';

const URL = {
  list: 'back/notice/user',
  create: 'back/notice/create',
  undueList: 'back/notice/undue',
  queryBlock: 'four_s/notice/queryBlock/',
};

const MockURL = {
  list: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/notice/queryRecv/',
  create: '',
  queryBlock:
    'http://127.0.0.1:4523/m1/2544583-0-default/four_s/notice/queryBlock/',
  undueList:
    'http://127.0.0.1:4523/m1/2544583-0-default/four_s/notice/queryRecv/',
};

const getNoticeList = async () => get({ url: MockURL.list });

const getUndueNoticeList = async () => get({ url: MockURL.undueList });

const createNotice = async (data) => post(data, { url: URL.create });

const moduleNotices = async (block_id, userid, token) =>
  get({
    url: MockURL.queryBlock,
    params: { block_id: block_id },
    headers: { userid: userid, token: token },
  });

export { getNoticeList, createNotice, getUndueNoticeList, moduleNotices };
