const startDate = new Date(2020, 0, 1);
const endDate = new Date(2023, 11, 31);

const getRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

export type TableDataType = {
  id: number;
  assignedTo: string;
  email: string;
  subject: string;
  contact: string;
  relatedTo: string;
  dueDate: Date;
  status: 'Pending' | 'Started' | 'Complete';
  priority: 'Important' | 'Normal';
  comments: string;
};

const TABLE_DATA: TableDataType[] = [
  {
    id: 1,
    assignedTo: 'John Michael',
    email: 'JohnMichael@wonder-tix.com',
    subject: 'RD: Michael J. Jordan Donation - 6/30/2023',
    contact: 'Michael J. Jordan',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 2,
    assignedTo: 'Hayley Hilmes',
    email: 'HayleyHilmes@wonder-tix.com',
    subject: 'Kwitman Family Foundation Donation - 7/14/2023',
    contact: 'Barthalamuel M. Kwitman',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Important',
    comments: '',
  },
  {
    id: 3,
    assignedTo: "Alejandro O'Shaugh",
    email: 'OShaugh@wonder-tix.com',
    subject: 'Dr. Sherrie K. James Donation - 5/12/2023',
    contact: 'Dr. Sherrie K. James',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Important',
    comments: '',
  },
  {
    id: 4,
    assignedTo: 'John M. Michael',
    email: 'john@wonder-tix.com',
    subject: 'RD: Doris Gonzales Donation - 6/30/2024',
    contact: 'Doris Gonzales',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 5,
    assignedTo: 'Alexa Liras',
    email: 'alexa@wonder-tix.com',
    subject: 'Ruby Grad Donation - 4/19/2023',
    contact: 'Ruby Grad',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 6,
    assignedTo: 'Alexa Liras',
    email: 'alexa@wonder-tix.com',
    subject: 'Cynthia Ruddock Donation - 3/5/2023',
    contact: 'Cynthia Ruddock',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 7,
    assignedTo: 'John Doe',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Olivia Anderson Donation - 2/5/2023',
    contact: 'Olivia Anderson',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 8,
    assignedTo: 'Ava Patel',
    email: 'AvaPatel@wonder-tix.com',
    subject: 'Ethan Ramirez Donation - 2/5/2023',
    contact: 'Ethan Ramirez',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 9,
    assignedTo: 'Isabella Nguyen',
    email: 'IsabellaNguyen@wonder-tix.com',
    subject: 'Sophia Williams Donation - 12/5/2022',
    contact: 'Sophia Williams',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 10,
    assignedTo: 'Aiden Martinez',
    email: 'AidenMartinez@wonder-tix.com',
    subject: 'Liam Reynolds Donation - 11/5/2022',
    contact: 'Liam Reynolds',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 11,
    assignedTo: 'Sample Task #11',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Task #10',
    contact: 'Mrs. Last',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Normal',
    comments: '',
  },

  {
    id: 12,
    assignedTo: 'John Michael',
    email: 'JohnMichael@wonder-tix.com',
    subject: 'RD: Michael J. Jordan Donation - 6/30/2023',
    contact: 'Michael J. Jordan',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 13,
    assignedTo: 'Hayley Hilmes',
    email: 'HayleyHilmes@wonder-tix.com',
    subject: 'Kwitman Family Foundation Donation - 7/14/2023',
    contact: 'Barthalamuel M. Kwitman',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Important',
    comments: '',
  },
  {
    id: 14,
    assignedTo: "Alejandro O'Shaugh",
    email: 'OShaugh@wonder-tix.com',
    subject: 'Dr. Sherrie K. James Donation - 5/12/2023',
    contact: 'Dr. Sherrie K. James',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Important',
    comments: '',
  },
  {
    id: 15,
    assignedTo: 'John M. Michael',
    email: 'john@wonder-tix.com',
    subject: 'RD: Doris Gonzales Donation - 6/30/2024',
    contact: 'Doris Gonzales',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 16,
    assignedTo: 'Alexa Liras',
    email: 'alexa@wonder-tix.com',
    subject: 'Ruby Grad Donation - 4/19/2023',
    contact: 'Ruby Grad',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 17,
    assignedTo: 'Alexa Liras',
    email: 'alexa@wonder-tix.com',
    subject: 'Cynthia Ruddock Donation - 3/5/2023',
    contact: 'Cynthia Ruddock',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 18,
    assignedTo: 'John Doe',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Olivia Anderson Donation - 2/5/2023',
    contact: 'Olivia Anderson',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 19,
    assignedTo: 'Ava Patel',
    email: 'AvaPatel@wonder-tix.com',
    subject: 'Ethan Ramirez Donation - 2/5/2023',
    contact: 'Ethan Ramirez',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 20,
    assignedTo: 'Isabella Nguyen',
    email: 'IsabellaNguyen@wonder-tix.com',
    subject: 'Sophia Williams Donation - 12/5/2022',
    contact: 'Sophia Williams',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 21,
    assignedTo: 'John Michael',
    email: 'JohnMichael@wonder-tix.com',
    subject: 'RD: Michael J. Jordan Donation - 6/30/2023',
    contact: 'Michael J. Jordan',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 22,
    assignedTo: 'Hayley Hilmes',
    email: 'HayleyHilmes@wonder-tix.com',
    subject: 'Kwitman Family Foundation Donation - 7/14/2023',
    contact: 'Barthalamuel M. Kwitman',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Important',
    comments: '',
  },
  {
    id: 23,
    assignedTo: "Alejandro O'Shaugh",
    email: 'OShaugh@wonder-tix.com',
    subject: 'Dr. Sherrie K. James Donation - 5/12/2023',
    contact: 'Dr. Sherrie K. James',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Important',
    comments: '',
  },
  {
    id: 24,
    assignedTo: 'John M. Michael',
    email: 'john@wonder-tix.com',
    subject: 'RD: Doris Gonzales Donation - 6/30/2024',
    contact: 'Doris Gonzales',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 25,
    assignedTo: 'Alexa Liras',
    email: 'alexa@wonder-tix.com',
    subject: 'Ruby Grad Donation - 4/19/2023',
    contact: 'Ruby Grad',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 26,
    assignedTo: 'Alexa Liras',
    email: 'alexa@wonder-tix.com',
    subject: 'Cynthia Ruddock Donation - 3/5/2023',
    contact: 'Cynthia Ruddock',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 27,
    assignedTo: 'John Doe',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Olivia Anderson Donation - 2/5/2023',
    contact: 'Olivia Anderson',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 28,
    assignedTo: 'Ava Patel',
    email: 'AvaPatel@wonder-tix.com',
    subject: 'Ethan Ramirez Donation - 2/5/2023',
    contact: 'Ethan Ramirez',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 29,
    assignedTo: 'Isabella Nguyen',
    email: 'IsabellaNguyen@wonder-tix.com',
    subject: 'Sophia Williams Donation - 12/5/2022',
    contact: 'Sophia Williams',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 30,
    assignedTo: 'Aiden Martinez',
    email: 'AidenMartinez@wonder-tix.com',
    subject: 'Liam Reynolds Donation - 11/5/2022',
    contact: 'Liam Reynolds',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 31,
    assignedTo: 'John Michael',
    email: 'JohnMichael@wonder-tix.com',
    subject: 'RD: Michael J. Jordan Donation - 6/30/2023',
    contact: 'Michael J. Jordan',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 32,
    assignedTo: 'Hayley Hilmes',
    email: 'HayleyHilmes@wonder-tix.com',
    subject: 'Kwitman Family Foundation Donation - 7/14/2023',
    contact: 'Barthalamuel M. Kwitman',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Important',
    comments: '',
  },
  {
    id: 33,
    assignedTo: "Alejandro O'Shaugh",
    email: 'OShaugh@wonder-tix.com',
    subject: 'Dr. Sherrie K. James Donation - 5/12/2023',
    contact: 'Dr. Sherrie K. James',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Important',
    comments: '',
  },
  {
    id: 34,
    assignedTo: 'John M. Michael',
    email: 'john@wonder-tix.com',
    subject: 'RD: Doris Gonzales Donation - 6/30/2024',
    contact: 'Doris Gonzales',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 35,
    assignedTo: 'Alexa Liras',
    email: 'alexa@wonder-tix.com',
    subject: 'Ruby Grad Donation - 4/19/2023',
    contact: 'Ruby Grad',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 36,
    assignedTo: 'Alexa Liras',
    email: 'alexa@wonder-tix.com',
    subject: 'Cynthia Ruddock Donation - 3/5/2023',
    contact: 'Cynthia Ruddock',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 37,
    assignedTo: 'John Doe',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Olivia Anderson Donation - 2/5/2023',
    contact: 'Olivia Anderson',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 38,
    assignedTo: 'Ava Patel',
    email: 'AvaPatel@wonder-tix.com',
    subject: 'Ethan Ramirez Donation - 2/5/2023',
    contact: 'Ethan Ramirez',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 39,
    assignedTo: 'Isabella Nguyen',
    email: 'IsabellaNguyen@wonder-tix.com',
    subject: 'Sophia Williams Donation - 12/5/2022',
    contact: 'Sophia Williams',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 40,
    assignedTo: 'Aiden Martinez',
    email: 'AidenMartinez@wonder-tix.com',
    subject: 'Liam Reynolds Donation - 11/5/2022',
    contact: 'Liam Reynolds',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 41,
    assignedTo: 'John Michael',
    email: 'JohnMichael@wonder-tix.com',
    subject: 'RD: Michael J. Jordan Donation - 6/30/2023',
    contact: 'Michael J. Jordan',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 42,
    assignedTo: 'Hayley Hilmes',
    email: 'HayleyHilmes@wonder-tix.com',
    subject: 'Kwitman Family Foundation Donation - 7/14/2023',
    contact: 'Barthalamuel M. Kwitman',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Important',
    comments: '',
  },
  {
    id: 43,
    assignedTo: "Alejandro O'Shaugh",
    email: 'OShaugh@wonder-tix.com',
    subject: 'Dr. Sherrie K. James Donation - 5/12/2023',
    contact: 'Dr. Sherrie K. James',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Important',
    comments: '',
  },
  {
    id: 44,
    assignedTo: 'John M. Michael',
    email: 'john@wonder-tix.com',
    subject: 'RD: Doris Gonzales Donation - 6/30/2024',
    contact: 'Doris Gonzales',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 45,
    assignedTo: 'Alexa Liras',
    email: 'alexa@wonder-tix.com',
    subject: 'Ruby Grad Donation - 4/19/2023',
    contact: 'Ruby Grad',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 46,
    assignedTo: 'Alexa Liras',
    email: 'alexa@wonder-tix.com',
    subject: 'Cynthia Ruddock Donation - 3/5/2023',
    contact: 'Cynthia Ruddock',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 47,
    assignedTo: 'John Doe',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Olivia Anderson Donation - 2/5/2023',
    contact: 'Olivia Anderson',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
  {
    id: 48,
    assignedTo: 'Ava Patel',
    email: 'AvaPatel@wonder-tix.com',
    subject: 'Ethan Ramirez Donation - 2/5/2023',
    contact: 'Ethan Ramirez',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Started',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 49,
    assignedTo: 'Isabella Nguyen',
    email: 'IsabellaNguyen@wonder-tix.com',
    subject: 'Sophia Williams Donation - 12/5/2022',
    contact: 'Sophia Williams',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Complete',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 50,
    assignedTo: 'Aiden Martinez',
    email: 'AidenMartinez@wonder-tix.com',
    subject: 'Liam Reynolds Donation - 11/5/2022',
    contact: 'Liam Reynolds',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
];

export {TABLE_DATA};
