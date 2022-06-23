/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
// This implementation should replace the EventRow component in the EventsList
import { titleCase } from '../../utils'
import { Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Event } from '../ticketing/ticketingSlice'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: '1em',
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            minHeight: '300px',
        }
    },
    cardMedia: {
        minWidth: '400px',
        justifySelf: 'end',
    },
    cardContent: {
        padding: '1.8em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    callToAction: {
        alignSelf: 'center',
        textDecoration: 'none',
        [theme.breakpoints.down('md')]: {
            marginTop: '1em'
        },
        [theme.breakpoints.up('md')]: {
            marginTop: 'auto'
        },
        width: "100%"
    },
}))

const EventCard = (props: Event) => {
    const theme = useTheme()
    const classes = useStyles(theme)

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <Typography component='h2' variant='h5'>{titleCase(props.title)}</Typography>
                <Typography variant='body1'>
                    {(props.description)
                        ? props.description
                        : 'No description available.'
                    }
                </Typography>
                <Link to={`/events/${props.id}`} className={classes.callToAction}>
                    <Button variant="contained" color="primary" fullWidth>
                        See Showings
                    </Button>
                </Link>
            </CardContent>
            <CardMedia
                className={classes.cardMedia}
                image={props.image_url}
                title={`Photo of ${props.title} performance`}
            />
        </Card>
    )
}

export default EventCard
