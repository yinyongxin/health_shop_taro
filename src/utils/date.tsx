import { Calendar } from "@taroify/core";
import dayjs, { Dayjs } from "dayjs";
import { Text } from "@tarojs/components";

export const WeekNames = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export type WeekCheck = Record<(typeof WeekNames)[number], boolean>;

export const getDayIsStop = (
  date: Dayjs,
  options: {
    dateList: Dayjs[];
    weekList: number[];
  },
) => {
  const { dateList = [], weekList = [] } = options;
  const weekCheck = weekList.includes(date.day());
  const inCustomDate = dateList.find((item) => item.isSame(date, "day"));
  let isStop = false;
  if (!weekCheck) {
    isStop = !inCustomDate;
  } else {
    isStop = !!inCustomDate;
  }
  return isStop;
};

export const appDayFormatter = (
  day: Calendar.DayObject,
  options: {
    selectDate: Date[];
    weekDay: number[];
  },
) => {
  const { selectDate, weekDay } = options;
  if (!day.value) {
    return day;
  }
  let isStop = getDayIsStop(dayjs(day.value), {
    dateList: selectDate.map((item) => dayjs(item)),
    weekList: weekDay,
  });
  if (isStop) {
    day.bottom = <Text className="text-red-500">停诊</Text>;
  } else {
    day.bottom = <Text className="text-lime-500">出诊</Text>;
  }
  return day;
};
