import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { actions as currencyRatesActions } from 'store/modules/currency-rates';
import { actions as currencyActions } from 'store/modules/currencies';
import { actions as pocketsActions } from 'store/modules/pockets';
import { Select, MenuItem, Typography, Grid } from '@material-ui/core';
import { Pockets, Currencies, CurrencyExchangeTypes } from 'types';
import { getSelectedCurrencies } from 'store/modules/currencies/selectors';
import { getPockets } from 'store/modules/pockets/selectors';
import { State } from 'store';
import { find, propEq, pathOr, pipe } from 'ramda';
import mapIcons from 'helpers/mapIcons';
import { getLoadingStatus } from 'store/modules/loading/selectors';
import Loader from 'components/loader';

interface DispatchProps {
    actions: {
        currencies: typeof currencyActions;
    };
}
interface StateProps {
    pockets: Pockets;
    currencies: Currencies;
    loadingCurrencyRates: boolean;
    proccessingExchange: boolean;
}

interface OwnProps {
    indicator: CurrencyExchangeTypes;
}

type Props = DispatchProps & StateProps & OwnProps;

const CurrencySelect = ({ actions, pockets, currencies, indicator, loadingCurrencyRates, proccessingExchange }: Props) => {
    const selectedCurrency = currencies[indicator];
    const setSelectedCurrency = (event: ChangeEvent<{ value: unknown; }>) =>
        actions.currencies.setSelectedCurrency({ [indicator]: event.target.value });

    const getPocketFromSelected = pipe(
        find(propEq('currency', selectedCurrency)),
        pathOr(null, ['sum'])
    )(pockets);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Select
                    autoWidth
                    disabled={loadingCurrencyRates}
                    onChange={setSelectedCurrency}
                    id="choose-out-currency"
                    value={selectedCurrency}
                >
                    {pockets.map(({ currency }) => (
                        <MenuItem key={currency} value={currency}>
                            <Typography variant="h5">
                                {currency.toUpperCase()}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item>
                {proccessingExchange ? (
                    <Loader size={15} thickness={5} />
                ) : (
                    <Typography>
                        Balance{' '}{getPocketFromSelected}{mapIcons(selectedCurrency)}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
}

const loadingRatesSelector = getLoadingStatus([
    currencyRatesActions.getCurrencyRatesRequest.toString(),
]);

const proccessingExchangeSelector = getLoadingStatus([
    pocketsActions.placeExchangeRequest.toString(),
]);

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    actions: {
        currencies: bindActionCreators(currencyActions, dispatch),
    },
});

const mapStateToProps = (state: State): StateProps => ({
    pockets: getPockets(state),
    currencies: getSelectedCurrencies(state),
    loadingCurrencyRates: loadingRatesSelector(state),
    proccessingExchange: proccessingExchangeSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);