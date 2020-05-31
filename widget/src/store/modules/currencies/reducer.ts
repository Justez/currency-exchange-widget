import { handleActions } from 'redux-actions';
import { assocPath } from 'ramda';

import { Currencies, CurrencyMap } from 'types';

import { actions, NAMESPACE } from '.';

export interface DefaultState {
  currencies: Currencies;
}

export const defaultState: DefaultState = {
  currencies: {
    in: CurrencyMap.euro,
    out: CurrencyMap.pound,
  },
};

type Payload = any;

export const initializedState = {};

const reducer = handleActions<DefaultState, Payload>({
  [actions.setSelectedCurrency.toString()]: (state, { payload }) =>
    assocPath([NAMESPACE, Object.keys(payload)[0]], Object.values(payload)[0], state)
},
  defaultState,
);

export default reducer;
