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
  4: 'super',
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

const permissionMap = {
  0: 'Follower',
  1: 'Member',
  2: 'Assistant',
  3: 'Manager',
  4: 'SuperManager',
};

const permissionColor = {
  0: 'info',
  1: 'primary',
  2: 'success',
  3: 'plain',
  4: 'error',
};

export { roles, queryRole, setPermission, permissionMap, permissionColor };
