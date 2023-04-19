/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { get, post } from '/@/utils/request';

const URL = {
  random: 'four_s/blcok/random',
  info: 'four_s/block/info',
  members: 'four_s/permission/queryUser/',
};

const MockURL = {
  random: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/blcok/random',
  info: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/block/info',
  members:
    'http://127.0.0.1:4523/m1/2544583-0-default/four_s/permission/queryUser/',
};

const moduleRandom = async (number, userId, token) =>
  get({
    url: MockURL.random,
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
    url: MockURL.info,
  });

const moduleMembers = async (block_id, permission, userid, token) =>
  get({
    url: MockURL.members,
    // eslint-disable-next-line camelcase
    params: { block_id: block_id, permission: permission },
    header: { userid: userid, token: token },
  });

export { moduleRandom, moduleInfo, moduleMembers };