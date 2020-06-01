import { handleActions } from 'redux-actions';
import { assocPath } from 'ramda';

import { Pockets, CurrencyMap, CurrencyExchangeTypes } from 'types';

import { actions } from '.';
import { filterPocketByCurrency } from './selectors'
import { getOppositeDirection, getCurrencyByDirection } from 'store/modules/currencies/selectors'

import calcRate from 'helpers/calcRate'
import parseNum from 'helpers/parseNum'

export type DefaultState = Pockets;

export const defaultState: DefaultState = [
  {
    currency: CurrencyMap.euro,
    sum: '868.22',
    placedSum: '0'
  },
  {
    currency: CurrencyMap.pound,
    sum: '10.22',
    placedSum: '0'
  },
  {
    currency: CurrencyMap.dollar,
    sum: '7699.22',
    placedSum: '0'
  }
]

type Payload = any;

export const initializedState = {};

const reducer = handleActions<DefaultState, Payload>({
  [actions.setPocket.toString()]: (state, { payload }) =>
    assocPath([], payload.payload, state),
  [actions.setPlacedSum.toString()]: (state, { payload }) => {
    const { currencies, currencyRates, pocketDirection, placedSum } = payload;
    const currency1 = currencies[pocketDirection]
    let pocket1 = filterPocketByCurrency(state, currency1)
    pocket1 = assocPath(['placedSum'], parseNum(placedSum), pocket1)

    const currency2 = getCurrencyByDirection(payload.currencies, getOppositeDirection(pocketDirection))
    let pocket2 = filterPocketByCurrency(state, currency2)
    const rate = pocketDirection === CurrencyExchangeTypes.out ? currencyRates.rate : currencyRates.reverse
    pocket2 = assocPath(['placedSum'], calcRate(rate, placedSum), pocket2)
    const restPockets = state.filter(p => ![currency1, currency2].includes(p.currency))

    return assocPath([], [...restPockets, pocket1, pocket2], state)
  },
},
  defaultState,
);

export default reducer;
