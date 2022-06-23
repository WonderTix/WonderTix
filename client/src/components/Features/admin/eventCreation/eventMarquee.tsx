/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { Grid, Fab, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import RemoveIcon from "@material-ui/icons/Remove";

type EventMarqueeProps = {
    id: number, 
    index: number,
    value: string,
    onRemove: (index: number) => void,
    onChange: (index: number) => any
}

const useStyles = makeStyles({
    textField: {
        margin: "3px",
    },
    icon: {
        float: "right",
    }
})

export default function EventMarquee({id, index, value, onRemove, onChange}: EventMarqueeProps) {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={11}>
                <TextField
                    size="small"
                    type="text"
                    label={`Marquee Position ${index + 1}`}
                    onChange={onChange(index)}
                    defaultValue={value}
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                />
            </Grid>
                <Grid item xs={1}>
                    <Fab
                        size="small"
                        color="secondary"
                        onClick={() => onRemove(id)}     
                        disabled={index === 0}
                        className={classes.icon}
                    >
                        <RemoveIcon />
                    </Fab>
                </Grid>
        </Grid>
    )
}
