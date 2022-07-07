import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * @return {React.ReactElement}
 */
const OutlinedCard = (): React.ReactElement => {
  const [toDate, setToDate] = React.useState(null);
  const [fromDate, setFromDate] = React.useState(null);
  const [status, setStatus] = React.useState();
  const [isOpen, setOpen] = React.useState(false);

  /**
   * @param {any} props Properties to be passed to Item
   * @return {React.ReactElement} HTMLElement for Item
   */
  const Item = (props: any): React.ReactElement => {
    const {sx, ...other} = props;
    return (
      <div
        className='py-2 border border-zinc-200 rounded-lg
         p-2 mt-2 text-zinc-600'
        sx={{

          ...sx,
        }}
        {...other}
      />
    );
  };

  const card = (
    <React.Fragment>
      <div className='p-3'>
        <div className='font-bold text-xl '>
                  Filter tasks by:
        </div>
        <div>
          <div className='flex flex-row'>
            <div className='flex flex-col items-start mt-2 mr-4 '>
              <DatePicker selected={fromDate}
                onChange={(newValue) => {
                  setFromDate(newValue);
                }} value={fromDate}
                className='border border-zinc-200 text-sm
                px-2 py-2 rounded-lg bg-transparent
                ' placeholderText="From" />
            </div>
            <div className='flex flex-col items-start mt-2'>
              <DatePicker selected={toDate}
                onChange={(newValue) => {
                  setToDate(newValue);
                }} value={toDate}
                className='border border-zinc-200 text-sm
                px-2 py-2 rounded-lg' placeholderText="To"/>
            </div>
          </div>
        </div>
        <div>
          <select id="set-status" className="select w-full
           max-w-xs bg-white border border-zinc-300
           rounded-lg p-3 mt-4 text-zinc-600" onChange={((newStatus: any) => {
            setStatus(newStatus);
            console.log(status);
          })}>
            <option disabled selected>Status:</option>
            <option value={0}>Not Started</option>
            <option value={1}>In Progress</option>
            <option value={2}>Completed</option>
          </select>

        </div>
        <button
          onClick={() => {
            setOpen(true);
            console.log(isOpen);
          }}
          className='bg-blue-600 mt-4 text-white px-5 py-2
            rounded-xl shadow-xl hover:scale-105 duration-300
             hover:bg-blue-800'
        >
            Confirm
        </button>
        <div className = "">
          <Item>
            <div>
              Task 1
            </div>
          </Item>
          <Item>
            <div>
              Task 2
            </div>
          </Item>
          <Item>
            <div>
              Task 3
            </div>
          </Item>
          <Item>
            <div>
              Task 4
            </div>
          </Item>
          <Item>
            <div>
              Task 5
            </div>
          </Item>
          <Item>
            <div>
              Task 6
            </div>
          </Item>
          <Item>
            <div>
              Task 7
            </div>
          </Item>
          <Item>
            <div>
              Task 8
            </div>
          </Item>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <div className='border border-zinc-200 rounded-lg p-4
    shadow-lg overflow-auto'
    >

      <div > {card}  </div>

    </div>
  );
};

export default OutlinedCard;
