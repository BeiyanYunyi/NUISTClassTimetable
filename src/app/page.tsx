'use client';

import getTimeTable from '@/actions/getTimeTable';
import { Card, Text } from '@mantine/core';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import useSWR from 'swr';

dayjs.extend(duration);

const startDate = dayjs('2024-02-25 00:00:00');

export default function Home() {
  const { data: timeTable } = useSWR('/timeTable', () => getTimeTable(), {
    suspense: true,
    fallbackData: { code: 200, data: { schoolTermName: '', scheduleList: [] }, msg: '操作成功' },
  });
  const currDat = new Date();
  const currDate = dayjs(currDat);
  const { data: currWeek } = useSWR(
    '/passed',
    () => {
      return dayjs.duration(currDate.diff(startDate)).weeks();
    },
    { suspense: true, fallbackData: 0 },
  );

  const currDay = currDat.getDay();
  // const currDay = 1;

  const currClass = timeTable?.data.scheduleList
    .filter((item) => Number(item.SKXQ) === currDay)
    .filter((item) => item.SKZC[currWeek] === '1')
    .sort((a, b) => Number(a.KSJC) - Number(b.KSJC));
  return (
    <div>
      <Text>
        当前：{currWeek + 1} 周 {currDay === 0 ? '日' : currDay}
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
      {!currClass?.length && <Text>今天没有课</Text>}
    </div>
  );
}
