import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Chip, Typography } from '@material-ui/core';
import { Currencies, CurrencyRates } from 'types';
import { getSelectedCurrencies } from 'store/modules/currencies/selectors';
import { State } from 'store';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TrendingUp from 'assets/icons/trend-up';
import { getCurrencyRates } from 'store/modules/currency-rates/selectors';
import mapIcons from 'helpers/mapIcons';
import { getLoadingStatus } from 'store/modules/loading/selectors';
import { actions as currencyRatesActions } from 'store/modules/currency-rates';
import Loader from 'components/loader';

interface StateProps {
    currencies: Currencies;
    currencyRates: CurrencyRates;
    isLoadingRates: boolean;
}

type Props = StateProps;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minWidth: '33vw',
    },
    label: {
        padding: theme.spacing(0, 2),
    },
    error: {
        padding: theme.spacing(0, 3),
        color: theme.palette.error.dark,
    },
}));

const RateChip = ({ currencies, currencyRates, isLoadingRates }: Props) => {
    const classes = useStyles();
    const [reverse, setReverse] = useState(false);

    const toggleReverseRates = () => setReverse(!reverse);

    const normalRate = (
        <Typography className={classes.label}>
            1{mapIcons(currencies.out)} = {currencyRates.rate}{mapIcons(currencies.in)}
        </Typography>
    );

    const rateReverse = (
        <Typography className={classes.label}>
            {currencyRates.reverse}{mapIcons(currencies.out)} = 1{mapIcons(currencies.in)}
        </Typography>
    );

    const label = isLoadingRates
        ? <Loader size={15} thickness={5} />
        : (reverse ? rateReverse : normalRate)

    const error = <Typography className={classes.error} variant="caption">unavailable</Typography>

    return (
        <Chip
            label={currencyRates.rate ? label : error}
            avatar={<TrendingUp />}
            variant="outlined"
            onClick={toggleReverseRates}
            className={classes.root}
        />
    );
}

const isLoadingRatesSelector = getLoadingStatus([
    currencyRatesActions.getCurrencyRatesRequest.toString(),
]);

const mapStateToProps = (state: State): StateProps => ({
    currencies: getSelectedCurrencies(state),
    currencyRates: getCurrencyRates(state),
    isLoadingRates: isLoadingRatesSelector(state),
});

export default connect(mapStateToProps)(RateChip);