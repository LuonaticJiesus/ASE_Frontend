/* eslint-disable camelcase */
import { get, post } from '/@/utils/request';

const URL = {
  list: 'four_s/notice/queryRecv/',
  create: 'back/notice/create',
  undueList: 'four_s/notice/queryRecv/',
  queryBlock: 'four_s/notice/queryBlock/',
  uploadImg: 'four_s/file/upload/',
  publish: '/four_s/notice/publish/',
};

// const MockURL = {
//   list: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/notice/queryRecv/',
//   create: '',
//   queryBlock:
//     'http://127.0.0.1:4523/m1/2544583-0-default/four_s/notice/queryBlock/',
//   undueList:
//     'http://127.0.0.1:4523/m1/2544583-0-default/four_s/notice/queryRecv/',
// };

const getNoticeList = async (headers, data) =>
  get({ url: URL.list, headers: headers, params: data });

const getUndueNoticeList = async (headers, data) =>
  get({ url: URL.undueList, headers: headers, params: data });

const createNotice = async (data) => post(data, { url: URL.create });

const moduleNotices = async (block_id, userid, token) =>
  get({
    url: URL.queryBlock,
    params: {
      block_id: block_id,
    },
    headers: {
      userid: userid,
      token: token,
    },
  });

const uploadImage = async (userid, token, file) =>
  post({
    url: URL.uploadImg,
    headers: {
      userid: userid,
      token: token,
    },
    data: file,
  });

const publishNotice = async (headers, data) =>
  post({ url: URL.publish, headers: headers, params: data });

export {
  getNoticeList,
  createNotice,
  getUndueNoticeList,
  moduleNotices,
  uploadImage,
  publishNotice,
};
