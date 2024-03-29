import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { createContextState } from 'foxact/context-state';

dayjs.extend(duration);
const startDate = dayjs('2024-02-25 00:00:00');

const currDat = new Date();
const currDate = dayjs(currDat);
export const oriCurrWeek = dayjs.duration(currDate.diff(startDate)).weeks();
export const oriCurrDay = currDat.getDay();
const [CurrWeekProvider, useCurrWeek, useSetCurrWeek] = createContextState(oriCurrWeek);
export { CurrWeekProvider, useCurrWeek, useSetCurrWeek };
