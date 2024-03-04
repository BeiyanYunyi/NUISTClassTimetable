'use client';

import getTimeTable from '@/actions/getTimeTable';
import { MdiCalendarRefresh } from '@/components/MdiCalendarRefresh';
import { ActionIcon, Card, Group, NativeSelect, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';

export const runtime = 'edge';

dayjs.extend(duration);

const startDate = dayjs('2024-02-25 00:00:00');

const dayMap = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
};

export default function Home() {
  const { data: timeTable, isLagging } = useSWR('/timeTable', () => getTimeTable());
  const currDat = new Date();
  const currDate = dayjs(currDat);
  const oriCurrWeek = dayjs.duration(currDate.diff(startDate)).weeks();
  const [currWeek, setCurrWeek] = useState(oriCurrWeek);
  const oriCurrDay = currDat.getDay();
  const [currDay, setCurrDay] = useState(oriCurrDay);

  const currClass = timeTable?.data.scheduleList
    .filter((item) => Number(item.SKXQ) === currDay)
    .filter((item) => item.SKZC[currWeek] === '1')
    .sort((a, b) => Number(a.KSJC) - Number(b.KSJC));
  return (
    <Stack>
      {isLagging && (
        <Text>
          正处于
          <Text td="underline" component={Link} href="/whySync">
            离线模式
          </Text>
          。可
          <Text td="underline" component={Link} href="/login">
            同步
          </Text>
        </Text>
      )}
      <Group>
        <NativeSelect
          data={Array.from({ length: 20 }, (_, i) => ({
            label: `第 ${i + 1} 周`,
            value: i.toString(),
          }))}
          value={currWeek.toString()}
          onChange={(e) => {
            setCurrWeek(Number(e.currentTarget.value));
          }}
        />
        <NativeSelect
          data={Array.from({ length: 7 }, (_, i) => ({
            label: `星期${dayMap[i as 0 | 1 | 2 | 3 | 4 | 5 | 6]}`,
            value: i.toString(),
          }))}
          value={currDay.toString()}
          onChange={(e) => {
            setCurrDay(Number(e.currentTarget.value));
          }}
        />
        {(currWeek !== oriCurrWeek || currDay !== oriCurrDay) && (
          <ActionIcon
            size="lg"
            radius="xl"
            variant="light"
            onClick={() => {
              setCurrWeek(dayjs.duration(currDate.diff(startDate)).weeks());
              setCurrDay(currDat.getDay());
            }}
          >
            <MdiCalendarRefresh />
          </ActionIcon>
        )}
      </Group>
      {currClass?.map((item) => (
        <Card key={item.teachingClassID} withBorder>
          <Text size="lg">{item.KCM}</Text>
          <Text>{item.SKJS}</Text>
          <Text>{item.YPSJDD}</Text>
          <Text>
            {item.KSJC} - {item.JSJC} 节
          </Text>
        </Card>
      ))}
      {!!currClass && !currClass.length && (
        <Card withBorder c="dimmed">
          <Text size="lg">今日无事。</Text>
          <Text>路易十六</Text>
          <Text>凡尔赛宫</Text>
          <Text>1789 年 5 月 5 日</Text>
        </Card>
      )}
    </Stack>
  );
}
