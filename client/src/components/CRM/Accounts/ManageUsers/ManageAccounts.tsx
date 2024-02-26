import {
  DataGrid,
  GridColumns,
  GridCellParams,
  GridCellEditCommitParams,
} from '@mui/x-data-grid';
import React, {ReactElement, useEffect, useState} from 'react';
import {useAppDispatch} from '../../../Ticketing/app/hooks';
import {openSnackbar} from '../../../Ticketing/ticketingmanager/snackbarSlice';
import {useAuth0} from '@auth0/auth0-react';

/**
 * Manage Users accounts, reset password, delete account and add new account
 *
 * @returns {ReactElement}
 */
const ManageAccounts = (): ReactElement => {
  const [rows, setRows] = useState([]);
  const [username, setUsername] = useState('');
  const [auth0Id, setAuth0Id] = useState('');

  const dispatch = useAppDispatch();
  const {getAccessTokenSilently} = useAuth0();

  const getAccounts = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      });
      const response = await fetch(process.env.REACT_APP_API_2_URL + `/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const accounts = await response.json();
        setRows(accounts);
      } else {
        setRows([]);
        dispatch(openSnackbar('Unauthorized'));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const deleteUser = (userid: number) => async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      });
      const response = await fetch(
        process.env.REACT_APP_API_2_URL + `/user/${userid}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        await getAccounts();
        dispatch(openSnackbar('User deleted'));
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const submitNewUser = async (e: any) => {
    e.preventDefault();
    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });
    const response = await fetch(process.env.REACT_APP_API_2_URL + `/user`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({username, auth0_id: auth0Id}),
    });
    if (response.ok) {
      const responseJson = await response.json();
      if (responseJson.error) {
        console.error(responseJson.error);
        dispatch(openSnackbar('User already exists'));
        return;
      }
      await getAccounts();
      dispatch(openSnackbar('User created'));
      setUsername('');
      setAuth0Id('');
    }
  };

  const editUser = async (userid: number, user: Record<string, unknown>) => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });
    await fetch(process.env.REACT_APP_API_2_URL + `/user/${userid}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    dispatch(openSnackbar('User changed'));
  };

  const renderButton = (params: GridCellParams) => (
    <button
      className='px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm disabled:opacity-25'
      disabled={params.row.is_superadmin}
      onClick={deleteUser(+params.id.toString())}
    >
      Delete
    </button>
  );

  const columns: GridColumns = [
    {
      field: 'userid',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
      editable: true,
    },
    {
      field: 'auth0_id',
      headerName: 'Auth0 ID',
      editable: true,
      width: 200,
      valueFormatter: (params) => params.value || '(Double-click to edit)',
    },
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: renderButton,
      width: 130,
    },
  ];

  const editCommit = (params: GridCellEditCommitParams) =>
    editUser(+params.id.toString(), {[params.field]: params.value});

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-purple-400 mb-10 pb-4'>
            Manage Accounts
          </h1>
        </div>
        <div>
          <div className='ml-2 text-xl font-bold mb-2 text-zinc-700 '>
            Edit Accounts
          </div>
          <div className='bg-white shadow-xl p-4 rounded-xl'>
            <DataGrid
              getRowId={(data) => data.userid}
              rowsPerPageOptions={[10]}
              columns={columns}
              rows={rows}
              disableSelectionOnClick
              onCellEditCommit={editCommit}
              autoHeight
              style={{width: '100%'}}
              pageSize={10}
            />
          </div>
          <div className='mt-7 ml-2 text-xl font-bold mb-2 text-zinc-700'>
            Create New Account
          </div>
          <div className='bg-white p-4 rounded-xl shadow-xl'>
            <form className='flex flex-col w-full gap-3'>
              <input
                className='input w-full border border-zinc-300 p-2 rounded-lg'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
              />
              <input
                className='input w-full border border-zinc-300 p-2 rounded-lg'
                value={auth0Id}
                onChange={(e) => setAuth0Id(e.target.value)}
                placeholder='Auth0 ID'
              />
              <button
                className='bg-blue-500 text-white hover:bg-blue-600 py-1 rounded-xl disabled:opacity-40'
                type='submit'
                disabled={!username || !auth0Id}
                onClick={submitNewUser}
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccounts;
