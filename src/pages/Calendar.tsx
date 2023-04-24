import { format, isSameDay, parseISO } from 'date-fns';
import React from 'react';

import Page from '../layouts/Page';
import { Event } from '../utils/constants';

type CalendarProps = {
  events: Event[];
};

const Calendar = ({ events }: CalendarProps) => {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startDate = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth(),
    monthStart.getDate() - monthStart.getDay()
  );
  const endDate = new Date(monthEnd.getFullYear(), monthEnd.getMonth(), monthEnd.getDate() + (6 - monthEnd.getDay()));

  const weeks: Date[][] = [];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const week =
      weeks[Math.floor((d.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7))] ||
      (weeks[Math.floor((d.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7))] = []);
    week.push(new Date(d));
  }

  const isToday = (date: Date): boolean => {
    return isSameDay(date, today);
  };

  const getEventsForDate = (date: Date): Event[] => {
    return events.filter((event) => isSameDay(parseISO(event.date), date));
  };

  return (
    <Page>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold mb-4'>{format(today, 'MMMM yyyy')}</h1>
        <div className='grid grid-cols-7 gap-4'>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div className='text-center font-bold' key={day}>
              {day}
            </div>
          ))}
          {weeks.map((week) =>
            week.map((date) => (
              <div className='text-center' key={date.toString()}>
                <div className={`w-max h-max ${isToday(date) ? 'bg-primary text-white' : ''}`}>
                  <p>{date.getDate()}</p>
                  <ul>
                    <li>Name 1</li>
                    <li>Name 2</li>
                    <li>Name 3</li>
                  </ul>
                </div>
                <div className='mt-2'>
                  {getEventsForDate(date).map((event) => (
                    <div className='mb-2' key={event.name}>
                      <span className='px-2 py-1 rounded-lg bg-primary text-white text-sm font-semibold'>
                        {event.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Page>
  );
};

export default Calendar;
