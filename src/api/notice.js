import { get, post } from '/@/utils/request';

const URL = {
  list: '/notice/list',
  create: '/notice/create',
};

const getNoticeList = async () => {
  await get({ url: URL.list });
};

const createNotice = async (data) => {
  await post(data, { url: URL.create });
};

export { getNoticeList, createNotice };
