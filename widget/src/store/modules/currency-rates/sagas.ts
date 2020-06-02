import {
  all,
  takeLatest,
  put,
  select,
  race,
  call,
  take,
} from 'redux-saga/effects';
import delay from '@redux-saga/delay-p';

import { getCurrencyRates } from 'api/currency-rates'
import { actions as currencyActions } from 'store/modules/currencies';
import { getSelectedCurrencies } from 'store/modules/currencies/selectors'
import { actions } from 'store/modules/currency-rates';
import countReverseCurrency from 'helpers/countReverseCurrency';
import parseNum from 'helpers/parseNum';
import { CurrencyExchangeTypes } from 'types';

function* getCurrencyRatesFlow() {
  try {
    yield put({ type: actions.getCurrencyRatesRequest.toString() });
    const selectedCurrencies = yield select(state => getSelectedCurrencies(state));

    const { response, error } = yield race({ response: call(getCurrencyRates, selectedCurrencies), cancel: take(actions.registerChecksum.toString()) });

      if (!error || response.rates) {
      const currency = (selectedCurrencies[CurrencyExchangeTypes.in]).toUpperCase();
      const rate = parseNum(response.rates[currency]);
      const reverse = countReverseCurrency(rate);

      yield put({
        type: actions.setCurrencyRates.toString(), payload: { rate, reverse },
      })
      yield put({ type: actions.getCurrencyRatesSuccess.toString() });
    } else {
      yield put({ type: actions.getCurrencyRatesFailure.toString() });
      yield put({ type: actions.getCurrencyRates.toString() });
    }

    yield delay(10000);
    yield put({ type: actions.getCurrencyRates.toString() });
  } catch (error) {
    yield put({ type: actions.getCurrencyRatesFailure.toString() });
    yield delay(100);
    // yield put({ type: actions.getCurrencyRates.toString() });
  }
}

function* pollRates() {
  try {
    yield put({ type: actions.getCurrencyRates.toString() });
  } catch (error) {
  }
}

function* registerCheckSum() {
  try {
    yield put({ type: actions.registerChecksum.toString() });
  } catch (error) {
  }
}

function* watchCurrencyPairChanged() {
  yield takeLatest([currencyActions.setSelectedCurrency], registerCheckSum);
}

export default function* saga() {
  yield all([
    watchCurrencyPairChanged(),
    takeLatest(actions.registerChecksum, pollRates),
    takeLatest(actions.getCurrencyRates, getCurrencyRatesFlow),
  ]);
}
