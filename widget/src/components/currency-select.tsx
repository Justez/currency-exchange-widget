import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { actions as currencyActions } from 'store/modules/currencies';
import { Select, MenuItem, Typography, Grid } from '@material-ui/core'
import { Pockets, Currencies, CurrencyExchangeTypes } from 'types'
import { getSelectedCurrencies } from 'store/modules/currencies/selectors';
import { getPockets } from 'store/modules/pockets/selectors';
import { State } from 'store';
import { find, propEq, pathOr, pipe } from 'ramda'
import mapIcons from 'helpers/mapIcons'

interface DispatchProps {
    actions: {
        currencies: typeof currencyActions;
    };
}

interface StateProps {
    pockets: Pockets,
    currencies: Currencies
}

interface OwnProps {
    indicator: CurrencyExchangeTypes
}

type Props = DispatchProps & StateProps & OwnProps

const CurrencySelect = ({ actions, pockets, currencies, indicator }: Props) => {
    const selectedCurrency = currencies[indicator];
    const setSelectedCurrency = (event: ChangeEvent<{ value: unknown; }>) =>
        actions.currencies.setSelectedCurrency({ [indicator]: event.target.value })

    const getPocketFromSelected = pipe(
        find(propEq('currency', selectedCurrency)),
        pathOr(null, ['sum'])
    )(pockets)

    return (
        <Grid item container direction="column" spacing={2}>
            <Grid item>
                <Select
                    autoWidth
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
                <Typography>
                    Balance{' '}{getPocketFromSelected}{mapIcons(selectedCurrency)}
                </Typography>
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    actions: {
        currencies: bindActionCreators(currencyActions, dispatch),
    },
});

const mapStateToProps = (state: State): StateProps => ({
    pockets: getPockets(state),
    currencies: getSelectedCurrencies(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);