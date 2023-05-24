import moment from 'moment';
import { Button } from 'primereact/button';
import React, { useState } from 'react';

import Container from '../../layouts/Container';
import Page from '../../layouts/Page';
import Section from '../../layouts/Section';
import { TableRow } from '../Home/Home';
import Month from './Month';

interface CalendarProps {
  workers: TableRow[];
}

const Calendar = ({ workers }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const getMonthWeeks = (date: moment.Moment, monthOffset = 0) => {
    const targetDate = date.clone().add(monthOffset, 'month');
    const monthStart = targetDate.clone().startOf('month');
    const monthEnd = targetDate.clone().endOf('month').endOf('week');
    const startDate = monthStart.clone().startOf('week');
    const endDate = monthEnd.clone().endOf('week');
    const weeks: moment.Moment[][] = [];

    for (let d = startDate; d <= endDate; d.add(1, 'day')) {
      if (d.month() === targetDate.month()) {
        const week =
          weeks[Math.floor((d.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24 * 7))] ||
          (weeks[Math.floor((d.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24 * 7))] = []);

        week.push(d.clone());
      }
    }

    return weeks;
  };

  const isToday = (date: moment.Moment): boolean => {
    const today = moment();
    return date.isSame(today, 'day');
  };

  const getEventsForDate = (date: moment.Moment): string[] => {
    const workersForDate: string[] = [];
    workers.forEach((worker) => {
      if (worker.date === date.format('D MMMM, dddd')) {
        const [name, surname] = worker.name.split(' ');
        workersForDate.push(name || surname);
      }
    });
    return workersForDate;
  };

  const handlePrevMonthClick = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const handleNextMonthClick = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  return (
    <Page>
      <Section className='flex flex-col justify-center w-full mx-2 md:mx-3'>
        <Container className=' flex flex-col flex-1 w-full gap-3 lg:flex-row justify-evenly'>
          <article className='flex flex-col items-center w-full p-2 bg-white border'>
            <div className='flex items-center justify-between w-full mb-2'>
              <h2 className='text-3xl font-bold text-black'>{currentMonth.format('MMMM yyyy')}</h2>
              <div className='hidden lg:block'>
                <Button icon='pi pi-arrow-left ' onClick={handlePrevMonthClick} />
              </div>
              <div className='flex gap-2 lg:hidden w-max'>
                <Button icon='pi pi-arrow-left' onClick={handlePrevMonthClick} />
                <Button icon='pi pi-arrow-right' onClick={handleNextMonthClick} />
              </div>
            </div>
            <Month
              currentMonth={currentMonth}
              getEventsForDate={getEventsForDate}
              isToday={isToday}
              weeks={getMonthWeeks(currentMonth)}
            />
          </article>

          <article className='flex-col items-center  w-full p-2 bg-white border lg:flex'>
            <div className='flex items-center justify-between w-full mb-2'>
              <Button
                className='invisible lg:visible self-start'
                icon='pi pi-arrow-right'
                onClick={handleNextMonthClick}
              />
              <h2 className='text-3xl font-bold text-black'>
                {currentMonth.clone().add(1, 'month').format('MMMM yyyy')}
              </h2>
            </div>
            <Month
              currentMonth={currentMonth}
              getEventsForDate={getEventsForDate}
              isToday={isToday}
              monthsOffset={1}
              weeks={getMonthWeeks(currentMonth, 1)}
            />
          </article>
        </Container>
      </Section>
    </Page>
  );
};

export default Calendar;
