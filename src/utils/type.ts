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
