import React from 'react';
import { Box, Grid, Button } from '@material-ui/core'
import CurrencySelect from 'components/currency-select-field'
import { CurrencyExchangeTypes } from 'types'
import AmountInputField from 'components/amount-input-field';

const OutCurrencyTemplate = () => {
    return (
        <Box p={3}>
            <Grid container direction="column" spacing={5}>
                <Grid item xs={12} container direction="row" justify="flex-end">
                    <Button variant="outlined">
                        Exchange
                    </Button>
                </Grid>
                <Grid item container direction="row" justify="space-between">
                    <Grid item>
                        <CurrencySelect indicator={CurrencyExchangeTypes.out} />
                    </Grid>
                    <Grid item>
                        <AmountInputField pocketDirection={CurrencyExchangeTypes.out} />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OutCurrencyTemplate;
