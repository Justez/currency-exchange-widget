import { all } from 'redux-saga/effects';

import currencyExchangeSaga from '../modules/currency-exchange/sagas';
import currenciesSaga from '../modules/currencies/sagas';

export default function* rootSaga() {
  yield all([
    currencyExchangeSaga(),
    currenciesSaga(),
  ]);
}
