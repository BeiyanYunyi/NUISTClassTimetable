import { css } from '@/styled-system/css';
import { TypographyStylesProvider } from '@mantine/core';
import Link from 'next/link';

export const runtime = 'edge';

const WhySyncPage = () => (
  <TypographyStylesProvider className={css({ maxW: 'xl', mx: 4 })}>
    <h1>为什么会有离线模式和同步？</h1>
    南元带的课表系统会以一个较短的间隔清除登录状态。为了避免频繁登录，我们提供了离线模式：当登录状态失效时，展示之前的数据。也因此，我们需要同步按钮来手动更新数据。
    <p>
      <Link href="/">返回</Link>
    </p>
  </TypographyStylesProvider>
);

export default WhySyncPage;
