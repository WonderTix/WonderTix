/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { useState } from 'react'
import { appSelector, useAppDispatch } from '../../../app/hooks'
import CartRow from './CartItem'
import { Backdrop, Button, Divider, Fade, Modal, Paper, Theme, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { toDollarAmount } from '../../../utils'
import { removeTicketFromCart, removeAllTicketsFromCart, selectCartContents } from '../ticketingSlice'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        subtotalRow: {
            display: 'flex',
            alignItems: 'center',
            height: '3.5em',
            margin: '10px',
            paddingTop: '10px 15px',
        },
        subtotal: {
            marginLeft: 'auto',
        },
        cartContents: {
            margin: '30px 0',
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalContent: {
            padding: '15px',
        },
        actionButtons: {
            width: '100%',
            display: 'flex',
            marginTop: theme.spacing(4),
            '& :last-child': {
                marginLeft: 'auto',
                marginRight: 0,
            },
        },
        btnGroup: {
            display: 'flex',
            margin: '10px auto',
            justifyContent: 'space-around',
        },
        emptyMessage: {
            textAlign: 'center',
            color: '#adb5bd',
            marginTop: theme.spacing(10),
            marginBottom: theme.spacing(10),
            fontSize: theme.typography.fontSize * 1.3
        }
    })
)

type Item = {price: number, qty: number}
const itemCost = (item: Item) => item.price * item.qty
const subtotalReducer = (acc: number, item: Item) => acc + itemCost(item)

const Cart = () => {
    const history = useHistory();

    enum RemoveContext
    {
        single,
        all
    }

    const dispatch = useAppDispatch()
    const classes = useStyles()
    const items = appSelector(selectCartContents)
    const subtotal = items.reduce(subtotalReducer, 0)
    const [modalOpen, setModalOpen] = useState(false)
    const [targetItem, setTargetItem] = useState<number|null>(null)
    const [removeContext, setRemoveContext] = useState(RemoveContext.single);
    const [removeContextMessage, setRemoveContextMessage] = useState("");
    
    const resetModal = () => {
        setTargetItem(null)
        setModalOpen(false)
    }

    const handleRemove = () => {
        if(removeContext === RemoveContext.single) {
            if (targetItem) {
                dispatch(removeTicketFromCart(targetItem))
                resetModal()
            }
        }
        else if(removeContext === RemoveContext.all) {
            dispatch(removeAllTicketsFromCart());
            resetModal();
        }
    }

    const removeAllCartItems = () => {
        setRemoveContext(RemoveContext.all);
        setRemoveContextMessage("all items");
        setModalOpen(true);
    }

    const displayModal = (id: number) => {
        setRemoveContext(RemoveContext.single);
        setRemoveContextMessage("this");
        setTargetItem(id)
        setModalOpen(true)
    }

    const navigateToCompleteOrder = () => {
        history.push("/completeorder");
    }
    
    return (
        <section>
            <div className={classes.cartContents}>
                <Typography component='h1' variant='h3'>My Cart</Typography>
                {(items.length > 0)
                    ? items.map(data => <CartRow key={data.product_id} item={data} removeHandler={displayModal} />)
                    : <Typography variant='body1' className={classes.emptyMessage}>There's nothing in your cart</Typography>
                }
            </div>

            <Divider orientation='horizontal' />

            <div className={classes.subtotalRow}>
                <Typography component='h2' variant='h6'>Subtotal:</Typography>
                <Typography variant='body1' className={classes.subtotal}>{toDollarAmount(subtotal)}</Typography>
            </div>

            <div className={classes.actionButtons}>
                <Button variant="contained" color="secondary" disabled={items.length === 0} onClick={removeAllCartItems}>Empty Cart</Button>
                <Button variant="contained" color="primary" disabled={items.length === 0} onClick={navigateToCompleteOrder}>Proceed To Checkout</Button>
            </div>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, }}
            >
                <Fade in={modalOpen}>
                    <Paper className={classes.modalContent}>
                        <Typography variant='h6' align='center' component='h2' id='modal-title'>Confirm removal</Typography>
                        <p id='modal-description'>Do you want to remove {removeContextMessage} from your cart?</p>
                        <div className={classes.btnGroup}>
                            <Button variant="outlined" onClick={resetModal}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleRemove}>
                                Yes, remove
                            </Button>
                        </div>
                    </Paper>
                </Fade>
            </Modal>
        </section>
    )
}

export default Cart
