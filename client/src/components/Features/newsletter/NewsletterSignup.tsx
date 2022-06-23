/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
/* Creator:  Jesse Coyle [jecoyle@pdx.edu]
 * Date:     6/5/2021
 * Revision: 7/15/2021
 */

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useState} from 'react';

export default function NewsletterSignup()
{
   const [first_name_error, set_first_name_error] = useState(false);
   const [last_name_error, set_last_name_error] = useState(false);
   const [email_error, set_email_error] = useState(false);
   const [signup_check, set_signup_check] = useState(false);
   const [form_data, set_form_data] = useState(
   {
      first_name: "",
      last_name: "",
      email: "",
      news_opt: false,
      volunteer_opt: false,
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
   });

   const perform_fetch = async (url_append:string, data:any) =>
   {
      const response = await fetch("/api/" + url_append,
      {
         method: 'POST',
         headers:
         {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      });
      return response.json();
   }

   const submit = async (event:React.FormEvent) =>
   {
      event.preventDefault();

      const email_regular_expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!email_regular_expression.test(form_data.email))
      {
         set_email_error(true);
         return;
      }
      else
      {
         set_email_error(false);
      }

      const signup_valid = form_data.news_opt || form_data.volunteer_opt;
      set_signup_check(!signup_valid);
      if(!signup_valid) return;

      // Todo(jesse): Consolodate below into a more general usable `does_account_exist` procedure?
      var email_exists = false;
      try
      {
         const data = {email: form_data.email};
         const json_data = await perform_fetch("newsletter/count", data);
         email_exists = +json_data[0].count > 0;
      }
      catch(error)
      {
         console.error(error.message);
         // Todo(jesse): Do something
         return;
      }

      if(email_exists)
      {
         try
         {
            const data = {news_opt: form_data.news_opt, volunteer_opt: form_data.volunteer_opt, email: form_data.email};
            perform_fetch("newsletter/update", data);
         }
         catch(error)
         {
            console.error(error.message);
            // Todo(jesse): Do something
            return;
         }
      }
      else
      {
         const data =
         {
            custname: form_data.first_name + " " + form_data.last_name,
            email: form_data.email,
            phone: form_data.phone,
            custaddress: form_data.address,
            news_opt: form_data.news_opt,
            volunteer_opt: form_data.volunteer_opt,
         };

         try
         {
            perform_fetch("newsletter/insert", data);
         }
         catch(error)
         {
            console.error(error.message);
            // Todo(jesse): Do something
            return;
         }
      }
   };

   const form_data_change = (event:React.ChangeEvent<HTMLInputElement>) =>
   {
      set_form_data({...form_data, [event.target.name]: event.target.value});
   };
   const form_data_checkbox_change = (event:React.ChangeEvent<HTMLInputElement>) =>
   {
      set_form_data({...form_data, [event.target.name]: event.target.checked});
      set_signup_check(form_data.news_opt || form_data.volunteer_opt);
   };

   const snackbar_close = (event?:React.SyntheticEvent, reason?:string) =>
   {
      set_signup_check(false);
   };

   return (
      <div style={{display: "flex", height: "100vh", width: "100%"}}>
         <Paper style={{flexGrow: 8, height: "100%", margin: "10px", paddingLeft: "5%", paddingTop: "50px", paddingRight: "10%"}} variant="outlined">
            <Typography variant="h3">Newsletter Sign-up!</Typography>
            <hr/>
            <form onSubmit={submit}>
               <Grid container spacing={1}>
               <Grid item xs={6}><TextField required error={first_name_error} name="first_name" label="First Name" value={form_data.first_name} onChange={form_data_change} variant="outlined" fullWidth/> </Grid>
               <Grid item xs={6}><TextField required error={last_name_error} name="last_name" label="Last Name" value={form_data.last_name} onChange={form_data_change} variant="outlined" fullWidth/> </Grid>
               <Grid item xs={12}><TextField type="email" required error={email_error} name="email" label="Email" value={form_data.email} onChange={form_data_change} variant="outlined" fullWidth/> </Grid>
               <Grid item xs={6}><Typography variant="h6" >Email Subscriptions*:</Typography></Grid>
               <Grid item xs={6}><Checkbox name="news_opt" value={form_data.news_opt} onChange={form_data_checkbox_change} />Playhouse Newsletter</Grid>
               <Grid item xs={6}></Grid>
               <Grid item xs={6}><Checkbox name="volunteer_opt" value={form_data.volunteer_opt} onChange={form_data_checkbox_change} />Volunteer List</Grid>
               <Grid item xs={12}><TextField name="address" value={form_data.address} onChange={form_data_change} label="Street Address" variant="outlined" fullWidth/> </Grid>
               <Grid item xs={6}><TextField name="city" value={form_data.city} onChange={form_data_change} label="City" variant="outlined" fullWidth/> </Grid>
               <Grid item xs={6}><TextField name="state" value={form_data.state} onChange={form_data_change} label="State" variant="outlined" fullWidth/> </Grid>
               <Grid item xs={6}><TextField name="zip" value={form_data.zip} onChange={form_data_change} label="Zip Code" variant="outlined" fullWidth/> </Grid>
               <Grid item xs={6}><TextField name="phone" value={form_data.phone} onChange={form_data_change} label="Phone" variant="outlined" fullWidth/> </Grid>
               <Grid item xs={6}><Button type="submit" variant="contained" color="primary" style={{width: "50%"}}>Sign-up</Button> </Grid>
               </Grid>
            </form>
         </Paper>
         <Snackbar open={signup_check} autoHideDuration={6000} onClose={snackbar_close}>
            <Alert onClose={snackbar_close} severity="error">
               Please select one newsletter.
            </Alert>
         </Snackbar>
      </div>

   )
}
