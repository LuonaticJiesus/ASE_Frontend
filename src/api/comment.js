/* eslint-disable no-unused-vars */
import { get, post } from '/@/utils/request';

const URL = {
  query: '/four_s/comment/queryPost/',
  create: '/four_s/comment/publish/',
  delete: '/four_s/comment/delete/',
  like: '/four_s/comment/like/',
};

const queryCommentList = async (params, headers) =>
  get({
    url: URL.query,
    params: params,
    headers: headers,
  });

const createComment = async (data, headers) =>
  post({
    url: URL.create,
    data: data,
    headers: headers,
  });

const deleteComment = async (data, headers) =>
  post({
    url: URL.delete,
    data: data,
    headers: headers,
  });

const likeComment = async (data, headers) =>
  post({
    url: URL.like,
    data: data,
    headers: headers,
  });

export { queryCommentList, createComment, deleteComment, likeComment };
