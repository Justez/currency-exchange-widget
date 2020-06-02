import { handleActions } from 'redux-actions';
import { assocPath, includes } from 'ramda';

import { Pockets, CurrencyMap, Pocket } from 'types';

import { actions } from '.';
export type DefaultState = Pockets;

export const defaultState: DefaultState = [
  {
    currency: CurrencyMap.euro,
    sum: '868.22',
    placedSum: 4,
  },
  {
    currency: CurrencyMap.pound,
    sum: '102.22',
    placedSum: 3,
  },
  {
    currency: CurrencyMap.dollar,
    sum: '7699.22',
    placedSum: 0,
  }
]

type Payload = any;

export const initializedState = {};

const reducer = handleActions<DefaultState, Payload>({
  [actions.setPocket.toString()]: (state, { payload }) =>
    assocPath([], payload.payload, state),
  [actions.setPlacedAmount.toString()]: (state, { payload }) => {
    const changedCurrencies = payload.map((pocket: Pocket) => pocket.currency);
    const restPockets = state.filter(pocket => !includes(pocket.currency, changedCurrencies));
    return assocPath([], [...restPockets, ...payload], state);
  },
},
  defaultState,
);

export default reducer;
