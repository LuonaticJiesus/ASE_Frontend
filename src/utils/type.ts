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
  related_content?: string;
  related_id: number;
  sender_id?: number;
  sender_name: string;
  sender_avatar: string;
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
}
