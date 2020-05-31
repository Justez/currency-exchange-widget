import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button } from '@material-ui/core'
import CurrencySelect from '../../components/currency-select'
import { CurrencyExchangeTypes } from 'types'

const useStyles = makeStyles((theme) => ({
    root: {

    },
    pick: {

    }
}));

const InputCurrencyTemplate = () => {
    const classes = useStyles();

    return (
        <Box p={1}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} container direction="row" justify="flex-end" className={classes.root}>
                    <Grid item>
                        <Button variant="outlined">
                            Exchange
                        </Button>
                    </Grid>
                </Grid>
                <CurrencySelect indicator={CurrencyExchangeTypes.out} />
            </Grid>
        </Box>
    )
}

export default InputCurrencyTemplate;
