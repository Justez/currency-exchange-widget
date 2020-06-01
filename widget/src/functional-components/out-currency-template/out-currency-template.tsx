import React from 'react';
import { Box, Grid, Button } from '@material-ui/core'
import CurrencySelect from 'components/currency-select'
import { CurrencyExchangeTypes } from 'types'

const OutCurrencyTemplate = () => {
    return (
        <Box p={3}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} container direction="row" justify="flex-end">
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

export default OutCurrencyTemplate;
