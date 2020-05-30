import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import InputCurrencyTemplate from '../../functional-components/input-currency-template'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  first: {
    height: '50vh',
    backgroundColor: theme.palette.primary.main
  },
  second: {
    backgroundColor: theme.palette.primary.dark,
    height: '50vh',
  }
}));

const MainPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.first}>
        <InputCurrencyTemplate />
      </Grid>
      <Grid item className={classes.second}>
        
      </Grid>
    </Grid>
  );
};

export default MainPage;
