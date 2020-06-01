import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Chip, Typography } from '@material-ui/core'
import { Currencies, CurrencyRates } from 'types'
import { getSelectedCurrencies } from 'store/modules/currencies/selectors';
import { State } from 'store';
import { makeStyles } from '@material-ui/core/styles';
import TrendingUp from 'assets/icons/trend-up';
import { getCurrencyRates } from 'store/modules/currency-rates/selectors';
import mapIcons from 'helpers/mapIcons'

interface StateProps {
    currencies: Currencies,
    currencyRates: CurrencyRates
}

interface OwnProps {
}

type Props = StateProps & OwnProps

const useStyles = makeStyles((theme) => ({
    label: {
        padding: theme.spacing(0, 2)
    },
}));

const RateChip = ({ currencies, currencyRates }: Props) => {
    const classes = useStyles();
    
    const [reverse, setReverse] = useState(false)

    const label = (
        <Typography className={classes.label}>
            1{mapIcons(currencies.out)} = {currencyRates.rate}{mapIcons(currencies.in)}
        </Typography>
    )

    const labelReverse = (
        <Typography className={classes.label}>
            {currencyRates.reverse}{mapIcons(currencies.out)} = 1{mapIcons(currencies.in)}
        </Typography>
    )

    const toggleReverseRates = () => setReverse(!reverse)

    return (
        <Chip label={reverse ? labelReverse : label} avatar={<TrendingUp />} variant="outlined" onClick={toggleReverseRates} />
    )
}

const mapStateToProps = (state: State): StateProps => ({
    currencies: getSelectedCurrencies(state),
    currencyRates: getCurrencyRates(state),
});

export default connect(mapStateToProps)(RateChip);