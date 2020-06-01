import { all } from 'redux-saga/effects';

import currencyRatesSaga from 'store/modules/currency-rates/sagas';
import pocketsSaga from 'store/modules/pockets/sagas';

export default function* rootSaga() {
  yield all([
    currencyRatesSaga(),
    pocketsSaga(),
  ]);
}
