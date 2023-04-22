import { addMonths, format, isSameDay, parseISO, subMonths } from 'date-fns';
import React, { useState } from 'react';

import Page from '../layouts/Page';
import { Event } from '../utils/constants';
import { TableRow } from './Home/Home';

interface CalendarProps {
  events: Event[];
  workers: TableRow[];
}

const Calendar = ({ events, workers }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
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

  const getEventsForDate = (date: Date): string[] => {
    const workersForDate: string[] = [];
    workers.forEach((worker) => {
      if (worker.date === format(date, 'd MMMM, EEEE')) {
        workersForDate.push(worker.name.split(' ')[1] || worker.name.split(' ')[0]);
      }
    });
    return workersForDate;
  };

  const handlePrevMonthClick = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonthClick = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <Page>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='mb-4 text-3xl font-bold'>{format(currentMonth, 'MMMM yyyy')}</h1>
        <div className='mb-4 w-max '>
          <button className='p-1 mr-24 font-bold border-2' onClick={handlePrevMonthClick}>
            Previous Month
          </button>
          <button className='p-1 font-bold border-2 border-white' onClick={handleNextMonthClick}>
            Next Month
          </button>
        </div>
        <div className='grid grid-cols-7 gap-4'>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div className='font-bold text-center' key={day}>
              {day}
            </div>
          ))}
          {weeks.map((week) =>
            week.map((date) => (
              <div className='text-center' key={date.toString()}>
                <div className={`w-max h-max ${isToday(date) ? 'bg-primary text-white' : ''}`}>
                  <p>{date.getDate()}</p>
                  <ul>
                    {getEventsForDate(date).map((worker) => (
                      <li key={worker}>{worker}</li>
                    ))}
                  </ul>
                </div>
                <div className='mt-2'>
                  {events
                    .filter((event) => isSameDay(parseISO(event.date), date))
                    .map((event) => (
                      <div className='mb-2' key={event.name}>
                        <span className='px-2 py-1 text-sm font-semibold text-white rounded-lg bg-primary'>
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
