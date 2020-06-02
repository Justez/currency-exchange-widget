import { handleActions } from 'redux-actions';
import { assocPath } from 'ramda';
import { v4 as uuid } from 'uuid';

import { CurrencyRates } from 'types';

import { actions } from '.';

export type DefaultState = CurrencyRates;

export const defaultState: DefaultState = {
  rate: '',
  reverse: '',
  checksum: '',
};

type Payload = any;

export const initializedState = {};

const reducer = handleActions<DefaultState, Payload>({
  [actions.setCurrencyRates.toString()]: (state, { payload }) =>
    assocPath([], { ...state, ...payload }, state),
  [actions.flipRates.toString()]: ((state) =>
    assocPath([], { rate: state.reverse, reverse: state.rate }, state)),
  [actions.registerChecksum.toString()]: ((state) =>
    assocPath(['checksum'], uuid(), state)),
},
  defaultState,
);

export default reducer;
