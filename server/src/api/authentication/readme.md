For the CRM:
	Authentication is not ready yet, there are a few things still left to be implemented before we can test it.
We are using passportJS authentication middleware with a passport-local authentication strategy to mirror the ticketing authentication.
We'll be piggybacking off of express for tokens and sessions so that we can store login info in our cookies. Session creation and using the 
authentication code will happen in server.ts, but nothing is there for now since authentication is not ready yet.
Due to the nature of authentication, individual components can't be tested until all components have been written and connected. 
So far, the strategy, user serialization and deserialization have been implemented alongside basic queries for user login data. 
We will need to create the express session and have local piggyback off of the sessions express creates for storing user authentication info.
However, in the case of an application crash or restart, we do need either a db or a table for storing sessions information. 
This also means creating tokens. Our db or table in the currently existing db should ideally have the sessionid, token expiration, 
and data (cookie data, user id) in some format, such as in a JSON. Those would be the three basic columns we would need.
I've included a lot of resources in the #Authentication channel in the wondertix discord. 

For Ticketing:  
	Ticketing authentication works, but is not an ideal implementation of passport/passport-local.
There is no table/db for session data in case of a crash or application restart. Instead of referencing back to tokens
and cookie stored session data for checking user authentication when browsing different webpages, a function is called instead.
All of the authentication code is in server.ts on the ticketing side, which obfuscates much of how the authentication code works.
That's why we can't just copy over the ticketing side code; it needs to be refactored and then built upon. 