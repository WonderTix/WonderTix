/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { NavLink } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { makeStyles, Theme } from '@material-ui/core'
import { selectNumInCart } from '../ticketingSlice'
import { appSelector } from '../../../app/hooks'

const CartLink = () => {
    const classes = useStyles()
    const itemCount = appSelector(selectNumInCart)
    return (
        <NavLink to="/cart" className={classes.root}>
            <ShoppingCartIcon />
            Cart
            {(itemCount > 0) && <span className={classes.itemCount}>{itemCount}</span>}
        </NavLink>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        textDecoration: 'none',
        alignItems: 'center',
        color: theme.palette.text.primary,
    },
    itemCount: {
        background: theme.palette.primary.main,
        borderRadius: '8px',
        width: '10px',
        textAlign: 'center',
        padding: '3px 5px',
        margin: theme.spacing(0.5),
        color: 'white',
        fontWeight: 600
    }
}))

export default CartLink

