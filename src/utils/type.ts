export interface RequestOptions {
  // Whether to process the request result
  isTransformResponse?: boolean;
}

// 返回res.data的interface
export interface defaultResponse<T = any> {
  status: number | string;
  info: string | number;
  data: T;
}

export interface messageType {
  message_id: number;
  receiver_id: number;
  time: string;
  extern_info: object;
}

export interface noticeType {
  notice_id: number;
  title: string;
  txt: string;
  user_id: number;
  block_id: number;
  time: string;
  ddl: string;
}
