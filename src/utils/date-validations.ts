import { differenceInYears } from 'date-fns';

export const isSameOrBefore = (date1: Date, date2: Date) =>
  differenceInYears(date1, date2) <= 0;

export const isSameOrAfter = (date1: Date, date2: Date) =>
  differenceInYears(date1, date2) >= 0;
