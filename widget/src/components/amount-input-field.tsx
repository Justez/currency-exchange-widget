import React, { ChangeEvent } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { Input, InputAdornment } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { State } from 'store';
import { actions as pocketActions } from 'store/modules/pockets';
import { getLoadingStatus } from 'store/modules/loading/selectors';
import { getSelectedCurrencies } from 'store/modules/currencies/selectors';
import { actions as currencyRatesActions } from 'store/modules/currency-rates'
import { getPockets, filterPocketByCurrency } from 'store/modules/pockets/selectors';
import mapIcons from 'helpers/mapIcons';
import parseNum from 'helpers/parseNum';
import { Pockets, Currencies, CurrencyExchangeTypes } from 'types';

interface DispatchProps {
    actions: {
        pockets: typeof pocketActions;
    };
}

interface StateProps {
    currencies: Currencies;
    pockets: Pockets;
    isLoadingRates: boolean;
}

interface OwnProps {
    pocketDirection: CurrencyExchangeTypes;
}

type Props = OwnProps & StateProps & DispatchProps;

const useStyles = makeStyles({
    root: {
        fontSize: '1.5rem',
        width: '30vw',
        maxWidth: '32vw',
    },
    input: {
        textAlign: 'end',
    },
});

const AmountInputField = ({ actions, currencies, pockets, pocketDirection, isLoadingRates }: Props) => {
    const classes = useStyles();
    const currentPocket = filterPocketByCurrency(pockets, currencies[pocketDirection]);

    const handleInputChange = (event: ChangeEvent<{ value: string; }>) => {
        const placedSum = parseNum(event.target.value)
        if (placedSum < currentPocket.sum) {
            actions.pockets.placeSum({ placedSum, pocketDirection });
        }
    };

    return (
        <Input
            id="standard-adornment-password"
            type='number'
            value={currentPocket.placedSum}
            className={classes.root}
            onChange={handleInputChange}
            disabled={isLoadingRates}
            inputProps={{ min: 0, max: +currentPocket.sum, className: classes.input, maxLength: 8 }}
            endAdornment={
                <InputAdornment position="end">
                    {mapIcons(currencies[pocketDirection])}
                </InputAdornment>
            }
        />
    );
}

const loadingRatesSelector = getLoadingStatus([
    currencyRatesActions.getCurrencyRatesRequest.toString(),
]);

const mapStateToProps = (state: State): StateProps => ({
    currencies: getSelectedCurrencies(state),
    pockets: getPockets(state),
    isLoadingRates: loadingRatesSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    actions: {
        pockets: bindActionCreators(pocketActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AmountInputField);