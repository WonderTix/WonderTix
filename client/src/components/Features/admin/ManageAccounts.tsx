/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {Button, makeStyles, Paper, TextField, Typography} from '@material-ui/core';
import {DataGrid, GridColumns, GridCellParams, GridCellEditCommitParams, MuiEvent} from '@material-ui/data-grid';
import {SyntheticEvent, useEffect, useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {openSnackbar} from '../snackbarSlice';

const useStyles = makeStyles(theme => ({
    newuser: {
        padding: "20px",
        marginTop: "20px",
        marginLeft: "20px",
        width: "15em",
        display: "flex",
        flexDirection: "column"
    },
    root: {
        display: "flex",
        [theme.breakpoints.down('md')]: {
            flexDirection: "column",
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: "row",
        },
        alignItems: "flex-end"
    },
    item: {
        marginBottom: "10px"
    }, 
    datagrid: {
        height: "40em",
        width: "100%"
    }
}))

export default function ManageAccounts() {

    const [rows, setRows] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const getAccounts = async () => {
        const r = await fetch('/api/users', {
            credentials: 'include',
            method: 'GET',
        })
        if (r.ok) {
            const accounts = await r.json()
            setRows(accounts)
        } else {
            setRows([])
            dispatch(openSnackbar('Unauthorized'))
        }
    }
    useEffect(() => {getAccounts()}, [])

    const deleteUser = (userid: number) => async () => {
        const r = await fetch('/api/deleteUser', {
            credentials: 'include',
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: userid})
        })
        if (r.ok) {
            await getAccounts()
            dispatch(openSnackbar('User deleted'))
        }
    }

    const submitNewUser = async (e: any) => {
        e.preventDefault()
        const r = await fetch('/api/newUser', {
            body: JSON.stringify({username, password}),
            credentials: "include",
            method: 'post',
            headers: {'Content-type': 'application/json'}
        })
        if (r.ok) {
            const j = await r.json()
            if (j.error) {
                console.log(j.error)
                dispatch(openSnackbar('User already exists'))
                return
            }
            await getAccounts()
            dispatch(openSnackbar('User created'))
            setUsername('')
            setPassword('')
        }
    }

    const editUser = async (userid: number, user: {}) => {
        await fetch('/api/changeUser', {
            body: JSON.stringify({id: userid, ...user}),
            credentials: "include",
            method: 'post',
            headers: {'Content-type': 'application/json'}
        })
        dispatch(openSnackbar('User changed'))
    }

    const renderButton = (params: GridCellParams) => 
        <Button 
            disabled={params.row.is_superadmin} 
            onClick={deleteUser(+params.id.toString())} 
            variant="contained" 
            color="secondary">
                Delete
        </Button>

    const columns: GridColumns = [{
        field: 'id',
        headerName: 'ID',
        width: 100
    }, {
        field: 'username',
        headerName: 'Username',
        width: 150,
        editable: true
    }, {
        field: 'password',
        headerName: 'Password',
        editable: true,
        width: 200,
        valueFormatter: params => params.value || "(Double-click to edit)"

    }, {
        field: 'delete',
        headerName: 'Delete',
        renderCell: renderButton,
        width: 130
    }]

    const editCommit = (params: GridCellEditCommitParams, event: MuiEvent<SyntheticEvent<Element, Event>>) => 
        editUser(+params.id.toString(), {[params.field]: params.value})

    return <>
        <Typography variant="h3" gutterBottom>Manage Accounts</Typography>
        <div className={classes.root}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    disableSelectionOnClick
                    onCellEditCommit={editCommit}
                    autoHeight
                    style={{width: "100%"}}
                    pageSize={10} />
            <Paper variant="outlined" className={classes.newuser}>
                <form>
                    <TextField className={classes.item} fullWidth value={username} onChange={e => setUsername(e.target.value)} label="username" variant="outlined" />
                    <TextField className={classes.item} fullWidth value={password} onChange={e => setPassword(e.target.value)} label="password" variant="outlined" />
                    <Button type="submit" disabled={!username || !password} fullWidth onClick={submitNewUser} variant="contained" color="primary">create user</Button>
                </form>
            </Paper>
        </div>
    </>
}
