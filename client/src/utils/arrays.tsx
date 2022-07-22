/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/*
export const anchors = [
  { title: "Accounts", link: "/accounts" },
  { title: "Contacts", link: "/contacts" },
  { title: "Reporting", link: "/reporting" },
];

export const accountHeaders = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "username", headerName: "Username", flex: 10 },
  { field: "is_superadmin", headerName: "Admin", flex: 1 },
];
export const contactHeaders = [
  { field: "id", headerName: "ID", minWidth: 50 },
  { field: "custname", headerName: "Name", minWidth: 200 },
  { field: "email", headerName: "Email", minWidth: 250 },
  { field: "phone", headerName: "Phone", minWidth: 150 },
  { field: "custaddress", headerName: "Address", minWidth: 300 },
  { field: "newsletter", headerName: "Newsletter", minWidth: 50 },
  { field: "donor badge", headerName: "Donor", minWidth: 50 },
  { field: "seatingaccom", headerName: "Seating Accomodation", minWidth: 200 },
  { field: "vip", headerName: "VIP", minWidth: 50 },
  { field: "volunteer list", headerName: "Volunteer List", minWidth: 150 },
];
export const donationHeaders = [
  { field: "id", headerName: "ID" },
  { field: "donorid", headerName: "Donor ID", minWidth: 150 },
  { field: "isanonymous", headerName: "Anonymous", minWidth: 150 },
  { field: "amount", headerName: "Amount", minWidth: 150 },
  { field: "dononame", headerName: "Name", minWidth: 150 },
  { field: "frequency", headerName: "Frequency", minWidth: 150 },
  { field: "comments", headerName: "Comments", minWidth: 200 },
  { field: "donodate", headerName: "Date", minWidth: 200 },
];

export const accountFiltersTextField = [{ label: "Username", id: "username" }];

export const accountFiltersSwitch = [{ label: "Admin", id: "is_superadmin" }];

export const contactFiltersTextField = [
  { label: "Name", id: "custname" },
  { label: "Email", id: "email" },
  { label: "Phone", id: "phone" },
  { label: "Address", id: "custaddress" },
];

export const contactFiltersSwitch = [
  { label: "VIP", id: "vip" },
  { label: "Volunteer List", id: "volunteer list" },
];

export const donationFiltersTextField = [
  { label: "Name", id: "dononame" },
  { label: "Amount", id: "amount" },
];

export const createNewTaskTextFieldLabels = [
  { label: "Task ID", id: "taskid"},
  { label: "Parent ID", id: "parenttaskid"},
  { label: "Subject", id: "tasksubject"},
  { label: "Parent Subject", id: "parenttasksubject"},
  { label: "Status", id: "status"},
  { label: "Assign To", id: "assignto"},
  { label: "Related Record", id: "relatedrecord"},
  { label: "Description", id: "description"}
]
*/
export const anchors = [
  {title: 'Accounts', link: '/accounts'},
  {title: 'Contacts', link: '/contacts'},
  {title: 'Reporting', link: '/reporting'},
  // { title: "Tasks", link: "/tasks" },
];

export const accountHeaders = [
  {field: 'id', headerName: 'ID', flex: 1},
  {field: 'username', headerName: 'Username', flex: 10},
  {field: 'is_superadmin', headerName: 'Admin', flex: 1},
];
export const contactHeaders = [
  {field: 'id', headerName: 'ID', minWidth: 50},
  {field: 'custname', headerName: 'Name', minWidth: 200},
  {field: 'email', headerName: 'Email', minWidth: 250},
  {field: 'phone', headerName: 'Phone', minWidth: 150},
  {field: 'custaddress', headerName: 'Address', minWidth: 300},
  {field: 'newsletter', headerName: 'Newsletter', minWidth: 50},
  {field: 'donor badge', headerName: 'Donor', minWidth: 50},
  {field: 'seatingaccom', headerName: 'Seating Accomodation', minWidth: 200},
  {field: 'vip', headerName: 'VIP', minWidth: 50},
  {field: 'volunteer list', headerName: 'Volunteer List', minWidth: 150},
];
export const donationHeaders = [
  {field: 'id', headerName: 'ID'},
  {field: 'donorid', headerName: 'Donor ID', minWidth: 150},
  {field: 'isanonymous', headerName: 'Anonymous', minWidth: 150},
  {field: 'amount', headerName: 'Amount', minWidth: 150},
  {field: 'dononame', headerName: 'Name', minWidth: 150},
  {field: 'frequency', headerName: 'Frequency', minWidth: 150},
  {field: 'comments', headerName: 'Comments', minWidth: 200},
  {field: 'donodate', headerName: 'Date', minWidth: 200},
];

