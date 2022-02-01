export const anchors = [
  { title: "Accounts", link: "/accounts" },
  { title: "Contacts", link: "/contacts" },
  { title: "Reporting", link: "/reporting" },
  { title: "Tasks", link: "/tasks" },
];

export const accountFilters = [
  { id: "account-name", label: "Account Name" },
  { id: "account-id", label: "Account ID" },
];

export const contactFilters = [
  { id: "contact-name", label: "Contact Name" },
  { id: "contact-email", label: "Contact Email" },
  { id: "contact-phone", label: "Contact Phone" },
  { id: "contact-address", label: "Contact Address" },
];

export const accountSorters = [
  { value: "name-ascending", label: "Name, Ascending" },
  { value: "name-descending", label: "Name, Descending" },
  { value: "id-ascending", label: "ID, Ascending" },
  { value: "id-descending", label: "ID, Descending" },
];

export const contactSorters = [
  { value: "name-ascending", label: "Name, Ascending" },
  { value: "name-descending", label: "Name, Descending" },
  { value: "email-ascending", label: "Email, Ascending" },
  { value: "email-descending", label: "Email, Descending" },
  { value: "address-ascending", label: "Address, Ascending" },
  { value: "address-descending", label: "Address, Descending" },
];

export const donationSorters = [
  { value: "date-most-recent", label: "Date, Most Recent" },
  { value: "date-longest-ago", label: "Date, Longest Ago" },
  { value: "amount-ascending", label: "Amount, Ascending" },
  { value: "amount-descending", label: "Amount, Descending" },
  { value: "name-ascending", label: "Name, Ascending" },
  { value: "name-descending", label: "Name, Descending" },
];

export const accountHeaders = [
  { field: "id", headerName: "ID" },
  { field: "username", headerName: "Username" },
  { field: "admin", headerName: "Admin" },
];
export const contactHeaders = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "phone", headerName: "Phone" },
  { field: "address", headerName: "Address" },
  { field: "newsletter", headerName: "Newsletter" },
  { field: "donorbadge", headerName: "Donor" },
  { field: "seating", headerName: "Seating" },
  { field: "vip", headerName: "VIP" },
  { field: "volunteer", headerName: "Volunteer" },
];
export const donationHeaders = [
  { field: "donationid", headerName: "ID" },
  { field: "anonymous", headerName: "Anonymous" },
  { field: "amount", headerName: "Amount" },
  { field: "name", headerName: "Name" },
  { field: "frequency", headerName: "Frequency" },
  { field: "date", headerName: "Date" },
];
