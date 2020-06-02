import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Box, Grid, Button } from '@material-ui/core';

import CurrencySelect from 'components/currency-select-field';
import { CurrencyExchangeTypes } from 'types';
import AmountInputField from 'components/amount-input-field';
import { actions as pocketsActions } from 'store/modules/pockets';
import { getLoadingStatus } from 'store/modules/loading/selectors';
import { State } from 'store';

interface DispatchProps {
    actions: {
        pockets: typeof pocketsActions;
    };
}

interface StateProps {
    loading: boolean;
}

type Props = DispatchProps & StateProps;

const InCurrencyTemplate = ({ actions, loading }: Props) => {
    const handleExchange = () => actions.pockets.placeExchange();

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
                    <Button fullWidth disabled={loading} variant="contained" onClick={handleExchange} color="primary">
                        Exchange
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

const loadingSelector = getLoadingStatus([
    pocketsActions.placeExchangeRequest.toString(),
]);

const mapStateToProps = (state: State): StateProps => ({
    loading: loadingSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    actions: {
        pockets: bindActionCreators(pocketsActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InCurrencyTemplate);