export const accountFiltersTextField = [{label: 'Username', id: 'username'}];

export const accountFiltersSwitch = [{label: 'Admin', id: 'is_superadmin'}];

export const contactFiltersTextField = [
  {label: 'Name', id: 'custname'},
  {label: 'Email', id: 'email'},
  {label: 'Phone', id: 'phone'},
  {label: 'Address', id: 'custaddress'},
];

export const contactFiltersSwitch = [
  {label: 'VIP', id: 'vip'},
  {label: 'Volunteer List', id: 'volunteer list'},
];

export const donationFiltersTextField = [
  {label: 'Name', id: 'dononame'},
  {label: 'Amount', id: 'amount'},
];

export const createNewTaskTextFieldLabels = [
  {label: 'Task ID', id: 'taskid'},
  {label: 'Parent ID', id: 'parenttaskid'},
  {label: 'Subject', id: 'tasksubject'},
  {label: 'Parent Subject', id: 'parenttasksubject'},
  {label: 'Status', id: 'status'},
  {label: 'Assign To', id: 'assignto'},
  {label: 'Related Record', id: 'relatedrecord'},
  {label: 'Description', id: 'description'},
];

// Ticketing


import {capitalize} from '@material-ui/core';

export const titleCase = (s: string) => s.split(' ').map((w) => capitalize(w)).join(' ');

type time = {hours: number, minutes: number, ampm?: 'AM'|'PM'}

export function isSameDay(a: Date, b: Date) {
  const sameDay = a.getDate() == b.getDate();
  const sameMonth = a.getMonth() == b.getMonth();
  const sameYear = a.getFullYear() == b.getFullYear();
  return sameDay && sameMonth && sameYear;
}

const serializeTime = (datestr: string): time => {
  const hours_minutes = datestr.split(':');
  return {
    hours: parseInt(hours_minutes[0]),
    minutes: parseInt(hours_minutes[1]),
  };
};

const appendAMPM = (time: time): time => ({
  ...time,
  ampm: (time.hours >= 12) ? 'PM': 'AM',
});

const toCivilianHours = (time: time): time => ({
  ...time,
  hours: (time.hours > 12) ?
        time.hours - 12 : time.hours,
});

const formatTime = (time: time, template='hh:mm tt') =>
  template
      .replace('hh', time.hours.toString())
      .replace('mm', (time.minutes < 10) ?
            '0'+time.minutes.toString() :
            time.minutes.toString())
      .replace('tt', time.ampm!);

// Input=19:00:00 => Output=7:00 PM
export const militaryToCivilian = (mil_t: string) =>
  formatTime(toCivilianHours(appendAMPM(serializeTime(mil_t))));

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const serializeDate = (datestr: string): Date => new Date(datestr);
const getMonth = (d: Date) => MONTHS[d.getMonth()];
const getDay = (d: Date) => DAYS[d.getDay()];
const getDate = (d: Date) => d.getDate().toString();
const formatDate = (d: Date, template='dy, mm dt') =>
  template
      .replace('dy', getDay(d))
      .replace('mm', getMonth(d))
      .replace('dt', getDate(d));

export const dayMonthDate = (datestr: string) =>
  formatDate(serializeDate(datestr));

export type Dictionary<U> = {[key: string]: U}

export const toDollarAmount = (n: number): string => {
  return '$' + n.toFixed(2).toString();
};

const add1 = (n: number) => n+1;
export const range = (n: number, zeroIndexed = true) => zeroIndexed ?
    Array.from(Array(n).keys()) :
    Array.from(Array(n).keys()).map(add1);

export const bound = (min: number, max: number) => (n: number) => Math.min(Math.max(n, min), max);
