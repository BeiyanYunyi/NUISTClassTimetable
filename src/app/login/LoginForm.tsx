'use client';
import getCaptcha from '@/actions/getCaptcha';
import login from '@/actions/login';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import useSWRImmutable from 'swr/immutable';

const LoginForm: FC = () => {
  const form = useForm({ initialValues: { loginname: '', password: '', captcha: '' } });
  const { data: captcha } = useSWRImmutable('/captcha', () => getCaptcha(), {
    suspense: true,
    fallbackData: { code: 200, data: { captcha: '', type: '', uuid: '' }, msg: '操作成功' },
    revalidateOnMount: true,
  });
  const router = useRouter();
  if (!captcha) {
    throw new Error('captcha is not ready');
  }
  return (
    <div>
      <form
        onSubmit={form.onSubmit(async (value) => {
          await login({ ...value, uuid: captcha.data.uuid });
          router.replace('/');
        })}
      >
        <TextInput withAsterisk label="学号" {...form.getInputProps('loginname')} />
        <TextInput type="password" withAsterisk label="密码" {...form.getInputProps('password')} />
        <TextInput withAsterisk label="验证码" {...form.getInputProps('captcha')} />
        {captcha.data.captcha && <img src={captcha.data.captcha} alt="captcha" />}
        <Button type="submit">登录</Button>
      </form>
    </div>
  );
};

export default LoginForm;
