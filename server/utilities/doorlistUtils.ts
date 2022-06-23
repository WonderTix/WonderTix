export const formatDoorlistResponse = (rowdata) => ({
  eventname: rowdata[0].eventname,
  eventdate: rowdata[0].eventdate,
  starttime: rowdata[0].starttime,
  data: rowdata.map((datum) => {
    const {
      custid,
      name,
      vip,
      donorbadge,
      seatingaccom,
      num_tickets,
      checkedin,
      ticketno,
    } = datum;
    return {
      id: custid,
      name,
      vip,
      donorbadge,
      accomodations: seatingaccom,
      num_tickets,
      checkedin,
      ticketno,
    };
  }),
});
