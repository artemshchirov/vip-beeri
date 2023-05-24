import moment, { Moment } from 'moment';
import React from 'react';

import Day from './Day';

interface MonthProps {
  getEventsForDate: (date: moment.Moment) => string[];
  isToday: (date: moment.Moment) => boolean;
  weeks: moment.Moment[][];
  className?: string;
  currentMonth: Moment;
  monthsOffset?: number;
}

const Month = ({ getEventsForDate, isToday, weeks, className, currentMonth, monthsOffset }: MonthProps) => {
  const daysOfWeek = moment.weekdaysShort();

  const isSaturday = (day: Moment) => {
    return moment(day).format('ddd') === 'Sat';
  };

  const isCurrentMonth = (day: Moment, month: Moment, monthsOffset = 0) => {
    return moment(day).isSame(month.clone().add(monthsOffset, 'month'), 'month');
  };

  const isDayInOtherMonthButInSameWeekAsCurrentMonth = (day: Moment, currentMonth: Moment, monthsOffset = 0) => {
    const firstDayOfWeek = weeks[0][0];
    const lastDayOfWeek = weeks[weeks.length - 1][6];
    return (
      !isCurrentMonth(day, currentMonth, monthsOffset) && day.isBetween(firstDayOfWeek, lastDayOfWeek, 'day', '[]')
    );
  };

  return (
    <>
      <div className={`grid w-full grid-cols-7 gap-1  text-black`}>
        {daysOfWeek.map((day) => (
          <div className={`mb-1 text-center font-bold ${day === 'Sat' ? 'text-[#E63A22]' : ''}`} key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className={`row-auto grid h-full w-full grid-cols-7 gap-1 bg-gray-50  text-black ${className}`}>
        {weeks.map((week) => {
          // Check if the week contains any days from the current month
          const hasDaysFromCurrentMonth = week.some((day) => isCurrentMonth(day, currentMonth, monthsOffset));

          // Skip rendering the week if it doesn't have any days from the current month
          if (!hasDaysFromCurrentMonth) {
            return null;
          }
          return week.map((day) => {
            const isSameMonth = isCurrentMonth(day, currentMonth, monthsOffset);
            const isSameWeek = day.isSame(week[0], 'week');
            const isOtherMonthInSameWeek = isDayInOtherMonthButInSameWeekAsCurrentMonth(
              day,
              currentMonth,
              monthsOffset
            );

            if (isSameMonth && isSameWeek) {
              // TODO refactor classnames
              return (
                <Day
                  className={`border ${
                    isToday(day) &&
                    'border-2 border-b-[#E63A22] border-l-[#F49918] border-r-[#1099D6] border-t-[#833fb1]'
                  } ${
                    isSaturday(day) && !isCurrentMonth(day, currentMonth, monthsOffset)
                      ? 'border-[#e6392267]'
                      : isSaturday(day)
                      ? 'border-[#E63A22]'
                      : !isCurrentMonth(day, currentMonth, monthsOffset) || isOtherMonthInSameWeek
                      ? 'border-gray-300 text-gray-400'
                      : 'border-black'
                  }`}
                  key={day.toString()}
                >
                  <p
                    className={`${
                      isToday(day) ? 'font-medium' : ''
                    } md:text-md ml-0.5  flex self-start  text-xs lg:text-sm`}
                  >
                    {day.date()}
                  </p>
                  <ul className='flex h-[80px] flex-col items-center justify-start lg:h-[90px] '>
                    {getEventsForDate(day).map((worker) => (
                      <li className='text-xs lg:text-sm' key={worker}>
                        {worker}
                      </li>
                    ))}
                  </ul>
                </Day>
              );
            } else if (isOtherMonthInSameWeek) {
              return <Day key={day.toString()} />;
            } else {
              return null;
            }
          });
        })}
      </div>
    </>
  );
};

export default Month;
