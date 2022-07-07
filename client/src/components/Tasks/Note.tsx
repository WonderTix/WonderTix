import * as React from 'react';
/**
 * @param {any} props Properties to be passed through to Item
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

/**
 * @return {React.ReactElement} HTMLElement for Item
 */
const OutlinedCard = (): React.ReactElement => {
  const [isOpen, setOpen] = React.useState(false);
  const card = (
    <React.Fragment>
      <div className='p-3'>
        <div className='text-xl font-bold'>
                  Notes
        </div>
        <div className = "note-card">
          <Item>
            <div >
                      Notes 1
            </div>
          </Item>
          <Item>
            <div >
                      Notes 2
            </div>
          </Item>
          <Item>
            <div >
                      Notes 3
            </div>
          </Item>
          <Item>
            <div >
                      Notes 4
            </div>
          </Item>
          <Item>
            <div >
                      Notes 4
            </div>
          </Item>
          <Item>
            <div >
                      Notes 4
            </div>
          </Item>
          <Item>
            <div >
                      Notes 4
            </div>
          </Item>
          <Item>
            <div >
                      Notes 4
            </div>
          </Item>
        </div>
        <div>
          <input type="text" placeholder='Note'
            className="input input-lg mt-4 w-full  border
             border-zinc-300 p-3 mb-3 rounded-lg "
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setOpen(true);
            console.log(isOpen);
          }}
          className='bg-blue-600 text-white px-5 py-2
          rounded-xl shadow-xl hover:scale-105 duration-300
           hover:bg-blue-800 ml-3'
        >
          Save
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <div className='border border-zinc-200 rounded-lg p-4
    shadow-lg overflow-auto mb-12'
    >

      <div > {card}  </div>

    </div>
  );
};

export default OutlinedCard;
