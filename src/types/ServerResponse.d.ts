export interface BackendResponse<T> {
  code: 200;
  msg: '操作成功';
  data: T;
}
