import getCaptcha from '@/actions/getCaptcha';
import { Stack, Text } from '@mantine/core';
import { FC } from 'react';
import LoginForm from './LoginForm';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const LoginPage: FC = async () => {
  const captcha = await getCaptcha();
  return (
    <Stack>
      <Text>登录凭据与学校教务系统一致</Text>
      <LoginForm captcha={captcha} />
    </Stack>
  );
};

export default LoginPage;
