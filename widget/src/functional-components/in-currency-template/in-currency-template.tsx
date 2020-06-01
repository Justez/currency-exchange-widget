import React from 'react';
import { Box, Grid } from '@material-ui/core'
import CurrencySelect from 'components/currency-select-field'
import { CurrencyExchangeTypes } from 'types'
import AmountInputField from 'components/amount-input-field';

const InCurrencyTemplate = () => {
    return (
        <Box p={3} mt={2}>
            <Grid item container direction="row" justify="space-between">
                <Grid item>
                    <CurrencySelect indicator={CurrencyExchangeTypes.in} />
                </Grid>
                <Grid item>
                    <AmountInputField pocketDirection={CurrencyExchangeTypes.in} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default InCurrencyTemplate
