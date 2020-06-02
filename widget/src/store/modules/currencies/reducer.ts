import { handleActions } from 'redux-actions';
import { assocPath } from 'ramda';

import { Currencies, CurrencyMap } from 'types';
import { actions } from '.';

export type DefaultState = Currencies;

export const defaultState: DefaultState = {
  in: CurrencyMap.dollar,
  out: CurrencyMap.pound,
};

type Payload = any;

export const initializedState = {};

const reducer = handleActions<DefaultState, Payload>({
  [actions.setSelectedCurrency.toString()]: (state, { payload }) =>
    assocPath([Object.keys(payload)[0]], Object.values(payload)[0], state),
  [actions.flipSelectedCurrencies.toString()]: ((state) =>
    assocPath([], { in: state.out, out: state.in }, state)),
},
  defaultState,
);

export default reducer;
