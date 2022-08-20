/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
-----TENTATIVE SQL QUERIES (NOT FINALIZED)-----

--Query to pull a doorlist for a specific event name and date
SELECT Customer.name, Customer.seatingAccom, Reservation.NumTickets
FROM Customer INNER JOIN Reservation ON Reservation.CustID=Customer.ID
WHERE Reservation.eventDate="date" AND Reservation.eventName="name";

--Query to find all the emails of customers signed up for the newsletter
SELECT email
FROM Customer
WHERE newsletter = true;

--Query to find donors to give badges to customers (excludes anonymous people)
----@threshold is a filler variable for a parameter fed in by user
select cust.name, cust.email, cust.phone, dono.amount
from Customer as cust join Donations as dono on cust.ID = dono.DonorID
where @threshold < (select DonorID, sum(amount) from donations group by DonorID);

--Query to find donations made on current day
----CURRENT_DATE should be a pgsql function that returns the current date
----See: https://www.postgresql.org/docs/8.2/functions-datetime.html
select *
from Donations
where donoDate = CURRENT_DATE;

--Query to find donations made on current day modified to show customer information if non anonymous donation
----Not 100% sure if this works how I think it does. Should return empty columns for customer information
----if the anon field is set to true.
select dono.*,
(case when anon = false then cust.name end) as customer,
(case when anon = false then cust.email end) as email,
(case when anon = false then cust.phone end) as phone,
(case when anon = false then cust.address end) as 'address'
from Donations as dono join Customer as cust on donorID = cust.ID
where donoDate = CURRENT_DATE;

--Query for tickets sold by show between a given date range
----@day1 and @day2 are placeholders for parameters fed in by user
----BETWEEN then should work for a range of dates, but can change to "<" or ">" if it doesn't
select play.name, count(tix.TicketNo)
from Ticket as tix join Showtime as shwtm on tix.eventID = shwtm.ID
join Plays as play on shwtm.playID = play.ID
where play.active = true and shwtm.eventDate between @day1 and @day2;

--Query to count the tickets sold by show
select count(ticket.TicketNo)
from Ticket ticket join Showtime showtime on ticket.EventID = showtime.ID


--Query to get all active events
select shwtm.id, plays.playname, plays.playdescription, shwtm.eventdate, shwtm.starttime, shwtm.totalseats, shwtm.availableseats
from showtimes as shwtm join plays on shwtm.playid = plays.id
where plays.active = true

--New doorlist query to make use of exisitng tables in the database
select cust.id as "custid", cust.custname as "name", cust.vip, cust.donorbadge, cust.seatingaccom, 
plays.id as "playid", plays.playname, shwtm.id as \"eventid\", shwtm.eventdate, shwtm.starttime, count(cust.id) as "num_tickets" 
from showtimes as shwtm left join plays on shwtm.playid = plays.id left join 
tickets as tix on shwtm.id = tix.eventid left join tickets as tix2 on tix.ticketno = tix2.ticketno 
join customers as cust on tix.custid = cust.id 
where shwtm.id = $1 
group by cust.id, name ,plays.id, plays.playname, shwtm.id, shwtm.eventdate, shwtm.starttime 
order by name
