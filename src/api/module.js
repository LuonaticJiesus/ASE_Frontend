/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { get, post } from '/@/utils/request';

const URL = {
  info: 'four_s/block/info',
  members: 'four_s/permission/queryUser/',
};

const MockURL = {
  info: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/block/info',
  members:
    'http://127.0.0.1:4523/m1/2544583-0-default/four_s/permission/queryUser/',
};

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

export { moduleInfo, moduleMembers };
