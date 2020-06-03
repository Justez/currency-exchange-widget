import React from 'react';
import { Box, Grid } from '@material-ui/core';


import CurrencySelect from 'components/currency-select-field';
import { CurrencyExchangeTypes } from 'types';
import AmountInputField from 'components/amount-input-field';


const OutCurrencyTemplate = () => {
    return (
        <Box p={3} pb={7}>
            <Grid container direction="row" justify="space-between">
                <Grid item>
                    <CurrencySelect pocketDirection={CurrencyExchangeTypes.out} />
                </Grid>
                <Grid item>
                    <AmountInputField pocketDirection={CurrencyExchangeTypes.out} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default OutCurrencyTemplate;
