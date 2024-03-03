'use client';

import getTimeTable from '@/actions/getTimeTable';
import { Card, Text } from '@mantine/core';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Link from 'next/link';
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
  const currWeek = dayjs.duration(currDate.diff(startDate)).weeks();

  const currDay = currDat.getDay();
  // const currDay = 1;

  const currClass = timeTable?.data.scheduleList
    .filter((item) => Number(item.SKXQ) === currDay)
    .filter((item) => item.SKZC[currWeek] === '1')
    .sort((a, b) => Number(a.KSJC) - Number(b.KSJC));
  return (
    <div>
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
      <Text>
        第 {currWeek + 1} 周 星期{dayMap[currDay as 0 | 1 | 2 | 3 | 4 | 5 | 6]}
      </Text>
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
        <>
          <Text>今日无事。</Text>
          <Text>——路易十六</Text>
        </>
      )}
    </div>
  );
}
