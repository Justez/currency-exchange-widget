import { handleActions } from 'redux-actions';
import { assocPath } from 'ramda';

import { CurrencyRates } from 'types';

import { actions } from '.';

export type DefaultState = CurrencyRates;

export const defaultState: DefaultState = {
  rate: '',
  reverse: '',
};

type Payload = any;

export const initializedState = {};

const reducer = handleActions<DefaultState, Payload>({
  [actions.setCurrencyRates.toString()]: (state, { payload }) =>
    assocPath([], { ...state, ...payload }, state),
  [actions.flipRates.toString()]: ((state) =>
    assocPath([], { rate: state.reverse, reverse: state.rate }, state)),
  [actions.resetRates.toString()]: ((state) =>
    assocPath([], defaultState, state)),
},
  defaultState,
);

export default reducer;
