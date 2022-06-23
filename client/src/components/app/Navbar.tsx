/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import theme from '../theme'
import CartIconLink from '../features/ticketing/cart/CartLink'
import { NavLink, useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '30px',
            marginBottom: '30px',
        },
    })
)

export default function Navbar()  {
    const classes = useStyles(theme)
    const location = useLocation()
    const [_, tabname] = location.pathname.split('/')
    let currtab = 0;
    if (tabname) {
        currtab = {
            "events": 0,
            "admin": 1,
            "login": 1,
            "donate": 2,
        }[tabname] || 0
    }

    return (
        <Paper square className={classes.navbar}>
            <Tabs value={currtab}>
                <Tab label="Events" component={NavLink} to="/events" />
                <Tab label="Admin" component={NavLink} to="/admin" />
                <Tab label="Donate" component={NavLink} to="/donate" />
            </Tabs>
            <CartIconLink />
        </Paper>
    )
}

