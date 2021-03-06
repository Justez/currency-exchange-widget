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

import { CurrencyExchangeTypes } from 'types';
import { getCurrencyRates } from 'api/currency-rates'
import { actions } from 'store/modules/currency-rates';
import { actions as currencyActions } from 'store/modules/currencies';
import { getSelectedCurrencies } from 'store/modules/currencies/selectors'
import parseNum from 'helpers/parseNum';
import countReverseCurrency from 'helpers/countReverseCurrencyRate';

export function* getCurrencyRatesFlow() {
  try {
    yield put({ type: actions.getCurrencyRatesRequest.toString() });

    const selectedCurrencies = yield select(state => getSelectedCurrencies(state));
    const { response, cancel } = yield race({ response: call(getCurrencyRates), cancel: take(actions.getCurrencyRates.toString()) });

    if (!cancel || response.rates) {
      const currency = (selectedCurrencies[CurrencyExchangeTypes.in]).toUpperCase();
      const rate = parseNum(response.rates[currency]);
      const reverse = countReverseCurrency(rate);

      yield put({ type: actions.setCurrencyRates.toString(), payload: { rate, reverse } })
      yield put({ type: actions.getCurrencyRatesSuccess.toString() });
    } else {
      yield put({ type: actions.resetRates.toString() })
      yield put({ type: actions.getCurrencyRatesFailure.toString() });
    }

    yield delay(10000);
    yield put({ type: actions.getCurrencyRates.toString() });
  } catch (error) {
    yield put({ type: actions.resetRates.toString() })
    yield put({ type: actions.getCurrencyRatesFailure.toString() });
    // yield delay(1000);
    // yield put({ type: actions.getCurrencyRates.toString() });
  }
}

export default function* saga() {
  yield all([
    takeLatest([currencyActions.setSelectedCurrency, actions.getCurrencyRates], getCurrencyRatesFlow),
  ]);
}
