/* eslint-disable camelcase */
import { get, post } from '/@/utils/request';
import { getLocalUserId, getToken } from '/@/utils/auth';

const URL = {
  query: '/four_s/permission/query/',
  users: '/four_s/permission/queryUser/',
  set: '/four_s/permission/set/',
};

const roles = {
  0: 'visitor',
  1: 'user',
  2: 'assistant',
  3: 'admin',
};

const queryRole = async (block_id) =>
  get({
    headers: {
      userid: getLocalUserId(),
      token: getToken(),
    },
    params: {
      user_id: getLocalUserId(),
      block_id: block_id,
    },
    url: URL.query,
  });

const setPermission = async (member_id, block_id, permission) =>
  post({
    headers: {
      userid: getLocalUserId(),
      token: getToken(),
    },
    data: {
      user_id: member_id,
      block_id: block_id,
      permission: permission,
    },
    url: URL.set,
  });

export { roles, queryRole, setPermission };
