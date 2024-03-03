import { css } from '@/styled-system/css';
import { Group, RemoveScroll, Stack, Text } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';

const height = '10rem';

const Footer = () => (
  <div className={css({})}>
    <div className={css({ height })} />
    <Stack
      className={clsx(
        css({ height, position: 'fixed', bottom: 0, left: 0, right: 0, bg: 'gray.50', pt: '1rem' }),
        RemoveScroll.classNames.fullWidth,
      )}
    >
      <Group justify="space-evenly">
        <Stack>
          <Text>技术支持</Text>
          <Text>DH 互联网工作室</Text>
        </Stack>
      </Group>
      <Text ta="center">
        ©2022-2024 北雁云依 以 AGPLv3 协议
        <Link
          className={css({ textDecoration: 'underline' })}
          href="https://github.com/BeiyanYunyi/NUISTClassTimetable"
        >
          开源
        </Link>
      </Text>
    </Stack>
  </div>
);

export default Footer;
