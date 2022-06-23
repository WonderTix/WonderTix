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
 * Date:     7/5/2021
 * Revision: 7/15/2021
 */

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import {useState} from 'react';

export default function NewsletterCreate()
{

   return (
      <div style={{display: "flex", height: "100vh", width: "100%"}}>
         <Paper style={{flexGrow: 8, height: "100%", margin: "10px", paddingLeft: "5%", paddingTop: "50px", paddingRight: "10%"}} variant="outlined">
            <Typography variant="h3">Newsletter Creation!</Typography>
            <hr/>
            <form>
               <Grid container spacing={1}>
               <Grid item xs={3}><Button variant="contained" color="primary" style={{width: "100%"}}>ADD</Button> </Grid>
               <Grid item xs={3}><Button variant="contained" color="primary" style={{width: "100%"}}>PREVIEW</Button> </Grid>
               <Grid item xs={3}><Button variant="contained" color="primary" style={{width: "100%"}}>FINISH</Button> </Grid>
               <Grid item xs={3}><Button variant="contained" color="secondary" style={{width: "100%"}}>DISCARD</Button> </Grid>
               </Grid>
            </form>
         </Paper>
      </div>
   )
}
