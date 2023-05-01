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

  return (
    <>
      <div className={`grid grid-cols-7 gap-1 w-full  text-black`}>
        {daysOfWeek.map((day) => (
          <div className={`mb-1 font-bold text-center ${day === 'Sat' ? 'text-[#E63A22]' : ''}`} key={day}>
            {day}
          </div>
        ))}
      </div>
      <div
        className={`grid grid-cols-7  grid-rows-7 text-center  gap-1  text-black bg-gray-100 w-full h-full ${className}`}
      >
        {weeks.map((week) =>
          week.map((day) => (
            <Day
              className={`border relative p-2 ${
                isToday(day)
                  ? 'border-l-[#F49918] border-t-[#833fb1] border-r-[#1099D6] border-b-[#E63A22] border-2'
                  : 'border-black'
              } ${
                isSaturday(day) && !isCurrentMonth(day, currentMonth, monthsOffset)
                  ? 'border-[#e6392267]'
                  : isSaturday(day)
                  ? 'border-[#E63A22]'
                  : ''
              } ${!isCurrentMonth(day, currentMonth, monthsOffset) ? 'border-gray-300 text-gray-400' : ''}`}
              key={day.toString()}
            >
              <p
                className={`${
                  isToday(day) ? 'font-medium' : ''
                } absolute top-0 left-0 flex self-start ml-1 text-xs  md:text-md lg:text-lg`}
              >
                {day.date()}
              </p>
              <ul className='h-[65px] flex flex-col items-center mt-2 lg:mt-1 justify-start'>
                {getEventsForDate(day).map((worker) => (
                  <li className='text-xs lg:text-sm' key={worker}>
                    {worker}
                  </li>
                ))}
              </ul>
            </Day>
          ))
        )}
      </div>
    </>
  );
};

export default Month;
