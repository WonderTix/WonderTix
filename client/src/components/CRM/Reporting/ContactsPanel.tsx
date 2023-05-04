import React from 'react';
import {
  contactFiltersTextField,
  contactFiltersSwitch,
} from '../../../utils/arrays';
import {useAuth0} from '@auth0/auth0-react';
/**
 * Contact panal in reporting
 *
 * @param root0
 * @param root0.fetchData
 * @param root0.setOpen
 * @param root0.savedName
 * @param root0.setSavedName
 * @returns {ReactElement}
 */
const ContactsPanel = ({
  fetchData,
  setOpen,
  savedName,
  setSavedName,
}: {
  fetchData: any,
  setOpen: any,
  savedName: any,
  setSavedName: any,
}): React.ReactElement => {
  const [custname, setCustname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [isVip, setIsVip] = React.useState(false);
  const [isVolunteerList, setIsVolunteerList] = React.useState(false);
  const {getAccessTokenSilently} = useAuth0();

  React.useEffect(() => {
    (async () => {
      if (savedName === '') return;

      /* TODO
        Dynamic queries/Filter no longer being used by API.
        Need to redesign these POST requests.
      */

      const token = await getAccessTokenSilently({
        audience: 'https://localhost:8000',
        scope: 'admin',
      });

      const body = {
        table_name: savedName,
        query_attr: `contacts/?${parseUrl()}`,
      };

      fetch(process.env.REACT_APP_ROOT_URL + `/api/saved_reports`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }).then((res) => console.log(res));

      setSavedName('');
    });
  }, [getAccessTokenSilently]);

  const parseUrl = () => {
    const filters = [];
    [
      ['custname', custname],
      ['email', email],
      ['phone', phone],
      ['address', address],
      ['vip', isVip],
      ['"volunteer list"', isVolunteerList],
    ].forEach((filter) => {
      if (filter[1] === '' || filter[1] === false) return;

      filters.push(
          `${filter[0]}=${filter[1]}`,
      );
    });

    return filters.join('&');
  };

  const handleChange = (e) => {
    e.preventDefault();

    switch (e.target.id) {
      case 'custname':
        setCustname(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      case 'vip':
        setIsVip(e.target.checked);
        break;
      case 'volunteer list':
        setIsVolunteerList(e.target.checked);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {contactFiltersTextField.map((filter) => {
        return (
          <input type="text" placeholder={filter.label}
            key={filter.id}
            id={filter.id}
            className="input w-full max-w-xs border
             border-zinc-300 p-3 mb-3 rounded-xl "
            onChange={handleChange} />
        );
      })}
      <div className='mt-2 ml-2'>
        {contactFiltersSwitch.map((filter) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div className="form-control" key={filter.id}>
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

export default ContactsPanel;

