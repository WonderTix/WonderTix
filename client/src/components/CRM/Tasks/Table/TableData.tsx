const startDate = new Date(2020, 0, 1);
const endDate = new Date(2023, 11, 31);

const getRandomDate = (start: Date, end: Date): Date => {
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
  contactEmail: string;
  contactPhone: string;
  contactMobile: string;
  relatedTo: string;
  dueDate: Date;
  status: 'Pending' | 'Started' | 'Completed';
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
    contactEmail: 'jumpman23@gmailcom',
    contactPhone: '(206)342-8631',
    contactMobile: '(717) 550-1675',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: 'M',
  },
  {
    id: 2,
    assignedTo: 'Hayley Hilmes',
    email: 'HayleyHilmes@wonder-tix.com',
    subject: 'Kwitman Family Foundation Donation - 7/14/2023',
    contact: 'Barthalamuel Kwitman',
    contactEmail: 'BKwitman@yahoo.com',
    contactPhone: '(248) 762-0356',
    contactMobile: '(253) 644-2182',
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
    contactEmail: 'kjames75@yahoo.com',
    contactPhone: '(212) 658-3916',
    contactMobile: '(201) 874-8593',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Important',
    comments: '',
  },
  {
    id: 4,
    assignedTo: 'John M. Michael',
    email: 'john@wonder-tix.com',
    subject: 'RD: Doris Gonzales Donation - 6/30/2024',
    contact: 'Doris Gonzales',
    contactEmail: 'dzales21@msn.com',
    contactPhone: '(305) 659-7277',
    contactMobile: '(306) 817-1859',
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
    contactEmail: 'Grad@tix.com',
    contactPhone: '(212) 449-8678',
    contactMobile: '(646) 167-6355',
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
    contactEmail: 'Ruddock99@gmail.com',
    contactPhone: '(507) 869-3151',
    contactMobile: '(515) 516-6901',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 7,
    assignedTo: 'John Doe',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Olivia Anderson Donation - 2/5/2023',
    contact: 'Olivia Anderson',
    contactEmail: 'ivoibs@yahoo.com',
    contactPhone: '(773) 595-0845',
    contactMobile: '(757) 974-4345',
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
    contactEmail: 'Ethman@mac.com',
    contactPhone: '(773) 767-9840',
    contactMobile: '(820) 727-6217',
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
    contactEmail: 'wills13@outlook.com',
    contactPhone: '(343) 128-7288',
    contactMobile: '(332) 067-4391',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 10,
    assignedTo: 'Aiden Martinez',
    email: 'AidenMartinez@wonder-tix.com',
    subject: 'Liam Reynolds Donation - 11/5/2022',
    contact: 'Liam Reynolds',
    contactEmail: 'Lray03@yahoo.ca',
    contactPhone: '(613) 555-0118',
    contactMobile: '(613) 567-5311',
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
    contactEmail: 'Last09@yahoo.ca',
    contactPhone: '(123) 456-7890',
    contactMobile: '(987) 654-3210',
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
    contactEmail: 'jumpan23@gmailcom',
    contactPhone: '(206)342-8631',
    contactMobile: '(717) 550-1675',
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
    contact: 'Barthalamuel Kwitman',
    contactEmail: 'BKwitman@yahoo.com',
    contactPhone: '(248) 762-0356',
    contactMobile: '(253) 644-2182',
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
    contactEmail: 'kjames75@yahoo.com',
    contactPhone: '(212) 658-3916',
    contactMobile: '(201) 874-8593',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Important',
    comments: '',
  },
  {
    id: 15,
    assignedTo: 'John M. Michael',
    email: 'john@wonder-tix.com',
    subject: 'RD: Doris Gonzales Donation - 6/30/2024',
    contact: 'Doris Gonzales',
    contactEmail: 'dzales21@msn.com',
    contactPhone: '(305) 659-7277',
    contactMobile: '(306) 817-1859',
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
    contactEmail: 'Grad@tix.com',
    contactPhone: '(212) 449-8678',
    contactMobile: '(646) 167-6355',
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
    contactEmail: 'Ruddock99@gmail.com',
    contactPhone: '(507) 869-3151',
    contactMobile: '(515) 516-6901',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 18,
    assignedTo: 'John Doe',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Olivia Anderson Donation - 2/5/2023',
    contact: 'Olivia Anderson',
    contactEmail: 'ivoibs@yahoo.com',
    contactPhone: '(773) 595-0845',
    contactMobile: '(757) 974-4345',
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
    contactEmail: 'Ethman@mac.com',
    contactPhone: '(773) 767-9840',
    contactMobile: '(820) 727-6217',
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
    contactEmail: 'wills13@outlook.com',
    contactPhone: '(343) 128-7288',
    contactMobile: '(332) 067-4391',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 21,
    assignedTo: 'John Michael',
    email: 'JohnMichael@wonder-tix.com',
    subject: 'RD: Michael J. Jordan Donation - 6/30/2023',
    contact: 'Michael J. Jordan',
    contactEmail: 'jumpan23@gmailcom',
    contactPhone: '(206)342-8631',
    contactMobile: '(717) 550-1675',
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
    contact: 'Barthalamuel Kwitman',
    contactEmail: 'BKwitman@yahoo.com',
    contactPhone: '(248) 762-0356',
    contactMobile: '(253) 644-2182',
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
    contactEmail: 'kjames75@yahoo.com',
    contactPhone: '(212) 658-3916',
    contactMobile: '(201) 874-8593',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Important',
    comments: '',
  },
  {
    id: 24,
    assignedTo: 'John M. Michael',
    email: 'john@wonder-tix.com',
    subject: 'RD: Doris Gonzales Donation - 6/30/2024',
    contact: 'Doris Gonzales',
    contactEmail: 'dzales21@msn.com',
    contactPhone: '(305) 659-7277',
    contactMobile: '(306) 817-1859',
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
    contactEmail: 'Grad@tix.com',
    contactPhone: '(212) 449-8678',
    contactMobile: '(646) 167-6355',
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
    contactEmail: 'Ruddock99@gmail.com',
    contactPhone: '(507) 869-3151',
    contactMobile: '(515) 516-6901',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 27,
    assignedTo: 'John Doe',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Olivia Anderson Donation - 2/5/2023',
    contact: 'Olivia Anderson',
    contactEmail: 'ivoibs@yahoo.com',
    contactPhone: '(773) 595-0845',
    contactMobile: '(757) 974-4345',
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
    contactEmail: 'Ethman@mac.com',
    contactPhone: '(773) 767-9840',
    contactMobile: '(820) 727-6217',
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
    contactEmail: 'wills13@outlook.com',
    contactPhone: '(343) 128-7288',
    contactMobile: '(332) 067-4391',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 30,
    assignedTo: 'Aiden Martinez',
    email: 'AidenMartinez@wonder-tix.com',
    subject: 'Liam Reynolds Donation - 11/5/2022',
    contact: 'Liam Reynolds',
    contactEmail: 'Lray03@yahoo.ca',
    contactPhone: '(613) 555-0118',
    contactMobile: '(613) 567-5311',
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
    contactEmail: 'jumpan23@gmailcom',
    contactPhone: '(206)342-8631',
    contactMobile: '(717) 550-1675',
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
    contact: 'Barthalamuel Kwitman',
    contactEmail: 'BKwitman@yahoo.com',
    contactPhone: '(248) 762-0356',
    contactMobile: '(253) 644-2182',
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
    contactEmail: 'kjames75@yahoo.com',
    contactPhone: '(212) 658-3916',
    contactMobile: '(201) 874-8593',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Important',
    comments: '',
  },
  {
    id: 34,
    assignedTo: 'John M. Michael',
    email: 'john@wonder-tix.com',
    subject: 'RD: Doris Gonzales Donation - 6/30/2024',
    contact: 'Doris Gonzales',
    contactEmail: 'dzales21@msn.com',
    contactPhone: '(305) 659-7277',
    contactMobile: '(306) 817-1859',
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
    contactEmail: 'Grad@tix.com',
    contactPhone: '(212) 449-8678',
    contactMobile: '(646) 167-6355',
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
    contactEmail: 'Ruddock99@gmail.com',
    contactPhone: '(507) 869-3151',
    contactMobile: '(515) 516-6901',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 37,
    assignedTo: 'John Doe',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Olivia Anderson Donation - 2/5/2023',
    contact: 'Olivia Anderson',
    contactEmail: 'ivoibs@yahoo.com',
    contactPhone: '(773) 595-0845',
    contactMobile: '(757) 974-4345',
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
    contactEmail: 'Ethman@mac.com',
    contactPhone: '(773) 767-9840',
    contactMobile: '(820) 727-6217',
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
    contactEmail: 'wills13@outlook.com',
    contactPhone: '(343) 128-7288',
    contactMobile: '(332) 067-4391',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 40,
    assignedTo: 'Aiden Martinez',
    email: 'AidenMartinez@wonder-tix.com',
    subject: 'Liam Reynolds Donation - 11/5/2022',
    contact: 'Liam Reynolds',
    contactEmail: 'Lray03@yahoo.ca',
    contactPhone: '(613) 555-0118',
    contactMobile: '(613) 567-5311',
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
    contactEmail: 'jumpan23@gmailcom',
    contactPhone: '(206)342-8631',
    contactMobile: '(717) 550-1675',
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
    contact: 'Barthalamuel Kwitman',
    contactEmail: 'BKwitman@yahoo.com',
    contactPhone: '(248) 762-0356',
    contactMobile: '(253) 644-2182',
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
    contactEmail: 'kjames75@yahoo.com',
    contactPhone: '(212) 658-3916',
    contactMobile: '(201) 874-8593',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Important',
    comments: '',
  },
  {
    id: 44,
    assignedTo: 'John M. Michael',
    email: 'john@wonder-tix.com',
    subject: 'RD: Doris Gonzales Donation - 6/30/2024',
    contact: 'Doris Gonzales',
    contactEmail: 'dzales21@msn.com',
    contactPhone: '(305) 659-7277',
    contactMobile: '(306) 817-1859',
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
    contactEmail: 'Grad@tix.com',
    contactPhone: '(212) 449-8678',
    contactMobile: '(646) 167-6355',
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
    contactEmail: 'Ruddock99@gmail.com',
    contactPhone: '(507) 869-3151',
    contactMobile: '(515) 516-6901',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 47,
    assignedTo: 'John Doe',
    email: 'JohnDoe@wonder-tix.com',
    subject: 'Olivia Anderson Donation - 2/5/2023',
    contact: 'Olivia Anderson',
    contactEmail: 'ivoibs@yahoo.com',
    contactPhone: '(773) 595-0845',
    contactMobile: '(757) 974-4345',
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
    contactEmail: 'Ethman@mac.com',
    contactPhone: '(773) 767-9840',
    contactMobile: '(820) 727-6217',
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
    contactEmail: 'wills13@outlook.com',
    contactPhone: '(343) 128-7288',
    contactMobile: '(332) 067-4391',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Completed',
    priority: 'Normal',
    comments: '',
  },
  {
    id: 50,
    assignedTo: 'Aiden Martinez',
    email: 'AidenMartinez@wonder-tix.com',
    subject: 'Liam Reynolds Donation - 11/5/2022',
    contact: 'Liam Reynolds',
    contactEmail: 'Lray03@yahoo.ca',
    contactPhone: '(613) 555-0118',
    contactMobile: '(613) 567-5311',
    relatedTo: 'Call Donor',
    dueDate: getRandomDate(startDate, endDate),
    status: 'Pending',
    priority: 'Important',
    comments: '',
  },
];

export {TABLE_DATA};
