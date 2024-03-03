import 'swr';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'swr' {
  interface SWRResponse<Data = any, Error = any, Config = any> {
    /**
     * The returned data of the fetcher function.
     */
    data: BlockingData<Data, Config> extends true ? Data : Data | undefined;
    /**
     * The error object thrown by the fetcher function.
     */
    error: Error | undefined;
    mutate: KeyedMutator<Data>;
    isValidating: boolean;
    isLoading: IsLoadingResponse<Data, Config>;
    isLagging: boolean;
    resetLaggy: () => void;
  }
}
