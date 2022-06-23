/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {Button} from "@material-ui/core";
import {Form} from "react-final-form";
import {TextField} from "mui-rff";
import {useHistory} from "react-router";
import {useAppDispatch} from "../app/hooks";
import {openSnackbar} from "../v1/snackbarSlice";

export default function ChangePassword() {

    const history = useHistory()
    const dispatch = useAppDispatch()

    const onLogout = async () => {
        await fetch('/logout', {credentials: "include"})
        dispatch(openSnackbar("Password changed"))
        history.push("/")
    }

    const onSubmit = async (formInfo: any) => {
        console.log(formInfo)
        const res = await fetch('/api/passwordChange', {
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(formInfo)
        });
        if (res.ok) {
            await onLogout()
        }
    }

    return <>
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit}) => <>
                <TextField name="username" label="username" variant="outlined"/>
                <TextField name="password" label="password" variant="outlined"/>
                <TextField name="newPassword" label="new password" variant="outlined"/>
                <TextField name="passwordConfirm" label="confirm new password" variant="outlined"/>
                <Button type="submit" onClick={handleSubmit} color="primary" variant="contained">Go</Button>
            </>} />
    </>
}
