/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {useAppSelector} from '../app/hooks';
import {
  Button,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  selectCartItem,
  selectCartIds,
  selectCartSubtotal,
} from '../ticketingmanager/ticketing/ticketingSlice';
import {useNavigate} from 'react-router';
import {selectDonation} from '../ticketingmanager/donationSlice';

const toDollar = (x: number) => `$${(Math.round(x * 100) / 100).toFixed(2)}`;

const YourOrder = () => {
  const history = useNavigate();
  const cartIds = useAppSelector(selectCartIds);
  const donation = useAppSelector(selectDonation);
  const subtotal = useAppSelector(selectCartSubtotal);
  const lineItems = cartIds.map((id) => <LineItem key={id} id={id} className={''}/>);

  return (
    <Paper variant="outlined">
      <Typography variant="h4">Your order</Typography>
      <div>
        {lineItems.length > 0 ? lineItems : <p>Your cart is empty</p>}
      </div>

      <Button onClick={() => history('/events')} color="primary" variant="contained" fullWidth>
        Add more items
      </Button>

      <Divider/>

      <div>
        <Typography variant="body1">Subtotal</Typography>
        <Typography variant="body2" color="textSecondary">
          {toDollar(subtotal)}
        </Typography>
      </div>
      <div>
        <Typography variant="body2">Donation</Typography>
        <Typography variant="body2" color="textSecondary">{toDollar(donation)}</Typography>
      </div>

      <Divider/>

      <div>
        <Typography variant="body1">Total</Typography>
        <Typography variant="body1" color="textSecondary">{toDollar(donation+subtotal)}</Typography>
      </div>
    </Paper>
  );
};

const LineItem = (props: {className: string, id: number}) => {
  const data = useAppSelector((state) => selectCartItem(state, props.id));
  return data ?
        <div className={props.className}>
          <Typography>{data.qty} <b>x</b> {data.name}</Typography>
          <Typography>{toDollar(data.qty * data.price)}</Typography>
        </div> :
        <div></div>;
};

export default YourOrder;
