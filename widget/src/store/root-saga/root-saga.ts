import { all } from 'redux-saga/effects';

import currencyExchangeSaga from 'store/modules/currency-rates/sagas';
import currenciesSaga from 'store/modules/currencies/sagas';

export default function* rootSaga() {
  yield all([
    currencyExchangeSaga(),
    currenciesSaga(),
  ]);
}
