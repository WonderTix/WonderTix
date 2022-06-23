/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { Form } from 'react-final-form'
import { TextField, KeyboardDateTimePicker, Select } from 'mui-rff'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import DateFnsUtils from "@date-io/date-fns";
import { Button, makeStyles, MenuItem, Paper, Theme, Typography } from '@material-ui/core'
import { ValidationErrors } from 'final-form';


interface TicketType {
    id: number,
    name: string,
    price: number,
    concessions: number,
}

export interface NewEventData {
    eventname: string,
    eventdescription: string,
    isPublished: boolean,
    image_url: string,
    showings: {
        id?: number,
        DateTime: Date,
        ticketTypeId: string,
        totalseats: number
    }[]
}

function validate(formData: any): ValidationErrors {
    return (formData.showings?.length > 0) ? undefined : {error: 'Need one or more showings added'}
}

const initialState = {
    showings: [{
        DateTime: undefined,
        ticketType: undefined,
        ticketTypeId: undefined
    }]
}

interface EventFormProps {
    onSubmit: (formData: NewEventData) => void
    ticketTypes: TicketType[],
    initialValues?: Partial<NewEventData>,
    editMode?: boolean
}
export default function EventForm({onSubmit, ticketTypes, initialValues, editMode}: EventFormProps) {
    const classes = useStyles()

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues ?? initialState}
            mutators={{...arrayMutators}}
            validate={validate}
            render={({
                handleSubmit,
                form: { mutators: { push, pop }},
                pristine,
                submitting,
            }) => (
                <form className={classes.root} onSubmit={handleSubmit}>
                    <Paper className={classes.section}>
                        <Typography variant='h4' component='h2'>
                            Event Information
                        </Typography>
                        <TextField className={classes.field} name='eventname' label='Event Title' required={true} />
                        <TextField className={classes.field} name='eventdescription' label='Description' />
                        <TextField className={classes.field} name='image_url' label='Image URL' />
                    </Paper>

                    <Paper className={classes.section}>
                        <Typography variant='h4' component='h2'>
                            Showings
                        </Typography>
                        <Typography variant='body1'>
                            You can configure occurances of this event below. To add more, click the "Add Showing" button.
                        </Typography>
                        
                        <div className={classes.showingList}>
                            <FieldArray name='showings'>
                                {({ fields }) =>
                                    fields.map((name, i) => (
                                        <Paper variant='outlined' key={name} className={classes.showing}>
                                            <label>Show # {i + 1}</label>
                                            <div className={classes.fieldGroup}>
                                                <KeyboardDateTimePicker
                                                    name={`${name}.DateTime`}
                                                    label='Event Date & Time'
                                                    required
                                                    dateFunsUtils={DateFnsUtils}
                                                    disabled={editMode}
                                                />
                                                <TextField
                                                    name={`${name}.totalseats`}
                                                    label='Seating Capacity'
                                                    type='number'
                                                    required
                                                    disabled={editMode}
                                                />
                                                <Select
                                                    name={`${name}.ticketTypeId`}
                                                    label='Select Ticket Type'
                                                    required
                                                    disabled={editMode}
                                                >
                                                    {ticketTypes.map(t =>
                                                        <MenuItem key={t.id} value={t.id}>
                                                            {`${t.name}: ${t.price} (+ ${t.concessions} concessions)`}
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </div>
                                            <Button
                                                variant='contained'
                                                onClick={() => fields.remove(i)}
                                                disabled={editMode}
                                            >
                                                Delete
                                            </Button>
                                        </Paper>
                                    ))
                                }
                            </FieldArray>
                        </div>
                        
                        <div className={classes.buttonGroup}>
                            <Button
                                color='secondary'
                                variant='outlined'
                                type='button'
                                onClick={() => push('showings', undefined)}
                                disabled={editMode}
                            >
                                Add Showing
                            </Button>
                        </div>
                    </Paper>

                    <Button 
                        className={classes.submitBtn} 
                        variant='contained' 
                        color='primary' 
                        type='submit'
                        disabled={!editMode && (submitting || pristine)}
                    >
                        {editMode ? 'Save Changes' : 'Save New Event'}
                    </Button>
                </form>
            )}
        />
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: '0 auto',
        marginBottom: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
    },
    section: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: `${theme.spacing(5)}px ${theme.spacing(8)}px`,
        '& h2': { marginBottom: theme.spacing(2)},
    },
    showingList: { marginTop: theme.spacing(5) },
    field: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    buttonGroup: {
        width: '50%',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'space-around',
    },
    showing: {
        margin: `${theme.spacing(1)}px 0`,
        display: 'flex',
        padding: theme.spacing(2),
        flexDirection: 'column',
        '& > button': { alignSelf: 'end'},
    },
    fieldGroup: {
        margin: `${theme.spacing(2)}px 0`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > *': {
            margin: `0 ${theme.spacing(1)}px`
        },
        '& :first-child': {
            marginLeft: 0
        }
    },
    submitBtn: {
        marginLeft: 'auto',
    }
}))
