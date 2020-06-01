import {
  all,
  takeLatest,
  put,
  select,
  race,
  call,
  take,
} from 'redux-saga/effects';
import delay from '@redux-saga/delay-p'

import { actions as currencyActions } from 'store/modules/currencies';
import { getSelectedCurrencies } from 'store/modules/currencies/selectors'
import { getChecksum } from './selectors'
import { actions } from 'store/modules/currency-rates';
import { getCurrencyRates } from 'api/currency-rates'

function* getCurrencyRatesFlow() {
  try {
    const checksum = yield select(getChecksum)
    yield put({ type: actions.getCurrencyRatesRequest.toString() })
    const selectedCurrencies = yield select(state => getSelectedCurrencies(state))

    const { response } = yield race({ response: call(getCurrencyRates, selectedCurrencies, checksum), cancel: take(actions.registerChecksum.toString()) })
    if (response) { // TODO parse data forward
      yield put({ type: actions.setCurrencyRates.toString(), payload: response.data })
      yield put({ type: actions.getCurrencyRatesSuccess.toString() })
    } else {
      yield put({ type: actions.getCurrencyRatesFailure.toString() })
      yield put({ type: actions.getCurrencyRates.toString() })
    }
    
    yield delay(50000)
    yield put({ type: actions.getCurrencyRates.toString() })
  } catch (error) {
  }
}

function* pollRates() {
  try {
    yield put({ type: actions.getCurrencyRates.toString() })
  } catch (error) {
  }
}

function* registerCheckSum() {
  try {
    yield put({ type: actions.registerChecksum.toString() })
  } catch (error) {
  }
}

function* watchCurrencyPairChanged() {
  yield takeLatest([currencyActions.setSelectedCurrency, currencyActions.flipSelectedCurrencies], registerCheckSum)
}

export default function* saga() {
  yield all([
    watchCurrencyPairChanged(),
    takeLatest(actions.registerChecksum, pollRates),
    takeLatest(actions.getCurrencyRates, getCurrencyRatesFlow)
  ]);
}
