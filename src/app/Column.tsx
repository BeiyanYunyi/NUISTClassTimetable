'use client';

import getTimeTable from '@/actions/getTimeTable';
import { MdiCalendarRefresh } from '@/components/MdiCalendarRefresh';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocalStorage } from 'foxact/use-local-storage';
import { FC } from 'react';
import useSWR from 'swr';
import Class from './Class';
import { oriCurrDay, oriCurrWeek, useCurrWeek, useSetCurrWeek } from './currentDate';

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
  const currWeek = useCurrWeek();
  const setCurrWeek = useSetCurrWeek();
  const [currDay, setCurrDay] = useLocalStorage(`column-${index}-day`, oriCurrDay);

  const currClass = timeTable?.data.scheduleList
    .filter((item) => Number(item.SKXQ) === currDay)
    .filter((item) => item.SKZC[currWeek] === '1')
    .sort((a, b) => Number(a.KSJC) - Number(b.KSJC));
  return (
    <div className="shrink-0 flex flex-col gap-2">
      <div className="flex gap-2">
        <Select
          value={currWeek.toString()}
          onValueChange={(e) => {
            setCurrWeek(Number(e));
          }}
        >
          <SelectTrigger className="w-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 20 }, (_, i) => (
              <SelectItem key={i} value={i.toString()}>
                第 {i + 1} 周
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currWeek !== oriCurrWeek && (
          <Button
            size="icon"
            variant="secondary"
            onClick={() => {
              setCurrWeek(oriCurrWeek);
            }}
          >
            <MdiCalendarRefresh />
          </Button>
        )}
        <Select
          value={(currDay || 0).toString()}
          onValueChange={(e) => {
            setCurrDay(Number(e));
          }}
        >
          <SelectTrigger className="w-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 7 }, (_, i) => (
              <SelectItem key={i} value={i.toString()}>
                星期{dayMap[i as 0 | 1 | 2 | 3 | 4 | 5 | 6]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currDay !== oriCurrDay && (
          <Button
            size="icon"
            variant="secondary"
            onClick={() => {
              setCurrDay(oriCurrDay);
            }}
          >
            <MdiCalendarRefresh />
          </Button>
        )}
      </div>
      {currClass?.map((item) => (
        <Class
          key={item.teachingClassID}
          name={item.KCM}
          classroom={item.YPSJDD}
          teacher={item.SKJS}
          time={`${item.KSJC} - ${item.JSJC} 节`}
        />
      ))}
      {!!currClass && !currClass.length && (
        <Class
          disabled
          name="今日无事"
          classroom="凡尔赛宫"
          teacher="路易十六"
          time="1789 年 5 月 5 日"
        />
      )}
    </div>
  );
};

export default Column;
