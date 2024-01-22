const startDate = new Date(2020, 0, 1);
const endDate = new Date(2023, 11, 31);

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (
      end.getTime() - start.getTime()));
};

export type TableDataType = {
  name: string;
  type: string;
  generalLedgerCode: string;
  totalInstances: number;
  activeInstances: number;
  sortOrder: number;
  active: boolean;
};

const TABLE_DATA: TableDataType[] = [
  {
    name: 'Wonderland',
    type: 'Tickets',
    generalLedgerCode: '',
    totalInstances: 5,
    activeInstances: 1,
    sortOrder: 1,
    active: true,
  },
  {
    name: 'Oregon Concert',
    type: 'Tickets',
    generalLedgerCode: '',
    totalInstances: 5,
    activeInstances: 1,
    sortOrder: 1,
    active: true,
  }
];

export {TABLE_DATA};
