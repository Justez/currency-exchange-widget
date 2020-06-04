import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Button } from '@material-ui/core';

import { State } from 'store';
import { CurrencyRates } from 'types';
import { actions as pocketsActions } from 'store/modules/pockets';
import { actions as currencyRatesActions } from 'store/modules/currency-rates';
import { getLoadingStatus } from 'store/modules/loading/selectors';
import { getCurrencyRates } from 'store/modules/currency-rates/selectors';

interface DispatchProps {
    actions: {
        pockets: typeof pocketsActions;
    };
}

interface StateProps {
    isSubmittingExchange: boolean;
    isLoadingCurrencyRates: boolean;
    currencyRates: CurrencyRates;
}

type Props = DispatchProps & StateProps;

const InCurrencyTemplate = ({ actions, isSubmittingExchange, currencyRates, isLoadingCurrencyRates }: Props) => {
    const disabled = isSubmittingExchange || !currencyRates.rate || isLoadingCurrencyRates
    
    const handleExchange = () => actions.pockets.placeExchange();

    return (
        <Button fullWidth disabled={disabled} variant="contained" onClick={handleExchange} color="secondary">
            {'Exchange'}
        </Button>
    );
}

const submittingExchange = getLoadingStatus([
    pocketsActions.placeExchangeRequest.toString(),
]);

const loadingRatesSelector = getLoadingStatus([
    currencyRatesActions.getCurrencyRatesRequest.toString(),
]);

const mapStateToProps = (state: State): StateProps => ({
    isSubmittingExchange: submittingExchange(state),
    currencyRates: getCurrencyRates(state),
    isLoadingCurrencyRates: loadingRatesSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    actions: {
        pockets: bindActionCreators(pocketsActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InCurrencyTemplate);
