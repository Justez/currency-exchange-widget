//@ts-ignore
import { createActions } from 'redux-actions';

export const NAMESPACE = 'currencies';

export const actions = createActions(
  'SET_SELECTED_CURRENCY',
  { prefix: NAMESPACE },
);
