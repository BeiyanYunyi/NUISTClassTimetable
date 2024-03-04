'use client';
import { Toaster } from '@/components/ui/sonner';
import { useLocalStorage } from 'foxact/use-local-storage';
import { FC, ReactNode, useCallback, useEffect } from 'react';
import { Middleware, SWRConfig, unstable_serialize } from 'swr';

// 这是一个 SWR 中间件，用于在 key 发生变化时保留数据。
const laggy: Middleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    // 使用 ref 来存储之前返回的数据。
    const [laggyData, setLaggyData] = useLocalStorage<typeof swr.data | null>(
      unstable_serialize(key),
      null,
    );

    // 实际的 SWR hook。
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      // 如果数据不是 undefined，更新 ref。
      if (swr.data !== undefined) {
        setLaggyData(swr.data);
      }
    }, [swr.data, setLaggyData]);

    // 暴露一个方法来清除延迟的数据（如果有）。
    const resetLaggy = useCallback(() => {
      setLaggyData(null);
    }, [setLaggyData]);

    // 如果当前数据是 undefined，则回退到之前的数据。
    const dataOrLaggyData = swr.error ? laggyData : swr.data;

    // 是否显示之前的数据？
    const isLagging = swr.error && !!laggyData;

    // 同时将 `isLagging` 字段添加到 SWR 中。
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      resetLaggy,
    });
  };
};

const SWRProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SWRConfig value={{ use: [laggy] }}>
      <Toaster richColors closeButton />
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
