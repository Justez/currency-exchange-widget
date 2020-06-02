import { assoc, dissoc } from 'ramda';
import { AnyAction } from 'redux';

export interface DefaultState {
  [key: string]: boolean,
}

export const DEFAULT_STATE: DefaultState = {};

const reducer = (state: DefaultState = DEFAULT_STATE, action: AnyAction): DefaultState => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  
  const isRequestActive = requestState === 'REQUEST';

  if (isRequestActive) {
    return assoc(requestName, isRequestActive, state);
  } else {
    return dissoc(requestName, state);
  }
};

export default reducer;
