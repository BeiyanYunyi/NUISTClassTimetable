import getCaptcha from '@/actions/getCaptcha';
import { FC } from 'react';
import LoginForm from './LoginForm';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const LoginPage: FC = async () => {
  const captcha = await getCaptcha();
  return (
    <div className="flex flex-col">
      <p className="mb-2">登录凭据与学校教务系统一致</p>
      <LoginForm captcha={captcha} />
    </div>
  );
};

export default LoginPage;
