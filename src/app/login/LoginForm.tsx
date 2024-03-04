'use client';
import login from '@/actions/login';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BackendResponse } from '@/types/ServerResponse';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
  const form = useForm({
    defaultValues: { loginname: '', password: '', captcha: '' },
  });
  const router = useRouter();
  if (!captcha) {
    throw new Error('captcha is not ready');
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (value) => {
          const res = await login({ ...value, uuid: captcha.data.uuid });
          if (res.code !== 200) {
            toast.error('登录失败', {
              description: res.msg,
            });
            return router.refresh();
          }
          await mutate('/timeTable');
          router.replace('/');
        })}
      >
        <FormField
          name="loginname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>学号</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="captcha"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>验证码</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {captcha.data.captcha && <img src={captcha.data.captcha} alt="captcha" />}
        <Button className="w-full" type="submit">
          登录
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
