/* eslint-disable react/jsx-key */
import React from 'react';
import {
  accountFiltersTextField,
  accountFiltersSwitch,
} from '../../../utils/arrays';

const AccountsPanel = ({
  fetchData,
  setOpen,
  savedName,
  setSavedName,
}: {
  fetchData: any,
  setOpen: any,
  savedName: any,
  setSavedName: any,
}) => {
  const [username, setUsername] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    if (savedName === '') return;

    /* TODO
      Dynamic queries/Filter no longer being used by API.
      Need to redesign these POST requests.
    */

    const body = {
      table_name: savedName,
      query_attr: `accounts/?${parseUrl()}`,
    };

    fetch(process.env.REACT_APP_ROOT_URL + `/api/saved_reports`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    }).then((res) => console.log(res));

    setSavedName('');
  });

  const parseUrl = () => {
    const filters = [];
    [
      ['username', username],
      ['is_superadmin', isAdmin],
    ].forEach((filter) => {
      if (filter[1] === '' || filter[1] === false) return;

      filters.push(
          `filters[${filter[0]}]${
          typeof filter[1] === 'string' ? '[$contains]' : '[$eq]'
          }=${filter[1]}`,
      );
    });

    return filters.join('&');
  };

  const handleChange = (e) => {
    e.preventDefault();

    switch (e.target.id) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'is_superadmin':
        setIsAdmin(e.target.checked);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {accountFiltersTextField.map((filter) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <input type="text" placeholder={filter.label}
            key={filter.id}
            id={filter.id}
            className="input w-full max-w-xs border
             border-zinc-300 p-3  rounded-xl "
            onChange={handleChange} />
        );
      })}
      <div className='mt-2'>
        {accountFiltersSwitch.map((filter) => {
          return (

            <div className="form-control">
              <label className="label cursor-pointer">
                <input key={filter.id} onChange={handleChange}
                  type="checkbox" className="checkbox"/>
                <span className="label-text ml-2">{filter.label}</span>
              </label>
            </div>
          );
        })}
      </div>
      <div className='flex flex-col gap-2 mt-2'>
        <button className='bg-blue-600 text-white px-6 py-2
              rounded-xl shadow-xl hover:scale-105 duration-300
               hover:bg-blue-800' onClick={() => fetchData(parseUrl())}>
                 Run</button>
        <button className='bg-blue-600 text-white px-6 py-2
              rounded-xl shadow-xl hover:scale-105 duration-300
               hover:bg-blue-800' onClick={() => setOpen(true)}>Save</button>
      </div>
    </div>
  );
};

export default AccountsPanel;
