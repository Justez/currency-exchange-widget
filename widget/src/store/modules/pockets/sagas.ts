import {
  all,
  takeLatest,
  put,
  select,
  take,
} from 'redux-saga/effects';
import { find, propEq, pathOr, assocPath } from 'ramda';

import { CurrencyExchangeTypes } from 'types';
import { actions as ratesActions } from 'store/modules/currency-rates';
import { actions } from 'store/modules/pockets';
import { getCurrencyRates } from 'store/modules/currency-rates/selectors';
import { getPockets, getPocketByCurrency } from 'store/modules/pockets/selectors';
import { getSelectedCurrencies, getOppositeDirection, getCurrencyByDirection } from 'store/modules/currencies/selectors';
import calcAmountByRate from 'helpers/calcAmountByRate';

import parseNum from 'helpers/parseNum';
import { add, deduct } from 'helpers/applyOperation';

function* calcWithdrawAmount() {
  try {
    const pockets = yield select(getPockets);
    const {
      [CurrencyExchangeTypes.in]: currencyIn,
      [CurrencyExchangeTypes.out]: currencyOut,
    } = yield select(getSelectedCurrencies);
    const donorPocket = find(propEq('currency', currencyOut), pockets);
    const recipientPocket = find(propEq('currency', currencyIn), pockets);

    const { rate } = yield select(getCurrencyRates);
    const newSum = calcAmountByRate(rate, pathOr(0, ['placedSum'], donorPocket));

    const updatedPocket = { ...recipientPocket, placedSum: newSum };

    yield put({ type: actions.setPlacedAmount.toString(), payload: [updatedPocket] });
  } catch (error) {
  }
}

function* placeSumFlow() {
  try {
    const { payload: { placedSum, pocketDirection } } = yield take(actions.placeSum);

    const currencies = yield select(getSelectedCurrencies);
    const currency1 = currencies[pocketDirection];
    const currency2 = getCurrencyByDirection(currencies, getOppositeDirection(pocketDirection));
    const rates = yield select(getCurrencyRates);
    const rate = pocketDirection === CurrencyExchangeTypes.out ? rates.rate : rates.reverse;

    let pocket1 = yield select(state => getPocketByCurrency(state, currency1));
    pocket1 = assocPath(['placedSum'], parseNum(placedSum), pocket1);

    let pocket2 = yield select(state => getPocketByCurrency(state, currency2));
    pocket2 = assocPath(['placedSum'], calcAmountByRate(rate, placedSum), pocket2);

    yield put({ type: actions.setPlacedAmount.toString(), payload: [pocket1, pocket2] });
  } catch (error) {
  }
}

function* placeExchangeFlow() {
  try {
    const currencies = yield select(getSelectedCurrencies);
    const currency1 = currencies[CurrencyExchangeTypes.in];
    const currency2 = currencies[CurrencyExchangeTypes.out];

    let pocket1 = yield select(state => getPocketByCurrency(state, currency1));
    let pocket2 = yield select(state => getPocketByCurrency(state, currency2));

    pocket1 = { ...pocket1, sum: add(pocket1.sum, pocket1.placedSum), placedSum: '0' };
    pocket2 = { ...pocket2, sum: deduct(pocket2.sum, pocket2.placedSum), placedSum: '0' };
    
    yield put({ type: actions.setPlacedAmount.toString(), payload: [pocket1, pocket2] });
  } catch (error) {
  }
}

export default function* saga() {
  yield all([
    takeLatest(ratesActions.setCurrencyRates, calcWithdrawAmount),
    takeLatest(actions.placeSum, placeSumFlow),
    takeLatest(actions.placeExchange, placeExchangeFlow),
  ]);
}
