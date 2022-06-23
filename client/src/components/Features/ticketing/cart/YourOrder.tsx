/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { appSelector } from '../../../app/hooks'
import {
    Button,
    Divider,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core'
import {
    selectCartItem,
    selectCartIds,
    selectCartSubtotal,
} from '../ticketingSlice'
import { useHistory } from 'react-router';
import { selectDonation } from '../../donationSlice';

const toDollar = (x: number) => `$${(Math.round(x * 100) / 100).toFixed(2)}`

const YourOrder = () => {
    const classes = useStyles()
    const history = useHistory()

    const cartIds = appSelector(selectCartIds)
    const donation = appSelector(selectDonation)
    const subtotal = appSelector(selectCartSubtotal)
    const lineItems = cartIds.map(id => <LineItem className={classes.lineItem} key={id} id={id}/>)
        
    return (
        <Paper className={classes.root} variant="outlined">
            <Typography variant="h4">Your order</Typography>
            <div className={classes.items}>
                {lineItems.length > 0 ? lineItems : <p className={classes.empty}>Your cart is empty</p>}
            </div>

            <Button onClick={() => history.push('/events')} color="primary" variant="contained" fullWidth>
                Add more items
            </Button>

            <Divider className={classes.divider}/>

            <div className={classes.subtotal}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body2" color="textSecondary">
                    {toDollar(subtotal)}
                </Typography>
            </div>
            <div className={classes.subtotal}>
                <Typography variant="body2">Donation</Typography>
                <Typography variant="body2" color="textSecondary">{toDollar(donation)}</Typography>
            </div>

            <Divider className={classes.divider}/>
            
            <div className={classes.subtotal}>
                <Typography variant="body1">Total</Typography>
                <Typography variant="body1" color="textSecondary">{toDollar(donation+subtotal)}</Typography>
            </div>
        </Paper>
    )
}

const LineItem = (props: {className: string, id: number}) => {
    const data = appSelector(state => selectCartItem(state, props.id))
    return  data
        ?   <div className={props.className}>
                <Typography>{data.qty} <b>x</b> {data.name}</Typography>
                <Typography>{toDollar(data.qty * data.price)}</Typography>
            </div>
        : <div></div>
}

const useStyles = makeStyles({
    root: {
        minWidth: "20%",
        marginRight: "30px",
        paddingLeft: "2%",
        paddingRight: "2%",
        paddingTop: "30px"
    },
    items: {
        margin: '30px 0',
    },
    lineItem: {
        marginTop: '15px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        '& :first-child': {
            maxWidth: '75%',
        },
        '& :last-child': {
            marginLeft: 'auto',
        },
    },
    empty: {color: '#adb5bd', textAlign: 'center'},
    subtotal: {display: "flex", justifyContent: "space-between"},
    divider: {marginBottom: "30px", marginTop: "30px"},
})


export default YourOrder
