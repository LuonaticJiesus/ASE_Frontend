/* eslint-disable no-unused-vars */
import { get, post } from '/@/utils/request';

const URL = {
  members: 'four_s/permission/queryUser/',
};

const MockURL = {
  members:
    'http://127.0.0.1:4523/m1/2544583-0-default/four_s/permission/queryUser/',
};

// eslint-disable-next-line camelcase
const moduleMembers = async (block_id, permission, userid, token) =>
  get({
    url: MockURL.members,
    // eslint-disable-next-line camelcase
    params: { block_id: block_id, permission: permission },
    header: { userid: userid, token: token },
  });

export { moduleMembers };
