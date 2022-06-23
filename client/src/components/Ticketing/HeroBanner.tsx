/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { makeStyles } from "@material-ui/core"

const HeroBanner: React.FC<{imgUrl: string}> = ({imgUrl, children}) => {
    const classes = useStyles(imgUrl)()

    return (
        <section className={classes.hero}>
            <img className={classes.heroImage} src={imgUrl} alt='people singing on stage' />
            <div className={classes.heroContent}>
                {children}
            </div>
        </section>
    )
}

export default HeroBanner

const useStyles = (imgUrl: string) => makeStyles((theme) => ({
    hero: {
        position: 'absolute',
        textAlign: 'center',
        left: '0',
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'clip',
        '&:before': {
            height: '100%',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${imgUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            filter: 'blur(10px)',
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: 'scale(1.2)'
        },
        '& h1': {
            fontWeight: 800
        }
    },
    heroContent: {
        position: 'absolute',
        color: 'white',
    },
    heroImage: {
        position: 'absolute',
        width: '55%',
        // height: '100%',
        filter: 'brightness(0.6)',
    }
}))

/*
<Card className={classes.cardRoot}>
    <CardMedia
        className={classes.heroImage}
        image={image_url} />
    <CardContent className={classes.cardContents}>
        <Typography component="h1" variant="h3" align="center" gutterBottom>{titleCase(title)}</Typography>
        <Typography variant="body1"> {
            (selectedShowing)
                ? 'Selected showing: ' + format(selectedShowing.date, "MMM dd yyyy h:mm a")
                : `Please select a showing (${tickets.length} available)`
        } </Typography>
    </CardContent>
</Card>
*/
