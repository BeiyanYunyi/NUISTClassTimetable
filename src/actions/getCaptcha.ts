'use server';

import { BackendResponse } from '@/types/ServerResponse';
import ky from 'ky';

const getCaptcha = async () => {
  const res = await ky
    .post('http://xsxk.nuist.edu.cn/xsxk/auth/captcha')
    .json<BackendResponse<{ captcha: string; type: string; uuid: string }>>();
  return res;
};

export default getCaptcha;
