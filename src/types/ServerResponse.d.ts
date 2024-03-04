export interface BackendResponse<T> {
  code: 200 | 500;
  msg: '操作成功' | '验证码错误';
  data: T;
}
