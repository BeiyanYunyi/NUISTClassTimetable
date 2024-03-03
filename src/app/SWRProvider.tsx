'use client';
import { FC, ReactNode } from 'react';
import { SWRConfig } from 'swr';

const SWRProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <SWRConfig>{children}</SWRConfig>;
};

export default SWRProvider;
