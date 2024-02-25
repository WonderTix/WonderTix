/* eslint-disable react/jsx-key */
import React from 'react';
import {
  accountFiltersTextField,
  accountFiltersSwitch,
} from '../../../utils/arrays';
import {useAuth0} from '@auth0/auth0-react';
/**
 * Account panal in reporting
 *
 * @param root0
 * @param root0.fetchData
 * @param root0.setOpen
 * @param root0.savedName
 * @param root0.setSavedName
 * @returns {ReactElement}
 */
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
  const {getAccessTokenSilently} = useAuth0();

  React.useEffect(() => {
    async () => {
      if (savedName === '') return;

      /* TODO
        Dynamic queries/Filter no longer being used by API.
        Need to redesign these POST requests.
      */

      const body = {
        table_name: savedName,
        query_attr: `accounts/?${parseUrl()}`,
      };

      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_1_URL}/saved_reports`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
      console.log(response.text);

      setSavedName('');
    };
  }, [getAccessTokenSilently]);

  const parseUrl = () => {
    const filters = [];
    [
      ['username', username],
      ['is_superadmin', isAdmin],
    ].forEach((filter) => {
      if (filter[1] === '' || filter[1] === false) return;

      filters.push(
        `${filter[0]}=${filter[1]}`,
      );
    });

    return filters.join('&');
  };

  const handleChange = (e) => {
    console.log(e);
    console.log(e.target.id);

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
          console.log(filter);
          return (
            <div className="form-check" key={filter.id}>
              <input key={filter.id} id={filter.id} onChange={handleChange}
                type="checkbox" className="
                  form-check-input appearance-non h-4 w-4 border
                  border-gray-300 rounded-sm bg-white
                  checked:bg-blue-600 checked:border-blue-600
                  focus:outline-none transition duration-200
                  mt-1 align-top bg-no-repeat bg-center bg-contain
                  float-left mr-2 cursor-pointer" value="" />
              <label
                className="form-check-label inline-block label-text ml-2"
                htmlFor={filter.id}>
                {filter.label}
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
