import getCaptcha from '@/actions/getCaptcha';
import { Center } from '@mantine/core';
import { FC } from 'react';
import LoginForm from './LoginForm';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const LoginPage: FC = async () => {
  const captcha = await getCaptcha();
  return (
    <Center h="calc(100vh - 64px)">
      <LoginForm captcha={captcha} />
    </Center>
  );
};

export default LoginPage;
