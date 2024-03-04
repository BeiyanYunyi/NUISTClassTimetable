'use client';

import getTimeTable from '@/actions/getTimeTable';
import { MdiMinus } from '@/components/MdiMinus';
import { MdiPlus } from '@/components/MdiPlus';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from 'foxact/use-local-storage';
import Link from 'next/link';
import useSWR from 'swr';
import Column from './Column';
import { CurrWeekProvider } from './currentDate';

export const runtime = 'edge';

export default function Home() {
  const [columns, setColumns] = useLocalStorage('columns', 1);
  const { isLagging } = useSWR('/timeTable', () => getTimeTable());
  return (
    <div className="flex flex-col px-4 max-w-[100vw]">
      {isLagging && (
        <p className="mb-2">
          正处于
          <Link className="underline" href="/about#whySync">
            离线模式
          </Link>
          。可
          <Link className="underline" href="/login">
            同步
          </Link>
        </p>
      )}
      <div className="flex items-center gap-2 flex-nowrap overflow-x-scroll">
        <div className="flex gap-2 items-start flex-nowrap w-[max-content] flex-shrink-0">
          <CurrWeekProvider>
            {Array.from({ length: columns || 1 }, (_, i) => (
              <Column key={i} index={i} />
            ))}
          </CurrWeekProvider>
        </div>
        {(columns || 1) > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setColumns((col) => col! - 1);
              localStorage.removeItem(`column-${columns! - 1}-day`);
            }}
          >
            <MdiMinus />
          </Button>
        )}
        <Button variant="outline" size="icon" onClick={() => setColumns((col) => (col || 1) + 1)}>
          <MdiPlus />
        </Button>
      </div>
    </div>
  );
}
