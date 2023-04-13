/* eslint-disable no-unused-vars */
import { get, post } from '/@/utils/request';

const URL = {
  publish: '/back/post/publish/',
};

const MockURL = {
  publish: 'http://127.0.0.1:4523/m1/2544583-0-default/back/post/publish/',
};

const publishArticle = async (data) => post(data, MockURL.publish);

export { publishArticle };
