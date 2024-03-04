'use client';

import getTimeTable from '@/actions/getTimeTable';
import { MdiCalendarRefresh } from '@/components/MdiCalendarRefresh';
import { ActionIcon, Card, Group, NativeSelect, Stack, Text } from '@mantine/core';
import { useLocalStorage } from 'foxact/use-local-storage';
import { FC } from 'react';
import useSWR from 'swr';
import { oriCurrDay, oriCurrWeek } from './currentDate';

export const runtime = 'edge';

const dayMap = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
};

const Column: FC<{ index: number }> = ({ index }) => {
  const { data: timeTable } = useSWR('/timeTable', () => getTimeTable());
  const [currWeek, setCurrWeek] = useLocalStorage(`column-${index}-week`, oriCurrWeek);
  const [currDay, setCurrDay] = useLocalStorage(`column-${index}-day`, oriCurrDay);

  const currClass = timeTable?.data.scheduleList
    .filter((item) => Number(item.SKXQ) === currDay)
    .filter((item) => item.SKZC[currWeek || 0] === '1')
    .sort((a, b) => Number(a.KSJC) - Number(b.KSJC));
  return (
    <Stack>
      <Group>
        <NativeSelect
          data={Array.from({ length: 20 }, (_, i) => ({
            label: `第 ${i + 1} 周`,
            value: i.toString(),
          }))}
          value={(currWeek || 0).toString()}
          onChange={(e) => {
            setCurrWeek(Number(e.currentTarget.value));
          }}
        />
        {currWeek !== oriCurrWeek && (
          <ActionIcon
            size="lg"
            radius="xl"
            variant="light"
            onClick={() => {
              setCurrWeek(oriCurrWeek);
            }}
          >
            <MdiCalendarRefresh />
          </ActionIcon>
        )}
        <NativeSelect
          data={Array.from({ length: 7 }, (_, i) => ({
            label: `星期${dayMap[i as 0 | 1 | 2 | 3 | 4 | 5 | 6]}`,
            value: i.toString(),
          }))}
          value={(currDay || 0).toString()}
          onChange={(e) => {
            setCurrDay(Number(e.currentTarget.value));
          }}
        />
        {currDay !== oriCurrDay && (
          <ActionIcon
            size="lg"
            radius="xl"
            variant="light"
            onClick={() => {
              setCurrDay(oriCurrDay);
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
};

export default Column;
