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
  block_name: string;
  block_avatar?: string;
  time: string;
  ddl: string;
  confirm_state: number;
}

export interface commentType {
  comment_id: number;
  user_id: number;
  post_id: number;
  parent_id?: number | null;
  txt: string;
  time: string;
  user_name: string;
  like_cnt: number;
  like_state: number;
  user_avatar?: string;
  children?: commentType[];
  reply_user_name?: string;
}

export const updateType = [101, 102, 207, 304];
export const pointType = [201, 203, 206, 208, 209, 210, 301, 303, 305, 401];
export const systemType = [103, 104, 202, 204, 205, 302];

export interface pointTimeType {
  point: number;
  time: string;
}

export interface postTimeType {
  post_num: number;
  time: string;
}

export interface postModuleType {
  post_num: number;
  block_name: string;
}

// value为point
// name为block_name
export interface pointSourceModuleType {
  value: number;
  name: string;
}

export interface postDetailType {
  /**
   * 对应模块id
   */
  block_id: number;
  /**
   * 所在block名字
   */
  block_name: string;
  /**
   * 加精状态，0未加精1已加精
   */
  chosen_state: number;
  /**
   * 评论数
   */
  comment_cnt: number;
  /**
   * 收藏数目
   */
  favor_cnt: number;
  /**
   * 收藏状态，0未收藏，1已收藏
   */
  favor_state: number;
  /**
   * 最近更新时间
   */
  latest_time: string;
  /**
   * 最近更新的用户名
   */
  latest_update_user: string;
  /**
   * 点赞数
   */
  like_cnt: number;
  /**
   * 当前用户是否点赞，0未点赞，1已点赞
   */
  like_state: number;
  post_id: number;
  /**
   * 发送时间
   */
  time: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 内容
   */
  txt: string;
  /**
   * 发布者头像URL
   */
  user_avatar?: string;
  /**
   * 作者id
   */
  user_id: number;
  /**
   * 帖子作者名字
   */
  user_name: string;
}
