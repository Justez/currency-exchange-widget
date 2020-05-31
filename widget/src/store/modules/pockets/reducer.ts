import { handleActions } from 'redux-actions';
import { assocPath } from 'ramda';

import { Pockets, CurrencyMap } from 'types';

import { actions, NAMESPACE } from '.';

export interface DefaultState {
  [NAMESPACE]: Pockets;
}

export const defaultState: DefaultState = {
  [NAMESPACE]: [
    { currency: CurrencyMap.euro,
      sum: '868.22' 
    },
    { currency: CurrencyMap.pound,
      sum: '10.22' 
    },
    { currency: CurrencyMap.dollar,
      sum: '7699.22' 
    }
  ]
};

type Payload = any;

export const initializedState = {};

const reducer = handleActions<DefaultState, Payload>({
  [actions.setPocket.toString()]: (state, { payload }) =>
    assocPath([NAMESPACE], payload.payload, state),
},
  defaultState,
);

export default reducer;
