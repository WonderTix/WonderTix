import React, {useMemo} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {formatUSD} from '../RefundOrders/RefundOrders';
import {isTicketCartItem} from '../ticketingSlice';
import {useDiscount} from './TicketExchangeUtils';
import {DiscountDisplay, DiscountInput} from './DIscountInput';
import {TicketExchangeCartRow} from './TicketExchangeCartRow';

export const TicketExchangeCart: React.FC<{
  buttonClick?: () => void;
}> = (props) => {
  const {
    stage,
    cartItems,
    refundItems,
    setAppliedDiscount,
    updateCart,
    setRefundItems,
    eventInstances,
    ticketRestrictions,
    subscriptionTypes,
  } = useTicketExchangeContext();
  const {
    handleDiscountTextChange,
    handleRemoveDiscount,
    appliedDiscount,
    handleApplyDiscount,
    discountClicked,
    discountText,
    getDiscountTotal,
  } = useDiscount(setAppliedDiscount);
  const {buttonClick} = props;

  // @ts-ignore
  const cartItemArray = useMemo(
    () => Array.from(cartItems).map(([, item]) => item),
    [cartItems],
  );
  // @ts-ignore
  const refundItemArray = useMemo(
    () => Array.from(refundItems).map(([, item]) => item),
    [refundItems],
  );

  const refundTotal = useMemo(
    () =>
      refundItemArray.reduce(
        (acc, item) => acc - item.price - (item.fee ?? 0),
        0,
      ),
    [refundItemArray],
  );

  const [subscriptionTotal, ticketTotal, feeTotal] = useMemo(
    () =>
      cartItemArray.reduce(
        (acc, item) =>
          isTicketCartItem(item)
            ? [
                acc[0],
                acc[1] + Number(item.price) * item.qty,
                acc[2] + Number(item.fee) * item.qty,
              ]
            : [acc[0] + Number(item.price) * item.qty, acc[1], acc[2]],
        [0, 0, 0],
      ),
    [cartItemArray],
  );

  return (
    <div
      className={`flex flex-col justify-between min-w-[80px] min-h-[500px] h-full max-h-full overflow-y-auto desktop:h-fit ${
        stage === 'select_items'
          ? 'w-fit desktop:rounded-xl'
          : 'w-full rounded-xl'
      } bg-zinc-900 p-5`}
    >
      <section className='flex flex-col items-center w-full mb-5'>
        <h2 className='text-zinc-100 text-2xl font-bold w-full basis-1/6 flex justify-center'>
          Your order
        </h2>
        <div className='text-zinc-100 mt-10 w-full'>
          {refundItemArray.map((item, index) => (
            <TicketExchangeCartRow
              key={index}
              {...item}
              qtyAvailable={0}
              decrement={() =>
                setRefundItems((prev) => prev.delete(item.id) && new Map(prev))
              }
              price={-item.price}
              fee={-item.fee}
            />
          ))}
          {cartItemArray.map((item, index) => (
            <TicketExchangeCartRow
              key={index}
              {...item}
              qtyAvailable={
                isTicketCartItem(item)
                  ? Math.min(
                      eventInstances.get(item.product_id).availableseats,
                      ticketRestrictions.get(item.typeID).ticketsavailable,
                    )
                  : subscriptionTypes.get(
                      `${item.seasonid_fk}T${item.subscriptiontypeid_fk}`,
                    ).subscriptionsavailable
              }
              decrement={() => updateCart({...item, qty: -1})}
              increment={() => updateCart({...item, qty: 1})}
            />
          ))}
        </div>
      </section>
      <section className='flex flex-col items-center gap-2 bg-zinc-800 rounded-xl px-5 py-3'>
        <DiscountInput
          disabled={appliedDiscount}
          handleApplyDiscount={() =>
            handleApplyDiscount(discountText, cartItemArray)
          }
          handleDiscountTextChange={handleDiscountTextChange}
          discountText={discountText}
          handleRemoveDiscount={handleRemoveDiscount}
        />
        {appliedDiscount && (
          <DiscountDisplay
            discountTotal={getDiscountTotal(ticketTotal)}
            invalidDiscount={discountClicked && !appliedDiscount}
          />
        )}
        <p className='flex flex-row items-center gap-2 justify-between w-full'>
          <span className='flex items-center gap-1 text-zinc-100 text-sm'>
            Fee
          </span>
          <span className='text-white text-lg font-bold'>
            {formatUSD(feeTotal)}
          </span>
        </p>
        <p className='flex items-center gap-2 justify-between w-full'>
          <span className='text-zinc-100 text-sm'>Total</span>
          <span className='text-white text-lg font-bold'>
            {formatUSD(
              ticketTotal +
                subscriptionTotal +
                feeTotal -
                getDiscountTotal(ticketTotal) +
                refundTotal,
            )}
          </span>
        </p>
        {buttonClick && (
          <button
            onClick={buttonClick}
            disabled={
              (!cartItemArray.length && !refundItemArray.length) ||
              stage === 'processing'
            }
            className='px-6 py-2 rounded-2xl bg-green-500 hover:bg-green-600 disabled:bg-gray-300 shadow-xl text-white'
          >
            {stage === 'select_items' ? 'Continue' : 'Checkout'}
          </button>
        )}
      </section>
    </div>
  );
};

