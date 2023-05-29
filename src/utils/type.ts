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
  message_type: number;
  point?: number;
  receiver_id: number;
  /**
   * 接收者名字
   */
  receiver_name: string;
  related_content?: string;
  related_id: number;
  sender_id?: number;
  /**
   * 发送者名字
   */
  sender_name: string;
  source_content?: string;
  source_id: number;
  /**
   * (0:未查看, 1:已查看)
   */
  state: number;
  time: string;
}

export interface noticeType {
  notice_id: number;
  title: string;
  txt: string;
  user_id: number;
  block_id: number;
  time: string;
  ddl: string;
  confirm_state: number;
}

export const updateType = [101, 102, 207, 304];
export const pointType = [201, 203, 206, 208, 209, 210, 301, 303, 305, 401];
export const systemType = [103, 104, 202, 204, 205, 302];
