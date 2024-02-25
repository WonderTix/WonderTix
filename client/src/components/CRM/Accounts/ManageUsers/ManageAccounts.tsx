/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {DataGrid, GridColumns, GridCellParams, GridCellEditCommitParams} from '@mui/x-data-grid';
import React, {ReactElement, useEffect, useState} from 'react';
import {useAppDispatch} from '../../../Ticketing/app/hooks';
import {openSnackbar} from '../../../Ticketing/ticketingmanager/snackbarSlice';
import {useAuth0} from '@auth0/auth0-react';

/**
 * Manage Users accounts, reset password, delete account and add new account
 *
 * @returns {ReactElement}
 */
export default function ManageAccounts(): ReactElement {
  /** @param {any} rows - Accounts table rows */
  const [rows, setRows] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const {getAccessTokenSilently} = useAuth0();

  const getAccounts = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      });
      const response = await fetch(process.env.REACT_APP_API_1_URL + `/accounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        method: 'GET',
      });
      if (response.ok) {
        const accounts = await response.json();
        setRows(accounts.data);
      } else {
        setRows([]);
        dispatch(openSnackbar('Unauthorized'));
      }
    } catch (error) {
      console.log(error.message);
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
      const response = await fetch(process.env.REACT_APP_API_1_URL + `/accounts/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        method: 'DELETE',
      });
      if (response.ok) {
        await getAccounts();
        dispatch(openSnackbar('User deleted'));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const submitNewUser = async (e: any) => {
    e.preventDefault();
    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });
    const response = await fetch(process.env.REACT_APP_API_1_URL + `/accounts`, {
      body: JSON.stringify({username, password}),
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const responseJson = await response.json();
      if (responseJson.error) {
        console.log(responseJson.error);
        dispatch(openSnackbar('User already exists'));
        return;
      }
      await getAccounts();
      dispatch(openSnackbar('User created'));
      setUsername('');
      setPassword('');
    }
  };

  const editUser = async (userid: number, user: Record<string, unknown>) => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });
    await fetch(process.env.REACT_APP_API_1_URL + '/changeUser', {
      body: JSON.stringify({id: userid, ...user}),
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
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
      field: 'id',
      headerName: 'ID',
      width: 100,
    }, {
      field: 'username',
      headerName: 'Username',
      width: 150,
      editable: true,
    }, {
      field: 'password',
      headerName: 'Password',
      editable: true,
      width: 200,
      valueFormatter: (params) => params.value || '(Double-click to edit)',
    }, {
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
              pageSize={10}/>
          </div>
          <div className='mt-7 ml-2 text-xl font-bold mb-2 text-zinc-700'>
            Create New Account
          </div>
          <div className='bg-white p-4 rounded-xl shadow-xl'>
            <form className='flex flex-col w-full gap-3'>
              <input
                className="input w-full border border-zinc-300 p-2 rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
              <input
                className="input w-full border border-zinc-300 p-2 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
              <button
                className='bg-blue-500 text-white hover:bg-blue-600 py-1 rounded-xl disabled:opacity-40'
                type="submit"
                disabled={!username || !password}
                onClick={submitNewUser}
              >
                create user
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
