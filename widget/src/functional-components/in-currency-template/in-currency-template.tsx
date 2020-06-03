import React from 'react';
import { Box, Grid } from '@material-ui/core';

import CurrencySelect from 'components/currency-select-field';
import ExchangeButton from 'components/exchange-button';
import { CurrencyExchangeTypes } from 'types';
import AmountInputField from 'components/amount-input-field';

const InCurrencyTemplate = () => (
    <Box p={3} mt={2} pb={0}>
        <Grid container direction="column" spacing={6} justify="space-between">
            <Grid item container direction="row" justify="space-between">
                <Grid item>
                    <CurrencySelect pocketDirection={CurrencyExchangeTypes.in} />
                </Grid>
                <Grid item>
                    <AmountInputField pocketDirection={CurrencyExchangeTypes.in} />
                </Grid>
            </Grid>
            <Grid item>
                <ExchangeButton />
            </Grid>
        </Grid>
    </Box>
);

export default InCurrencyTemplate;
