import React from 'react';
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
    rate: {
        marginTop: theme.spacing(-3),
        backgroundColor: theme.palette.common.white,
    }
}));

const RateChip = ({ currencies, currencyRates }: Props) => {
    const classes = useStyles();
    const label = (
        <Typography className={classes.label}>
            1{mapIcons(currencies.out)} = {currencyRates.rate}{mapIcons(currencies.in)}
        </Typography>
    )

    return (
        <Chip label={label} avatar={<TrendingUp />} variant="outlined" className={classes.rate} />
    )
}

const mapStateToProps = (state: State): StateProps => ({
    currencies: getSelectedCurrencies(state),
    currencyRates: getCurrencyRates(state),
});

export default connect(mapStateToProps)(RateChip);