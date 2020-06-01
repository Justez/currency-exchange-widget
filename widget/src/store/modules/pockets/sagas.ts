import {
  all,
  takeLatest,
  // put,
  // select,
} from 'redux-saga/effects';

import { actions } from 'store/modules/currency-rates';

function* calcWithdrawAmount() {
  try {
    /**
     * recount the in amount:
     * get pockets
     * get currency of in, out
     * get placed amount
     * get newest rate
     * pass placed amount and rate to helper
     * set new withdrawal sum
     */
  } catch (error) {
  }
}

export default function* saga() {
  yield all([
    takeLatest(actions.setCurrencyRates, calcWithdrawAmount),
  ]);
}
