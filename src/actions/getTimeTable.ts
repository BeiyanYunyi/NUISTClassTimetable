'use server';

import { BackendResponse } from '@/types/ServerResponse';
import ky from 'ky';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClassData from '../types/ClassData';

const getTimeTable = async () => {
  const token = cookies().get('token');
  if (!token) redirect('/login');
  try {
    const res = await ky
      .post('http://xsxk.nuist.edu.cn/xsxk/elective/nuist/xskb', {
        headers: {
          Authorization: token.value,
        },
      })
      .json<BackendResponse<{ schoolTermName: string; scheduleList: ClassData[] }>>();
    return res;
  } catch (e) {
    redirect('/login');
  }
};

export default getTimeTable;
