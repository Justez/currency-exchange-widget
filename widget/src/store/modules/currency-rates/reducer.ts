import { handleActions } from 'redux-actions';
import { assocPath } from 'ramda';

import { CurrencyRates } from 'types';

import { actions } from '.';

export interface DefaultState {
  currencyRates: CurrencyRates;
}

export const defaultState: DefaultState = {
  currencyRates: { // TODO SET 1:1
    rate: '1.44',
    reverse: '0.83'
  }
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
