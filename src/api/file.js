import { get, post } from '/@/utils/request.ts';
const URL = {
  upload: '/four_s/file/file/',
  list: '/four_s/file/list/',
  connect: '/four_s/file/connect/',
};

const fileBelongTo = {
  post: 1,
  notice: 2,
  block: 3,
};

const uploadFile = async (file) =>
  post({
    url: URL.upload,
    data: file,
  });

const getFileList = async (type, id) =>
  get({
    url: URL.list,
    params: {
      type: type,
      id: id,
    },
  });

const createConnect = async (type, id, url_list) =>
  post({
    url: URL.connect,
    data: {
      type: type,
      id: id,
      url_list: url_list,
    },
  });

export { fileBelongTo, uploadFile, getFileList, createConnect };
