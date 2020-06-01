import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Chip } from '@material-ui/core'
import { actions as currencyRatesActions } from 'store/modules/currency-rates';
import Flip from 'assets/icons/flip';

interface DispatchProps {
    actions: {
        currencyRates: typeof currencyRatesActions;
    };
}

type Props = DispatchProps;

const FlipChip = ({ actions }: Props) => {
    return (
        <Chip icon={<Flip />} variant="outlined" />
    )
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    actions: {
        currencyRates: bindActionCreators(currencyRatesActions, dispatch),
    },
});

export default connect(undefined, mapDispatchToProps)(FlipChip);