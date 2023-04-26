/* eslint-disable no-unused-vars */
import { get, post } from '/@/utils/request';

const URL = {
  publish: '/four_s/post/publish/',
  module: '/four_s/post/queryBlock/',
};

const MockURL = {
  publish: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/post/publish/',
  module: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/post/queryBlock/',
};

const publishArticle = async (userid, token, data) =>
  post({
    url: MockURL.publish,
    header: {
      userid: userid,
      token: token,
    },
    data: data,
  });

// eslint-disable-next-line camelcase
const moduleArticles = async (block_id, userid, token) =>
  get({
    url: MockURL.module,
    // eslint-disable-next-line camelcase
    params: { block_id: block_id },
    header: { userid: userid, token: token },
  });

export { publishArticle, moduleArticles };
