/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { titleCase, militaryToCivilian, dayMonthDate } from '../utils';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export interface InstanceProps {
    id: string,
    eventName: string,
    eventdate: string,
    starttime: string,
    desc?: string,
    image_url: string,
}
export default function InstanceCard(props: InstanceProps) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image_url}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {titleCase(props.eventName)}
                    </Typography>
                    <Typography variant="body2" gutterBottom color="textPrimary" component="p">
                        {`${dayMonthDate(props.eventdate)}, ${militaryToCivilian(props.starttime)}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {(props.desc) ? props.desc : 'No description available'}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link to={`/admin/doorlist/${props.id}`}>
                    <Button size="small" variant="contained" color="primary">
                        Select
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
