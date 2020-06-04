import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { find, propEq, pathOr, pipe } from 'ramda';
import { Dispatch, bindActionCreators } from 'redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Select, MenuItem, Typography, Grid } from '@material-ui/core';

import { State } from 'store';
import { Pockets, Currencies, CurrencyExchangeTypes } from 'types';
import { actions as pocketsActions } from 'store/modules/pockets';
import { actions as currencyActions } from 'store/modules/currencies';
import { actions as currencyRatesActions } from 'store/modules/currency-rates';
import { getPockets } from 'store/modules/pockets/selectors';
import { getLoadingStatus } from 'store/modules/loading/selectors';
import { getSelectedCurrencies } from 'store/modules/currencies/selectors';
import Loader from 'components/loader';
import mapIcons from 'helpers/mapIcons';

interface DispatchProps {
    actions: {
        currencies: typeof currencyActions;
    };
}
interface StateProps {
    pockets: Pockets;
    currencies: Currencies;
    isLoadingRates: boolean;
    isSubmittingExchange: boolean;
}

interface OwnProps {
    pocketDirection: CurrencyExchangeTypes;
}

type Props = DispatchProps & StateProps & OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
    balance: {
        color: theme.palette.secondary.main,
    },
}));

const CurrencySelect = ({ actions, pockets, currencies, pocketDirection, isLoadingRates, isSubmittingExchange }: Props) => {
    const classes = useStyles();

    const selectedCurrency = currencies[pocketDirection];
    const setSelectedCurrency = (event: ChangeEvent<{ value: unknown; }>) =>
        actions.currencies.setSelectedCurrency({ [pocketDirection]: event.target.value });

    const getPocketFromSelected = pipe(
        find(propEq('currency', selectedCurrency)),
        pathOr(null, ['sum'])
    )(pockets);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Select
                    autoWidth
                    disabled={isLoadingRates}
                    onChange={setSelectedCurrency}
                    id={`choose-${pocketDirection}-currency`}
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
                {isSubmittingExchange ? (
                    <Loader size={15} thickness={5} />
                ) : (
                    <Typography variant="body2" className={pocketDirection === CurrencyExchangeTypes.out ? classes.balance : ''}>
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

const submittingExchangeSelector = getLoadingStatus([
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
    isLoadingRates: loadingRatesSelector(state),
    isSubmittingExchange: submittingExchangeSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);