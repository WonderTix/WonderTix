/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { Grid, GridSpacing } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'

interface SplitPaneProps {
    left: React.ReactNode,
    right: React.ReactNode,
    spacing?: GridSpacing
}
const SplitPane = ({left, right, spacing}: SplitPaneProps) => {
    const classes = useStyles()
    return (
        <Grid container spacing={spacing ? spacing : 2} className={classes.root}>
            <Grid item xs={8}>
                {left}
            </Grid>
            <Grid item xs={4}>
                {right}
            </Grid>
        </Grid>
    )
}

export default SplitPane

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(1),
        minHeight: '100vh',
    },
}))


