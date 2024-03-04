'use client';

import getTimeTable from '@/actions/getTimeTable';
import { MdiMinus } from '@/components/MdiMinus';
import { MdiPlus } from '@/components/MdiPlus';
import { css } from '@/styled-system/css';
import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { useLocalStorage } from 'foxact/use-local-storage';
import Link from 'next/link';
import useSWR from 'swr';
import Column from './Column';

export const runtime = 'edge';

export default function Home() {
  const [columns, setColumns] = useLocalStorage('columns', 1);
  const { isLagging } = useSWR('/timeTable', () => getTimeTable());
  return (
    <Stack px="md" maw="100vw">
      {isLagging && (
        <Text>
          正处于
          <Text td="underline" component={Link} href="/about#whySync">
            离线模式
          </Text>
          。可
          <Text td="underline" component={Link} href="/login">
            同步
          </Text>
        </Text>
      )}
      <Group wrap="nowrap" className={css({ overflowX: 'scroll' })}>
        <Group
          align="start"
          wrap="nowrap"
          className={css({
            w: 'max-content',
            flexShrink: 0,
          })}
        >
          {Array.from({ length: columns || 1 }, (_, i) => (
            <Column key={i} index={i} />
          ))}
        </Group>
        {(columns || 1) > 1 && (
          <ActionIcon
            variant="light"
            radius="lg"
            onClick={() => {
              setColumns((col) => col! - 1);
              localStorage.removeItem(`column-${columns! - 1}-day`);
            }}
          >
            <MdiMinus />
          </ActionIcon>
        )}
        <ActionIcon variant="light" radius="lg" onClick={() => setColumns((col) => (col || 1) + 1)}>
          <MdiPlus />
        </ActionIcon>
      </Group>
    </Stack>
  );
}
