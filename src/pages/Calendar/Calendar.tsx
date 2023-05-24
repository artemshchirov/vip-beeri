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
    // FIXME assume current year
    const monthStart = date
      .clone()
      .month(date.month() + monthOffset)
      .startOf('month');
    const monthEnd = date
      .clone()
      .month(date.month() + monthOffset + 1)
      .subtract(1, 'day')
      .endOf('week');
    const startDate = monthStart.clone().startOf('week');
    const endDate = monthEnd.clone().endOf('week');
    const weeks: moment.Moment[][] = [];

    for (let d = startDate.clone(); d <= endDate; d.add(1, 'day')) {
      const week =
        weeks[Math.floor((d.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24 * 7))] ||
        (weeks[Math.floor((d.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24 * 7))] = []);

      week.push(d.clone());
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
      <Section className='mx-3 flex w-full flex-col justify-center'>
        <Container className=' flex w-full flex-1 flex-col justify-evenly gap-3 lg:flex-row'>
          <article className='flex w-full flex-col items-center border bg-white p-2'>
            <div className='mb-2 flex w-full items-center justify-between'>
              <h2 className='text-3xl font-bold text-black'>{currentMonth.format('MMMM yyyy')}</h2>
              <div className='hidden lg:block'>
                <Button icon='pi pi-arrow-left ' onClick={handlePrevMonthClick} />
              </div>
              <div className='flex w-max gap-2 lg:hidden'>
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
          <article className='flex w-full flex-col items-center border bg-white p-2'>
            <div className='mb-2 flex w-full items-center justify-between'>
              <Button className='invisible lg:visible' icon='pi pi-arrow-right' onClick={handleNextMonthClick} />
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
