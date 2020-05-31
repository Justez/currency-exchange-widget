import { handleActions } from 'redux-actions';
import { assocPath } from 'ramda';

import { CurrencyRates } from 'types';

import { actions } from '.';

export interface DefaultState {
  currencyRates: CurrencyRates;
}

export const defaultState: DefaultState = {
  currencyRates: null,
};

type Payload = any;

export const initializedState = {};

const reducer = handleActions<DefaultState, Payload>({
  [actions.setCurrencyRates.toString()]: (state, { payload }) =>
    assocPath(['currencyRates'], payload.payload, state),
  [actions.startPollingCurrencyRates.toString()]: (state) =>
    assocPath(['currencyRates', 'polling'], true, state),
  [actions.stopPollingCurrencyRates.toString()]: (state) =>
    assocPath(['currencyRates', 'polling'], false, state)
},
  defaultState,
);

export default reducer;
