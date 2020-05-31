import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Chip } from '@material-ui/core'
import { actions as currencyRatesActions } from 'store/modules/currency-rates';
import { makeStyles } from '@material-ui/core/styles';
import Flip from 'assets/icons/flip';

interface DispatchProps {
    actions: {
        currencyRates: typeof currencyRatesActions;
    };
}


type Props = DispatchProps;

const useStyles = makeStyles((theme) => ({
    flipIcon: {
        marginTop: theme.spacing(-2.2),
        backgroundColor: theme.palette.common.white,
    }
}));

const FlipChip = ({ actions }: Props) => {
    const classes = useStyles();

    return (
        <Chip icon={<Flip />} variant="outlined" className={classes.flipIcon} />
    )
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    actions: {
        currencyRates: bindActionCreators(currencyRatesActions, dispatch),
    },
});

export default connect(undefined, mapDispatchToProps)(FlipChip);