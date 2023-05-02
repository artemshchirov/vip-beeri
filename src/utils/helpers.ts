import moment from 'moment';

export const getCurrentDateAndTime = () => {
  const currentDate = moment();
  const dateString = currentDate.format('DD/MM');
  const timeString = currentDate.format('HH:mm');
  const timestamp = `${dateString} ${timeString}`;

  return timestamp;
};
