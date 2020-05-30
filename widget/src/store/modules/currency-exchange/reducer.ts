import { handleActions } from 'redux-actions';
// import { assocPath } from 'ramda';

// import type { rates } from 'types/api';

// import { actions } from '.';

export interface DefaultState {
  // currencyRates: rates;
}

export const defaultState: DefaultState = {
  currencyRates: null,
};

type Payload = any;

export const initializedState = {};

const reducer = handleActions<DefaultState, Payload>({
  // [actions.setCurrencyRates.toString()]: (state, { payload }) =>
  //     assocPath(['currencyRates'], payload.payload, state),
},
  defaultState,
);

export default reducer;
