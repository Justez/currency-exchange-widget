import { all, take, put, /*call*/ } from 'redux-saga/effects';

// import { getCurrencyRates } from 'api/currency-rates';

import { actions } from '.';

export function* getCurrencyRatesFlow() {
  while (true) {
    yield take(actions.getCurrencyRates);

    yield put(actions.getCurrencyRatesRequest());

    //@ts-ignore
    const { error, response } = {}// yield call(getCurrencyRates);

    if (!error) {
      yield put(actions.getCurrencyRatesSuccess());
      yield put(actions.setCurrencyRates({
        payload: response// TODO get exact format,
      }));
    } else {
      yield put(actions.getCurrencyRatesFailure());
    }
  }
}

export default function* saga() {
  yield all([
    getCurrencyRatesFlow(),
  ]);
}
