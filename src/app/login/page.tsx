import { Center } from '@mantine/core';
import { FC } from 'react';
import LoginForm from './LoginForm';

const LoginPage: FC = () => {
  return (
    <Center h="calc(100vh - 64px)">
      <LoginForm />
    </Center>
  );
};

export default LoginPage;
