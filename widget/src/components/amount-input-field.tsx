import React, { ChangeEvent } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { Input, InputAdornment, Grid } from '@material-ui/core'
import { connect } from 'react-redux';
import { find, propEq } from 'ramda'

import { actions as pocketActions } from 'store/modules/pockets';
import { Pockets, Currencies, CurrencyExchangeTypes, CurrencyRates } from 'types'
import { getPockets } from 'store/modules/pockets/selectors';
import { State } from 'store';
import { getSelectedCurrencies } from 'store/modules/currencies/selectors';
import mapIcons from 'helpers/mapIcons'
import { getCurrencyRates } from 'store/modules/currency-rates/selectors';
import parseNum from 'helpers/parseNum';

interface DispatchProps {
    actions: {
        pockets: typeof pocketActions;
    };
}

interface StateProps {
    currencies: Currencies,
    pockets: Pockets,
    currencyRates: CurrencyRates
}

interface OwnProps {
    pocketDirection: CurrencyExchangeTypes
}

type Props = OwnProps & StateProps & DispatchProps

const AmountInputField = ({ actions, currencies, pockets, pocketDirection, currencyRates }: Props) => {

    const currentPocket = find(propEq('currency', currencies[pocketDirection]), pockets)

    const handleInputChange = (event: ChangeEvent<{ value: string; }>) => {
        const placedSum = parseNum(event.target.value)
        // todo make calcs in saga
        actions.pockets.setPlacedSum({ placedSum, pocketDirection, currencies, currencyRates })
    }

    return (
        <Grid container direction="column">
            <Input
                id="standard-adornment-password"
                type='number'
                value={currentPocket.placedSum}
                onChange={handleInputChange}
                inputProps={{ min: 0, max: currentPocket.sum, maxLength: 6 }}
                endAdornment={
                    <InputAdornment position="end">
                        {mapIcons(currencies[pocketDirection])}
                    </InputAdornment>
                }
            />
        </Grid>
    )
}

const mapStateToProps = (state: State): StateProps => ({
    currencies: getSelectedCurrencies(state),
    pockets: getPockets(state),
    currencyRates: getCurrencyRates(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    actions: {
        pockets: bindActionCreators(pocketActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AmountInputField);
