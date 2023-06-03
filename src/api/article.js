/* eslint-disable no-unused-vars */
import { get, post } from '/@/utils/request';

const URL = {
  publish: '/four_s/post/publish/',
  module: '/four_s/post/queryBlock/',
  user: '/four_s/post/queryUser/',
  detail: '/four_s/post/queryByID/',
  moduleUser: '/four_s/post/queryUserBlock/',
  like: '/four_s/post/like/',
  favor: '/four_s/post/favor/',
  delete: '/four_s/post/delete/',
  queryFavor: '/four_s/post/queryFavor/',
  choose: '/four_s/post/choose/',
};

// const MockURL = {
//   publish: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/post/publish/',
//   module: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/post/queryBlock/',
//   user: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/post/queryUser/',
//   detail: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/post/queryById',
// };

const articleDetail = async (post_id, userid, token) =>
  get({
    url: URL.detail,
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

const deleteArticle = async (post_id, userid, token) =>
  post({
    url: URL.delete,
    headers: {
      userid: userid,
      token: token,
    },
    data: {
      post_id: post_id,
    },
  });

const moduleArticles = async (block_id, userid, token) =>
  get({
    url: URL.module,
    headers: {
      userid: userid,
      token: token,
    },
    params: {
      block_id: block_id,
    },
  });

const userArticles = async (userid, token) =>
  get({
    url: URL.user,
    params: {
      user_id: userid,
    },
    headers: {
      userid: userid,
      token: token,
    },
  });

const moduleUserArticles = async (userid, token, block_id) =>
  get({
    url: URL.moduleUser,
    headers: {
      userid: userid,
      token: token,
    },
    params: {
      block_id: block_id,
      user_id: userid,
    },
  });

const changePostLike = async (data, headers) =>
  post({
    url: URL.like,
    headers: headers,
    data: data,
  });

const changePostFavor = async (data, headers) =>
  post({
    url: URL.favor,
    headers: headers,
    data: data,
  });

const queryPostFavor = async (headers) =>
  get({
    url: URL.queryFavor,
    headers: headers,
  });

const choosePost = async (headers, data) =>
  post({
    url: URL.choose,
    headers: headers,
    data: data,
  });

export {
  articleDetail,
  publishArticle,
  deleteArticle,
  moduleArticles,
  userArticles,
  moduleUserArticles,
  changePostLike,
  changePostFavor,
  queryPostFavor,
  choosePost,
};
