'use client';
import Footer from '@/components/Footer';
import { css } from '@/styled-system/css';
import { AppShell, Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import favicon from './icon.svg';

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 128, offset: true, collapsed: true }}>
      <AppShell.Header>
        <Group align="center" h="100%" px="sm">
          <Link href="/">
            <Image src={favicon} alt="Site logo" height={48} width={48} />
          </Link>
          <Text component={Link} href="/" size="xl" ml="xs">
            信带课表
          </Text>
        </Group>
      </AppShell.Header>
      <AppShell.Main
        display="flex"
        className={css({
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          minH: 'calc(100vh - 25rem)',
          pb: '5rem',
          bg: 'white',
          boxShadow: 'var(--mantine-shadow-md)',
        })}
      >
        {children}
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
};

export default AppLayout;
