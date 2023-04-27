interface Worker {
  id: number;
  name: string;
  admin?: boolean;
}

const workers: Worker[] = [
  { id: 0, name: 'Dror Adri' },
  { id: 1, name: 'Aron Sidorov' },
  { id: 2, name: 'Nir Galisko' },
  { id: 3, name: 'Tatiana Ashurov' },
  { id: 4, name: 'Stela Rabinov' },
  { id: 5, name: 'Omer Bunfad' },
  { id: 6, name: 'Avihai Yona' },
  { id: 7, name: 'Yaniv Mezgauker' },
  { id: 8, name: 'Moti' },
  { id: 9, name: 'Djo Megan' },
  { id: 10, name: 'Mihael Kadimov' },
  { id: 11, name: 'Noa Avram' },
  { id: 12, name: 'Liel Batito' },
  { id: 13, name: 'Zead' },
  { id: 14, name: 'Roman Balabanov', admin: true },
];

export const admins = workers.filter(({ admin }) => admin).map(({ name }) => name.toLowerCase());

export const dropdownValues: Worker[] = workers;

export interface Event {
  date: string;
  name: string;
}

export const events: Event[] = [
  { date: '2023-03-21', name: 'Name1' },
  { date: '2023-03-22', name: 'Name2' },
  { date: '2023-03-25', name: 'Name3' },
];
