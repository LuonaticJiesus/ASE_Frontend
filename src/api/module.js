/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { get, post } from '/@/utils/request';

const URL = {
  subscribe: 'four_s/block/subscribe/',
  queryAll: 'four_s/block/queryAll/',
  queryPermission: 'four_s/block/queryPermission/',
  search: 'four_s/block/search/',
  random: 'four_s/block/random/',
  info: 'four_s/block/info/',
  members: 'four_s/permission/queryUser/',
};

// const MockURL = {
//   subscribe:
//     'http://127.0.0.1:4523/m1/2544583-0-default/four_s/block/subscribe/',
//   queryAll: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/block/queryAll/',
//   queryPermission:
//     'http://127.0.0.1:4523/m1/2544583-0-default/four_s/block/queryPermission/',
//   search: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/block/search/',
//   random: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/blcok/random/',
//   info: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/block/info/',
//   members:
//     'http://127.0.0.1:4523/m1/2544583-0-default/four_s/permission/queryUser/',
// };

const moduleAll = async (userId, token) =>
  get({
    url: URL.queryAll,
    params: {},
    headers: {
      userid: userId,
      token: token,
    },
  });

const modulePermission = async (permission, userId, token) =>
  get({
    url: URL.queryAll,
    params: {
      permission: permission,
    },
    headers: {
      userid: userId,
      token: token,
    },
  });

const moduleSearch = async (keyword, userId, token) =>
  get({
    url: URL.search,
    params: {
      keyword: keyword,
    },
    headers: {
      userid: userId,
      token: token,
    },
  });

const moduleRandom = async (number, userId, token) =>
  get({
    url: URL.random,
    params: {
      number: number,
    },
    headers: {
      userId: userId,
      token: token,
    },
  });

const moduleInfo = async (block_id, userid, token) =>
  get({
    url: URL.info,
    params: { block_id: block_id },
    headers: { userid: userid, token: token },
  });

const moduleMembers = async (block_id, permission, userid, token) =>
  get({
    url: URL.members,
    // eslint-disable-next-line camelcase
    params: { block_id: block_id, permission: permission },
    headers: { userid: userid, token: token },
  });

const moduleSubscribe = async (block_id, subscribe, userid, token) =>
  post({
    url: URL.subscribe,
    headers: {
      userid: userid,
      token: token,
    },
    data: {
      block_id: block_id,
      subscribe: subscribe,
    },
  });

export {
  moduleAll,
  modulePermission,
  moduleSearch,
  moduleRandom,
  moduleInfo,
  moduleMembers,
  moduleSubscribe,
};
