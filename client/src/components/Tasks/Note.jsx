import * as React from 'react';
import Box, {BoxProps} from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@material-ui/core';


function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
        sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
            color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
            border: '1px solid',
            borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
            p: 1,
            m: 1,
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
            ...sx,
        }}
        {...other}
        />
    );
}

const card = (
    <React.Fragment>
        <CardContent>
        <Typography variant="h5" component="div">
                Notes 
        </Typography>
        <div class = "note-card">
            <Item>
                <Typography variant="body2">
                    Notes 1
                </Typography>
            </Item>
            <Item>
                <Typography variant="body2">
                    Notes 2
                </Typography>
            </Item>
            <Item>
                <Typography variant="body2">
                    Notes 3
                </Typography>
            </Item>
            <Item>
                <Typography variant="body2">
                    Notes 4
                </Typography>
            </Item>
            <Item>
                <Typography variant="body2">
                    Notes 4
                </Typography>
            </Item>
            <Item>
                <Typography variant="body2">
                    Notes 4
                </Typography>
            </Item>
            <Item>
                <Typography variant="body2">
                    Notes 4
                </Typography>
            </Item>
            <Item>
                <Typography variant="body2">
                    Notes 4
                </Typography>
            </Item>
        </div>
        <div>
            <TextField
                className="note-text"
                label="Note"
                variant="outlined"
                multiline={true}
                rows={2}
                maxRows={4}
                size="small"
                sx={{ my: 2 }}
                fullWidth={true}
            />
        </div>
        </CardContent>
        <CardActions>
        <Button onClick={() => setOpen(true)} variant="contained" size="small">Save </Button>
        </CardActions>
    </React.Fragment>
);



export default function OutlinedCard() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Box sx={{ display: 'grid', mt: 4, width: '100%', height: 450, maxWidth: 360, bgcolor: 'background.paper' }}>
            <Card variant="outlined">{card}</Card>
        </Box>
        </div>  
    );
}

