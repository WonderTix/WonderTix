import React from 'react';
import '../../../index.css';
/**
 * @param {any} props React props to be passed to SavedDialog
 * @returns {React.ReactElement}
 */
const SavedDialog = ({
  open,
  setOpen,
  setSavedName,
}: {
  open:boolean,
  setOpen: any,
  setSavedName: any
}): React.ReactElement => {
  const [name, setName] = React.useState('');

  return (
    <>
      <div className=
        {'dialog-wrapper' + (open == true ? ' visible': ' invisible' )}>
        <div
          className={' dialog-window bg-white' +
              ' dark:bg-slate-90 rounded-lg px-6 ' +
                    'py-8 ring-1 ring-slate-900/5 shadow-xl' +
                    (open == true ? ' visible': ' invisible' )}>
          <h3 className="text-slate-900 dark:text-black
         mt-5 text-base font-medium tracking-tight">
                    Save query
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                  Provide name for the query
          </p>
          <div>
            <input className='input-field'
              placeholder='Name' id="name" value={name} onInput={ (e) => {
                // @ts-ignore
                setName(e.target.value);
              }}></input>
          </div>
          <div className=' flex flex-row content-center justify-items-end'>
            <div className='flex-1 float-left'>
            </div>
            <div className=' flex-1 flex flex-row float-right'>
              <div className=' flex btn-container'>
                <button type="button" className="btn
                btn-secondary"
                onClick={ () => {
                  setOpen(!open);
                  setName('');
                }}>
                Cancel
                </button>
              </div>
              <div className=' flex-row btn-container'>
                <button type="button" className=" btn btn-primary"
                  onClick={() => {
                    setSavedName(name);
                    setName('');
                    setOpen(false);
                  }}>
              Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedDialog;
