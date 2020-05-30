import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

const InputCurrencyTemplate = () => {
    const classes = useStyles();

    return (
        <Box p={1}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} container direction="row" justify="flex-end" className={classes.root}>
                    <Grid item>
                        Exchange
                    </Grid>
                </Grid>
                <Grid item>
                    Main
                </Grid>
            </Grid>
        </Box>
    )
}
export default InputCurrencyTemplate