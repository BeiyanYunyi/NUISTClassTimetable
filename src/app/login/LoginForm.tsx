'use client';
import login from '@/actions/login';
import { BackendResponse } from '@/types/ServerResponse';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useSWRConfig } from 'swr';

const LoginForm: FC<{
  captcha:
    | BackendResponse<{
        captcha: string;
        type: string;
        uuid: string;
      }>
    | undefined;
}> = ({ captcha }) => {
  const { mutate } = useSWRConfig();
  const form = useForm({ initialValues: { loginname: '', password: '', captcha: '' } });
  const router = useRouter();
  if (!captcha) {
    throw new Error('captcha is not ready');
  }
  return (
    <div>
      <form
        onSubmit={form.onSubmit(async (value) => {
          await login({ ...value, uuid: captcha.data.uuid });
          await mutate('/timeTable');
          router.replace('/');
        })}
      >
        <TextInput withAsterisk label="学号" {...form.getInputProps('loginname')} />
        <TextInput type="password" withAsterisk label="密码" {...form.getInputProps('password')} />
        <TextInput withAsterisk label="验证码" {...form.getInputProps('captcha')} />
        {captcha.data.captcha && <img src={captcha.data.captcha} alt="captcha" />}
        <Button fullWidth type="submit">
          登录
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
