import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Dispatch, bindActionCreators } from 'redux';
import InputCurrencyTemplate from '../../functional-components/input-currency-template'
import { actions as currencyRatesActions } from 'store/modules/currency-exchange';

interface DispatchProps {
  actions: {
    currencyRates: typeof currencyRatesActions;
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
  },
  first: {
    height: '50vh',
    backgroundColor: theme.palette.secondary.light
  },
  second: {
    height: '50vh',
    backgroundColor: theme.palette.secondary.dark,
  },
  rate: {
    marginTop: theme.spacing(-1.5),
  }
}));

const MainPage = ({ actions }: DispatchProps): JSX.Element => {
  const classes = useStyles();

  useEffect(() => {
    actions.currencyRates.startPollingCurrencyRates()
  })
  
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.first}>
        <InputCurrencyTemplate />
      </Grid>
      <Grid item container justify="center" className={classes.second}>
        <Grid item className={classes.rate}>
          result
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: {
    currencyRates: bindActionCreators(currencyRatesActions, dispatch),
  },
});

export default connect(undefined, mapDispatchToProps)(MainPage);
