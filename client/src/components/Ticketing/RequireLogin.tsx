/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {ReactNode, useEffect, useState} from "react";
import {Redirect} from "react-router";
import {useAppDispatch} from "../app/hooks";
import {setUser} from "../v1/admin/userSlice";

type RequireLoginProps = {
    children: ReactNode
    redirectTo?: string
}

const RequireLogin = ({children, redirectTo}: RequireLoginProps) => {
    const [queried, setQueried] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const dispatch = useAppDispatch()

    const getUser = async () => {
        if (queried) return;
        const result = await fetch('/api/user', {
            credentials: "include",
            method: "GET"
        })
        if (result.ok) {
            const user = await result.json()
            dispatch(setUser(user))
            console.log('getting user required')
        }
        setAuthenticated(result.status === 200);
        setQueried(true)
   }

    useEffect(() => {
        getUser()
        return () => {
            setQueried(false)
            setAuthenticated(false)
        }
   }, [])

    return <>
        {queried && authenticated && children}
        {queried && !authenticated && <Redirect to={`/login${redirectTo ? redirectTo : ""}`}/>}
    </>
}

export default RequireLogin;
