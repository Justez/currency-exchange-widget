import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Dispatch, bindActionCreators } from 'redux';
import OutCurrencyTemplate from '../../functional-components/out-currency-template'
import InCurrencyTemplate from '../../functional-components/in-currency-template'
import { actions as currencyRatesActions } from 'store/modules/currency-rates';
import { actions as currenciesActions } from 'store/modules/currencies';

import RateChip from 'components/rate-chip';
import FlipChip from 'components/flip-chip';

interface DispatchProps {
  actions: {
    currencyRates: typeof currencyRatesActions;
    currencies: typeof currenciesActions;
  };
}

const useStyles = makeStyles((theme) => ({
  first: {
    height: '50vh',
    backgroundColor: theme.palette.secondary.light
  },
  second: {
    height: '50vh',
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const MainPage = ({ actions }: DispatchProps): JSX.Element => {
  const classes = useStyles();

  useEffect(() => {
    actions.currencyRates.registerChecksum()
  })

  const handleFlip = () => {
    actions.currencyRates.flipRates()
    actions.currencies.flipSelectedCurrencies()
  }

  return (
    <Grid container direction="column">
      <Grid item container direction="column" justify="center" className={classes.first}>
        <OutCurrencyTemplate />
      </Grid>
      <Grid item container direction="column" className={classes.second}>
        <Grid item container direction="row" justify="flex-start">
          <Grid item container justify="center" xs={3}>
            <FlipChip onFlip={handleFlip} />
          </Grid>
          <Grid item container justify="center" xs={6}>
            <RateChip />
          </Grid>
        </Grid>
        <Grid item>
          <InCurrencyTemplate />
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: {
    currencyRates: bindActionCreators(currencyRatesActions, dispatch),
    currencies: bindActionCreators(currenciesActions, dispatch),
  },
});

export default connect(undefined, mapDispatchToProps)(MainPage);
