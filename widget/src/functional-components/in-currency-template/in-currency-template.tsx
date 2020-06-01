import React from 'react';
import { Box, Grid } from '@material-ui/core'
import CurrencySelect from 'components/currency-select'
import { CurrencyExchangeTypes } from 'types'

const InCurrencyTemplate = () => {
    return (
        <Box p={3}>
            <Grid item container direction="column" spacing={2}>
                <CurrencySelect indicator={CurrencyExchangeTypes.in} />
            </Grid>
        </Box>
    )
}

export default InCurrencyTemplate;
