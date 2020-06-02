import { combineReducers } from 'redux';

import currencyRatesReducer from 'store/modules/currency-rates/reducer';
import pocketsReducer from 'store/modules/pockets/reducer';
import currenciesReducer from 'store/modules/currencies/reducer';
import loadingReducer from 'store/modules/loading/reducer';

const appReducer = () =>
  combineReducers({
    currencyRates: currencyRatesReducer,
    pockets: pocketsReducer,
    currencies: currenciesReducer,
    loading: loadingReducer,
  });

type AppReducer = typeof appReducer;

type RootReducer = () => (...args: Parameters<ReturnType<AppReducer>>) => Parameters<ReturnType<AppReducer>>[0];

const rootReducer: RootReducer = () => (state, action) => appReducer()(state, action);

export default rootReducer;
