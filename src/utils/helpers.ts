export const getCurrentDateAndTime = () => {
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' });
  const timeString = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const timestamp = `${dateString} ${timeString}`;

  return timestamp;
};
export const formatDate = (date: Date) => {
  const options = {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  } as const;
  const newDate = new Intl.DateTimeFormat('en-US', options).format(date);
  const newDateArr = newDate.replace(',', '').split(' ');
  const day = newDateArr[2];
  const month = newDateArr[1];
  const weekday = newDateArr[0];
  const formattedString = `${day} ${month}, ${weekday}`;

  return formattedString;
};
