/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { Grid, Card, Button } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AssessmentIcon from '@material-ui/icons/Assessment';
import { AccountTree, AddBox, ExitToApp, VpnKey } from "@material-ui/icons";
import ViewListIcon from "@material-ui/icons/ViewList";
import { ConfirmationNumber } from "@material-ui/icons";
import PeopleIcon from "@material-ui/icons/People";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventIcon from '@material-ui/icons/Event';
import CreateIcon from '@material-ui/icons/Create';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Typography } from "@material-ui/core";
import {NavLink, useHistory} from "react-router-dom";
import {appSelector, useAppDispatch} from "../../app/hooks";
import {openSnackbar} from "../snackbarSlice";
import {ReactNode} from 'react';
import {clearUser, selectUser} from "./userSlice";

const useStyles = makeStyles({
    root: {
        
    },
    title: {
        fontSize: 24,
        display: "flex",
        padding: "7px"
    },
    card: {
        display: "inline-flex",
    },
    icon: {
        position: "relative",
    }
});

const LinkTo = (path: string) => (props: any) => 
    <NavLink to={path} {...props} />
    

export default function AdminPanel() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useAppDispatch()

    const onLogout = async () => {
        await fetch('/logout', {credentials: "include"})
        dispatch(openSnackbar("Logged out"))
        dispatch(clearUser())
        history.push("/")
    }

    const user = appSelector(selectUser)

    type PanelProps = {
        title: string,
        icon: ReactNode
        buttons: {
            text: string,
            icon: ReactNode,
            link?: string,
            onClick?: () => void,
            disabled?: boolean
        }[]
    }
    const Panel = (props: PanelProps) => 
        <Card variant="outlined" >
            <Typography className={ classes.title } >
                {props.icon}
                {props.title}
            </Typography>
            <List>
                {props.buttons.map((e, i) => {
                    const compProps = e.link ? {component: LinkTo(e.link)} : e.onClick ? {onClick: e.onClick} : {}
                    return <ListItem key={i} disabled={e.disabled} button {...compProps}>
                        <ListItemIcon>
                            {e.icon}
                        </ListItemIcon>
                        <ListItemText primary={e.text}/>
                    </ListItem>
                })}
            </List>
        </Card>

    return <>
        <h1>Admin Panel</h1>
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={6}>
                <Panel title="Reports" icon={<AssessmentIcon fontSize="large" className={classes.icon}/>} buttons={[{
                    text: "Donations",
                    icon: <MonetizationOnIcon />
                }, {
                    text: "Ticket sales",
                    icon: <ConfirmationNumber />
                }, {
                    text: "Users",
                    icon: <PeopleIcon /> 
                }, {
                    text: "More",
                    icon: <MoreHorizIcon />
                }]} />
            </Grid>
            <Grid item xs={6}>
                <Panel title="Events" icon={<EventIcon fontSize="large" className={ classes.icon }/>} buttons={[{
                    link: "/admin/CreateEvents",
                    text: "Create an event",
                    icon: <AddBox />
                }, {
                    link: "/admin/ManageEvents",
                    text: "Manage events",
                    icon: <ViewListIcon />
                }, {
                    link: "/admin/doorlist",
                    text: "Door list",
                    icon: <MeetingRoomIcon />
                }, 
                ]} />
            </Grid>
            <Grid item xs={6}>
                <Panel title="Newsletter" icon={<CreateIcon fontSize="large" className={ classes.icon } />} buttons={[{
                    link: "/admin/email_subscriptions",
                    text: "Email Subscriptions",
                    icon: <ViewListIcon />
                }]} />
            </Grid>
            <Grid item xs={6}>
                <Panel title="Accounts" icon={<AccountBoxIcon fontSize="large" className={classes.icon}/>} buttons={[{
                    link: "/admin/changePassword",
                    text: "Change password",
                    icon: <VpnKey />
                }, {
                    link: "/admin/accountManagement",
                    text: "Manage accounts",
                    disabled: !user || !user.is_superadmin,
                    icon: <AccountTree />
                }, {
                    onClick: onLogout,
                    text: "Logout",
                    icon: <ExitToApp />
                }]} />
            </Grid>
        </Grid>
    </>
}

/* All features here should have an administrator login required */
