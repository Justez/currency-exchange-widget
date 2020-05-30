import { combineReducers } from 'redux';

import currencyRatesReducer from '../modules/currency-exchange/reducer'

const appReducer = () =>
  combineReducers({
    currencyRates: currencyRatesReducer,
  });

type AppReducer = typeof appReducer;

type RootReducer = () => (...args: Parameters<ReturnType<AppReducer>>) => Parameters<ReturnType<AppReducer>>[0];

const rootReducer: RootReducer = () => (state, action) => appReducer()(state, action);

export default rootReducer;
