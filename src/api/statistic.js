import { get } from '/@/utils/request';

const URL = {
  postTime: '/four_s/statistic/post-time',
  pointTime: '/four_s/statistic/point-time',
  pointSource: '/four_s/statistic/pointsource-module',
  postModule: '/four_s/statistic/post-module',
};

const getPostTime = async (headers) =>
  get({
    url: URL.postTime,
    headers: headers,
  });

const getPointTime = async (headers) =>
  get({
    url: URL.pointTime,
    headers: headers,
  });

const getPointSource = async (headers) =>
  get({
    url: URL.pointSource,
    headers: headers,
  });

const getPostModule = async (headers) =>
  get({
    url: URL.postModule,
    headers: headers,
  });

export { getPostTime, getPostModule, getPointSource, getPointTime };
