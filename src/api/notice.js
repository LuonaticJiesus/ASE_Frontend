import { get, post } from '/@/utils/request';

const URL = {
  list: 'back/notice/user',
  create: 'back/notice/create',
  undueList: 'back/notice/undue',
};

const MockURL = {
  list: 'http://127.0.0.1:4523/m1/2544583-0-default/back/notice/user/',
  create: '',
  undueList: 'http://127.0.0.1:4523/m1/2544583-0-default/back/notice/undue/',
};

const getNoticeList = async () => get({ url: MockURL.list });

const getUnduNoticeList = async () => get({ url: MockURL.undueList });

const createNotice = async (data) => post(data, { url: URL.create });

export { getNoticeList, createNotice, getUnduNoticeList };
