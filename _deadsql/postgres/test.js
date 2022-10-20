const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool()
const tables = [
    "customers", "discounts", "donations", "event_instances", 
    "events", "exdoorlist", "linkedtickets", "reservation", "seasons", 
    "task", "task_notes", "tickets", "tickettype", "users"
]
for (let i = 0; i < tables.length; i++) {
    var table = "SELECT * FROM ".concat(tables[i]);
    console.log("Performing query: " + table);
    pool.query(table, (err, res) => {
        if (err) {
            console.log("Query failed: " + table)
            console.error(err);
        }
        else {
            console.log("Query successful!");
        }
    })
}
pool.end()
