import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Box, Grid, Button } from '@material-ui/core'

import CurrencySelect from 'components/currency-select-field'
import { CurrencyExchangeTypes } from 'types'
import AmountInputField from 'components/amount-input-field';
import { actions as pocketsActions } from 'store/modules/pockets';

interface DispatchProps {
    actions: {
        pockets: typeof pocketsActions;
    };
}

const InCurrencyTemplate = ({ actions }: DispatchProps) => {
    const handleExchange = () =>
        actions.pockets.placeExchange()

    return (
        <Box p={3} mt={2} pb={0}>
            <Grid container direction="column" spacing={6} justify="space-between">
                <Grid item container direction="row" justify="space-between">
                    <Grid item>
                        <CurrencySelect indicator={CurrencyExchangeTypes.in} />
                    </Grid>
                    <Grid item>
                        <AmountInputField pocketDirection={CurrencyExchangeTypes.in} />
                    </Grid>
                </Grid>
                <Grid item>
                    <Button fullWidth variant="contained" onClick={handleExchange} color="primary">
                        Exchange
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    actions: {
        pockets: bindActionCreators(pocketsActions, dispatch),
    },
});

export default connect(undefined, mapDispatchToProps)(InCurrencyTemplate);
