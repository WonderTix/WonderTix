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
 * Date:     7/16/2021
 * Revision: 7/16/2021
 */

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import RequireLogin from '../../components/RequireLogin';
import {useState} from 'react';

export default function EmailSubscriptions()
{
   const perform_fetch = async (url_append:string) =>
   {
      const response = await fetch("/api/" + url_append,
      {
         credentials: "include",
         method: 'GET',
         headers:
         {
            'Content-Type': 'application/json',
         },
      });
      return response.json();
   }

   // Todo(jesse): If we decide to use this at all... test on other browsers
   const base64_to_blob = (base64:string, datatype?:string) =>
   {
      var binary = atob(base64);
      var bytes = new Uint8Array(binary.length);
      for(var it = 0;
          it < binary.length;
          ++it)
      {
         bytes[it] = binary.charCodeAt(it);
      }
      const blob = new Blob([bytes], {type:datatype});
      return URL.createObjectURL(blob);
   }

   const download = (filename:string, data:string) =>
   {
      var a = document.createElement("a");
      a.setAttribute("download", filename);
      var blob = base64_to_blob(btoa(data));
      a.setAttribute("href", blob);
      a.click();      
   }

   const newsletter_download = async (event:React.FormEvent) =>
   {
      event.preventDefault();

      var json_data;
      try
      {
         json_data = await perform_fetch("email_subscriptions/newsletter");
      }
      catch(error)
      {
         console.error(error.message);
         // Todo(jesse): Do something
         return;
      }

      var string_builder = "";
      for(var it_index in json_data)
      {
         var it = json_data[it_index].email;
         if(+it_index === json_data.length - 1)
         {
            string_builder += it;
         }
         else
         {
            string_builder += it + ",";
         }
      }

      download("newsletter.csv", string_builder);
   }

   const volunteer_download = async (event:React.FormEvent) =>
   {
      event.preventDefault();
      
      var json_data;
      try
      {
         json_data = await perform_fetch("email_subscriptions/volunteers");
      }
      catch(error)
      {
         console.error(error.message);
         // Todo(jesse): Do something
         return;
      }
      
      var string_builder = "";
      for(var it_index in json_data)
      {
         var it = json_data[it_index].email;
         if(+it_index === json_data.length - 1)
         {
            string_builder += it;
         }
         else
         {
            string_builder += it + ",";
         }
      }

      download("volunteers.csv", string_builder);
   };

   return (
      <RequireLogin>
      <div style={{display: "flex", height: "100vh", width: "100%"}}>
         <Paper style={{flexGrow: 8, height: "100%", margin: "10px", paddingLeft: "5%", paddingTop: "50px", paddingRight: "10%"}} variant="outlined">
            <form>
               <Grid container spacing={1}>
               <Grid item xs={3}><Button onClick={newsletter_download} variant="contained" name="newsletter list" >Newsletter List</Button></Grid>
               <Grid item xs={3}><Button onClick={volunteer_download} variant="contained" name="volunteer list" >Volunteer List</Button></Grid>
               </Grid>
            </form>
         </Paper>
      </div>
      </RequireLogin>
   )
}
