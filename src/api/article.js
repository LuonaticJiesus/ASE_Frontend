/* eslint-disable no-unused-vars */
import { get, post } from '/@/utils/request';

const URL = {
  publish: '/four_s/post/publish/',
  module: '/four_s/post/queryBlock/',
  user: '/four_s/post/queryUser/',
  detail: '/four_s/post/detail/',
};

const MockURL = {
  publish: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/post/publish/',
  module: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/post/queryBlock/',
  user: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/post/queryUser/',
  detail: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/post/detail/',
};

const articleDetail = async (post_id, userid, token) =>
  get({
    url: MockURL.detail,
    headers: {
      userid: userid,
      token: token,
    },
    params: {
      post_id: post_id,
    },
  });

const publishArticle = async (userid, token, data) =>
  post({
    url: URL.publish,
    headers: {
      userid: userid,
      token: token,
    },
    data: data,
  });

const moduleArticles = async (block_id, userid, token) =>
  get({
    url: URL.module,
    params: { block_id: block_id },
    headers: { userid: userid, token: token },
  });

const userArticles = async (userid, token) =>
  get({
    url: URL.user,
    params: { user_id: userid },
    headers: { userid: userid, token: token },
  });

export { articleDetail, publishArticle, moduleArticles, userArticles };
