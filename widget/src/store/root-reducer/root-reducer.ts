import { combineReducers } from 'redux';

import currencyRatesReducer from '../modules/currency-exchange/reducer'
import pocketsReducer from '../modules/pockets/reducer'
import currenciesReducer from '../modules/currencies/reducer'

const appReducer = () =>
  combineReducers({
    currencyRates: currencyRatesReducer,
    pockets: pocketsReducer,
    currencies: currenciesReducer
  });

type AppReducer = typeof appReducer;

type RootReducer = () => (...args: Parameters<ReturnType<AppReducer>>) => Parameters<ReturnType<AppReducer>>[0];

const rootReducer: RootReducer = () => (state, action) => appReducer()(state, action);

export default rootReducer;
